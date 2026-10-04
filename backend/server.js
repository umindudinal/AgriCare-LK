require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// Supabase Cloud Database Client
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ocbimbflroaamvcdzbbm.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_AfDYseNWF9vLm79hMHA_Ew_oTyaQcoM';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        status: 'online',
        message: '🌿 AgriCare LK API Server is running smoothly with Supabase Cloud Database!'
    });
});

// Get all catalogued diseases endpoint
app.get('/api/diseases', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('diseases')
            .select('id, ai_model_label, common_name_en, common_name_si, symptoms_si, treatments(treatment_type, instruction_si)');
        
        if (error) throw error;
        res.json({ success: true, count: data.length, data });
    } catch (err) {
        console.error("❌ Supabase Error:", err.message);
        res.status(500).json({ error: 'Failed to fetch diseases from Supabase.' });
    }
});

// Resolve Python Executable (prefer project .venv if available)
const venvPython = path.join(__dirname, '..', '.venv', 'Scripts', 'python.exe');
const pythonExecutable = fs.existsSync(venvPython) ? venvPython : 'python';

// Plant Disease Diagnosis Endpoint
app.post('/api/analyze-plant', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'කරුණාකර ඡායාරූපයක් ලබාදෙන්න.' });
    }

    const imagePath = req.file.path;
    const plantType = req.body.plantType || 'tomato';

    let pythonScriptName = '../predict_api.py';
    let plantNameLog = 'තක්කාලි';

    if (plantType === 'chili') {
        pythonScriptName = '../predict_chili.py';
        plantNameLog = 'මිරිස්';
    } else if (plantType === 'brinjal') {
        pythonScriptName = '../predict_brinjal.py';
        plantNameLog = 'වම්බටු';
    }

    console.log(`📸 ${plantNameLog} ඡායාරූපයක් ලැබුණා. AI Model එක වෙත යවමින් පවතී...`);
    
    const pythonScriptPath = path.join(__dirname, pythonScriptName);
    const pythonProcess = spawn(pythonExecutable, [pythonScriptPath, imagePath]);
    let pythonOutput = '';

    pythonProcess.stdout.on('data', (data) => {
        pythonOutput += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python Error: ${data}`);
    });

    pythonProcess.on('close', async (code) => {
        try {
            fs.unlinkSync(imagePath);
        } catch (e) {
            console.error("Temporary image delete error:", e);
        }

        try {
            const aiResult = JSON.parse(pythonOutput.trim());

            if (aiResult.error) {
                console.error("❌ AI දෝෂයක්:", aiResult.error);
                return res.status(500).json({ error: 'AI විශ්ලේෂණයේදී දෝෂයක් මතු විය.' });
            }

            const diseaseName = aiResult.predicted_class;
            console.log("✅ AI එකෙන් ලැබුණු පිළිතුර:", diseaseName);
            
            console.log("🗄️ Supabase Cloud Database එකෙන් විස්තර සොයමින් පවතී...");

            // Query Supabase for disease details and treatments
            const { data: diseaseRow, error: dbError } = await supabase
                .from('diseases')
                .select(`
                    common_name_en,
                    common_name_si,
                    symptoms_si,
                    treatments (
                        treatment_type,
                        instruction_si
                    )
                `)
                .eq('ai_model_label', diseaseName)
                .maybeSingle();

            if (dbError) {
                console.error("❌ Supabase දෝෂයක්:", dbError.message);
            }

            if (diseaseRow) {
                const diseaseDetails = {
                    CommonName_EN: diseaseRow.common_name_en,
                    CommonName_SI: diseaseRow.common_name_si,
                    Symptoms_SI: diseaseRow.symptoms_si,
                    AI_Label: diseaseName,
                    Treatments: (diseaseRow.treatments || []).map(t => ({
                        type: t.treatment_type,
                        instruction: t.instruction_si
                    }))
                };

                console.log("✅ Supabase දත්ත සාර්ථකව ලබාගත්තා.");
                return res.json({ success: true, data: diseaseDetails });
            }

            // Built-in Fallback Data if record is not in DB
            let fallbackData = null;
            if (diseaseName === 'Chili_fruit_rot') {
                fallbackData = {
                    CommonName_EN: 'Chili Fruit Rot / Anthracnose',
                    CommonName_SI: 'මිරිස් කරල් කුණුවීමේ රෝගය (Fruit Rot)',
                    Symptoms_SI: 'මිරිස් කරල් මත තෙතමනය සහිත දුඹුරු හෝ කළු පැහැති ලප ඇතිවීම, කරල් වියළී යෑම සහ කුණු වී හැලී යෑම.',
                    AI_Label: diseaseName,
                    Treatments: [
                        { type: 'Organic', instruction: 'රෝගී වූ මිරිස් කරල් වහාම කඩා ඉවත් කර ගිනිතබා විනාශ කරන්න.' },
                        { type: 'Organic', instruction: 'කොහොඹ ඇට සාරය (Neem Seed Kernel Extract) හෝ බෝඩෝ මිශ්‍රණය පීඩන විදින යන්ත්‍රයකින් වගාවට විදින්න.' },
                        { type: 'Chemical', instruction: 'මැන්කොසෙබ් (Mancozeb) හෝ කැප්ටාන් (Captan) දිලීර නාශකය නිර්දේශිත ප්‍රමාණයට ජලයේ දියකර ස්ප්‍රේ කරන්න.' }
                    ]
                };
            } else if (diseaseName === 'Chili_fruit_healthy') {
                fallbackData = {
                    CommonName_EN: 'Healthy Chili Fruit',
                    CommonName_SI: 'නිරෝගී මිරිස් කරලක් (Healthy Fruit)',
                    Symptoms_SI: 'මිරිස් කරලේ කිසිදු ලපයක්, කුණුවීමක් හෝ රෝග ලක්ෂණයක් නොමැත. කරල සෞඛ්‍ය සම්පන්න තත්ත්වයේ පවතී.',
                    AI_Label: diseaseName,
                    Treatments: [
                        { type: 'Organic', instruction: 'පසෙහි තෙතමනය නිසි පරිදි පවත්වා ගනිමින් කාබනික පොහොර ලබාදෙන්න.' }
                    ]
                };
            } else if (diseaseName === 'Brinjal_fruit_cracking') {
                fallbackData = {
                    CommonName_EN: 'Brinjal Fruit Cracking',
                    CommonName_SI: 'වම්බටු ගෙඩි පිපිරීමේ රෝගය (Fruit Cracking)',
                    Symptoms_SI: 'වම්බටු ගෙඩි මත ඉරි තැළුණු හෝ පිපිරුණු ස්වභාවයක් ඇතිවීම, පෝෂණ ඌනතා හෝ ජල හිඟකම නිසා ගෙඩි මතුපිට වියළී ඉරී යාම.',
                    AI_Label: diseaseName,
                    Treatments: [
                        { type: 'Organic', instruction: 'පසෙහි තෙතමනය නියත මට්ටමක පවත්වා ගැනීමට නිසි පරිදි ජලසම්පාදනය කරන්න. බෝරෝන් (Boron) හා කැල්සියම් අඩංගු කාබනික පොහොර හෝ කොම්පෝස්ට් පසට එකතු කරන්න.' },
                        { type: 'Chemical', instruction: 'බෝරෝන් ඌනතාවය සඳහා නිර්දේශිත ක්ෂුද්‍ර පෝෂක ද්‍රාවණයක් (Boron Foliar Spray) පත්‍ර වලට ස්ප්‍රේ කරන්න.' }
                    ]
                };
            } else if (diseaseName === 'Brinjal_healthy_fruit') {
                fallbackData = {
                    CommonName_EN: 'Healthy Brinjal Fruit',
                    CommonName_SI: 'නිරෝගී වම්බටු ගෙඩියක් (Healthy Fruit)',
                    Symptoms_SI: 'වම්බටු ගෙඩියේ කිසිදු ලපයක්, පණුවන් හානියක් හෝ පිපිරීමක් නොමැත. ගෙඩිය නිරෝගී තත්ත්වයේ පවතී.',
                    AI_Label: diseaseName,
                    Treatments: [
                        { type: 'Organic', instruction: 'නිරෝගී වගාවක් පවත්වා ගැනීම සඳහා නිසි පරිදි කාබනික පොහොර සහ ජලය සපයන්න.' }
                    ]
                };
            } else if (diseaseName === 'Brinjal_phomopsis_blight') {
                fallbackData = {
                    CommonName_EN: 'Phomopsis Blight of Brinjal',
                    CommonName_SI: 'වම්බටු ෆොමොප්සිස් අංගමාරය (Phomopsis Blight)',
                    Symptoms_SI: 'පත්‍ර මත දුඹුරු පැහැති වටකුරු ලප ඇතිවීම, ගෙඩි මත ගිලුණු දුඹුරු පැහැති කුණුවීම් ඇතිවීම සහ ශාකය පරවී යාම.',
                    AI_Label: diseaseName,
                    Treatments: [
                        { type: 'Organic', instruction: 'රෝගී පත්‍ර සහ කුණු වූ ගෙඩි වහාම කඩා ඉවත් කර ගිනිතබන්න. බෝග පරිවර්තනය (Crop Rotation) අනුගමනය කරන්න.' },
                        { type: 'Chemical', instruction: 'කැප්ටාන් (Captan) හෝ මැන්කොසෙබ් (Mancozeb) දිලීර නාශකය නිර්දේශිත සාන්ද්‍රණයෙන් ස්ප්‍රේ කරන්න.' }
                    ]
                };
            } else if (diseaseName === 'Brinjal_shoot_and_fruit_borer') {
                fallbackData = {
                    CommonName_EN: 'Brinjal Shoot and Fruit Borer',
                    CommonName_SI: 'වම්බටු දළු සහ කරල් විදින පණුවා (Shoot & Fruit Borer)',
                    Symptoms_SI: 'ළපටි දළු මැලවී පහළට කඩා හැලීම, වම්බටු ගෙඩි තුළට පණුවන් විද යෑමෙන් ගෙඩි මත කුඩා හිල් ඇතිවීම සහ ගෙඩි කුණු වීම.',
                    AI_Label: diseaseName,
                    Treatments: [
                        { type: 'Organic', instruction: 'හානි වූ දළු සහ ගෙඩි පණුවා සමඟම කපා ඉවත් කර විනාශ කරන්න. ෆෙරමෝන් උගුල් (Pheromone Traps) භාවිත කර පරයන් මර්දනය කරන්න.' },
                        { type: 'Chemical', instruction: 'කොරන්ට්‍රානිලිප්‍රෝල් (Chlorantraniliprole) හෝ ස්පිනොසෑඩ් (Spinosad) කෘමිනාශකය නිර්දේශිත පරිදි යොදන්න.' }
                    ]
                };
            } else if (diseaseName === 'Brinjal_wet_rot') {
                fallbackData = {
                    CommonName_EN: 'Brinjal Wet Rot (Choanephora Rot)',
                    CommonName_SI: 'වම්බටු තෙත කුණුවීමේ රෝගය (Wet Rot)',
                    Symptoms_SI: 'මල් සහ ළපටි ගෙඩි මත තෙතමනය සහිත කලු/දුඹුරු පැහැති පූස් අච්චු (දිලීර) හට ගැනීම සහ ගෙඩි සිනිඳු වී කුණු වී හැලී යාම.',
                    AI_Label: diseaseName,
                    Treatments: [
                        { type: 'Organic', instruction: 'වගාවේ වාතාශ්‍රය වැඩි කිරීමට අතිරික්ත පත්‍ර කපා ඉවත් කරන්න. අධික තෙතමනය රැඳීම වළක්වන්න.' },
                        { type: 'Chemical', instruction: 'කොපර් ඔක්සික්ලෝරයිඩ් (Copper Oxychloride) හෝ කාබෙන්ඩසිම් (Carbendazim) දිලීර නාශකය ස්ප්‍රේ කරන්න.' }
                    ]
                };
            }

            if (fallbackData) {
                console.log("ℹ️ Fallback දත්ත භාවිතා කරන ලදී:", diseaseName);
                return res.json({ success: true, data: fallbackData });
            }

            res.json({ 
                success: true, 
                data: {
                    AI_Label: diseaseName,
                    message: "මෙම රෝගය සඳහා විස්තර තවමත් දත්ත ගබඩාවේ නොමැත."
                }
            });

        } catch (error) {
            console.error("❌ Python ප්‍රතිඵලය කියවීමේ දෝෂයක්:", pythonOutput);
            res.status(500).json({ error: 'AI Model එකෙන් නිවැරදි ප්‍රතිඵලයක් නොලැබුණි.' });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server එක http://localhost:${PORT} හි ක්‍රියාත්මක වේ. (Powered by Supabase ☁️)`);
});