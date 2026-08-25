const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// mssql වෙනුවට කෙළින්ම msnodesqlv8 පාවිච්චි කිරීම
const sql = require('msnodesqlv8'); 

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// Python වල 100% ක් වැඩ කරපු Connection String එකම මෙතන දෙනවා
const connectionString = "Driver={ODBC Driver 17 for SQL Server};Server=UMINDU-ACER\\SQLEXPRESS;Database=AgriCareLK_DB;Trusted_Connection=yes;";

app.post('/api/analyze-plant', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'කරුණාකර ඡායාරූපයක් ලබාදෙන්න.' });
    }

    const imagePath = req.file.path;
    
    // Flutter App එකෙන් එවන ශාක වර්ගය ලබාගැනීම (නැත්නම් පෙරනිමිය ලෙස 'tomato' ගනී)
    const plantType = req.body.plantType || 'tomato'; 

    let pythonScriptName = '../predict_api.py'; // තක්කාලි සඳහා පෙරනිමි script එක
    let plantNameLog = 'තක්කාලි';

    if (plantType === 'chili') {
        pythonScriptName = '../predict_chili.py'; // මිරිස් සඳහා
        plantNameLog = 'මිරිස්';
    } else if (plantType === 'brinjal') {
        pythonScriptName = '../predict_brinjal.py'; // වම්බටු සඳහා
        plantNameLog = 'වම්බටු';
    }

    console.log(`📸 ${plantNameLog} ඡායාරූපයක් ලැබුණා. AI Model එක වෙත යවමින් පවතී...`);
    
    const pythonScriptPath = path.join(__dirname, pythonScriptName);
    const pythonProcess = spawn('python', [pythonScriptPath, imagePath]);
    let pythonOutput = '';

    pythonProcess.stdout.on('data', (data) => {
        pythonOutput += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python Error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        // තාවකාලික ඡායාරූපය මකා දැමීම (මේක කරන එක හොඳයි server එක පිරෙන එක නවත්වන්න)
        try {
            fs.unlinkSync(imagePath);
        } catch (e) {
            console.error("Temporary image delete error:", e);
        }

        // අපි අලුතින් හදපු Python script එකෙන් එන්නේ JSON format එකක්
        // ඒ නිසා කලින් තිබුණු Regex (match) ක්‍රමය වෙනුවට JSON.parse පාවිච්චි කරනවා
        try {
            const aiResult = JSON.parse(pythonOutput.trim());

            if (aiResult.error) {
                console.error("❌ AI දෝෂයක්:", aiResult.error);
                return res.status(500).json({ error: 'AI විශ්ලේෂණයේදී දෝෂයක් මතු විය.' });
            }

            const diseaseName = aiResult.predicted_class;
            console.log("✅ AI එකෙන් ලැබුණු පිළිතුර:", diseaseName);
            
            console.log("🗄️ Database එකෙන් විස්තර සොයමින් පවතී...");
            
            // SQL Query එක (මෙහි දත්ත ලබාදීමට '?' භාවිතා කරයි)
            const query = `
                SELECT d.CommonName_EN, d.CommonName_SI, d.Symptoms_SI, t.TreatmentType, t.Instruction_SI
                FROM Diseases d
                LEFT JOIN Treatments t ON d.DiseaseID = t.DiseaseID
                WHERE d.AIModelLabel = ?
            `;

            // කෙළින්ම msnodesqlv8 හරහා Query එක යැවීම (Promises වෙනුවට Callbacks)
            sql.query(connectionString, query, [diseaseName], (err, rows) => {
                if (err) {
                    console.error("❌ Database දෝෂයක්:", err);
                    return res.status(500).json({ error: 'දත්ත ලබාගැනීමේදී දෝෂයක් ඇතිවිය.' });
                }

                // දත්ත සාර්ථකව ලැබුණා නම්
                if (rows && rows.length > 0) {
                    const diseaseDetails = {
                        CommonName_EN: rows[0].CommonName_EN,
                        CommonName_SI: rows[0].CommonName_SI,
                        Symptoms_SI: rows[0].Symptoms_SI,
                        AI_Label: diseaseName,
                        Treatments: []
                    };

                    rows.forEach(record => {
                        if(record.TreatmentType) {
                            diseaseDetails.Treatments.push({
                                type: record.TreatmentType,
                                instruction: record.Instruction_SI
                            });
                        }
                    });

                    console.log("✅ Database දත්ත සාර්ථකව ලබාගත්තා.");
                    res.json({ success: true, data: diseaseDetails });
                } else {
                    // Database එකේ දත්ත නැත්නම් default fallback ලබාදීම
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
                }
            });

        } catch (error) {
            console.error("❌ Python ප්‍රතිඵලය කියවීමේ දෝෂයක්:", pythonOutput);
            res.status(500).json({ error: 'AI Model එකෙන් නිවැරදි ප්‍රතිඵලයක් නොලැබුණි.' });
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server එක http://localhost:${PORT} හි ක්‍රියාත්මක වේ.`);
});