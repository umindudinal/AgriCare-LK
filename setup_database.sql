-- ============================================================================
-- AgriCare LK - Complete Database Setup Script
-- Database: AgriCareLK_DB
-- Tables: Diseases, Treatments
-- Description: Creates the AgriCareLK database and populates all 22 disease
--              classes across Tomato, Chili, and Brinjal crops with symptoms
--              and treatment instructions in Sinhala & English.
-- ============================================================================

USE master;
GO

-- 1. Create Database if it does not exist
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'AgriCareLK_DB')
BEGIN
    CREATE DATABASE AgriCareLK_DB COLLATE Latin1_General_100_CI_AS_SC_UTF8;
    PRINT 'Database AgriCareLK_DB created successfully.';
END
ELSE
BEGIN
    PRINT 'Database AgriCareLK_DB already exists.';
END
GO

USE AgriCareLK_DB;
GO

-- 2. Drop existing tables if needed for a clean rebuild
IF OBJECT_ID('dbo.Treatments', 'U') IS NOT NULL DROP TABLE dbo.Treatments;
IF OBJECT_ID('dbo.Diseases', 'U') IS NOT NULL DROP TABLE dbo.Diseases;
GO

-- 3. Create Diseases Table
CREATE TABLE dbo.Diseases (
    DiseaseID INT IDENTITY(1,1) PRIMARY KEY,
    AIModelLabel NVARCHAR(100) NOT NULL UNIQUE,
    CommonName_EN NVARCHAR(200) NOT NULL,
    CommonName_SI NVARCHAR(200) NOT NULL,
    Symptoms_SI NVARCHAR(MAX) NOT NULL
);
GO

-- 4. Create Treatments Table
CREATE TABLE dbo.Treatments (
    TreatmentID INT IDENTITY(1,1) PRIMARY KEY,
    DiseaseID INT NOT NULL FOREIGN KEY REFERENCES dbo.Diseases(DiseaseID) ON DELETE CASCADE,
    TreatmentType NVARCHAR(50) NOT NULL, -- 'Organic' or 'Chemical'
    Instruction_SI NVARCHAR(MAX) NOT NULL
);
GO

-- ============================================================================
-- 5. Insert Data: Tomato Diseases (10 Classes)
-- ============================================================================

-- 1. Tomato Late Blight
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Tomato___Late_blight',
    N'Tomato Late Blight',
    N'තක්කාලි පසු අංගමාරය (Late Blight)',
    N'පත්‍ර සහ කඳන් මත තෙත සහිත අක්‍රමවත් දුඹුරු හෝ දම් පැහැති ලප ඇතිවීම, අධික ආර්ද්‍රතාවයේදී පත්‍ර යට සුදු පැහැති දිලීර වර්ධනයක් දැකිය හැකි වීම සහ මුළු ශාකයම ඉක්මනින් විනාශ වීම.'
);
DECLARE @d1 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d1, N'Organic', N'රෝගී වූ පත්‍ර සහ කොටස් වහාම කපා ඉවත් කර ක්ෂේත්‍රයෙන් බැහැරව ගිනිතබා හෝ වලදමා විනාශ කරන්න.'),
(@d1, N'Organic', N'5% කොහොඹ ඇට සාරය (NSKE) හෝ කොහොඹ තෙල් සබන් දියර මිශ්‍රණය සතියකට වරක් ස්ප්‍රේ කරන්න.'),
(@d1, N'Organic', N'වැසි කාලයට පෙර 1% බෝඩෝ මිශ්‍රණය (Bordeaux Mixture) දිලීර නාශකයක් ලෙස වගාවට යොදන්න.'),
(@d1, N'Chemical', N'රෝග ලක්ෂණ දුටු වහාම මැන්කොසෙබ් 80% WP (Mancozeb) වතුර ලීටර් 10 කට ග්‍රෑම් 30-35 බැගින් දියකර ස්ප්‍රේ කරන්න.'),
(@d1, N'Chemical', N'රෝගය උත්සන්න අවස්ථාවලදී මෙටලැක්සිල් + මැන්කොසෙබ් (Ridomil Gold) වතුර ලීටර් 10 කට ග්‍රෑම් 20 බැගින් යොදන්න.');

-- 2. Tomato Early Blight
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Tomato___Early_blight',
    N'Tomato Early Blight',
    N'තක්කාලි මුල් අංගමාරය (Early Blight)',
    N'පරණ පහළ පත්‍ර මත ඉලක්ක පුවරුවක් වැනි කේන්ද්‍රීය වළලු සහිත දුඹුරු-කළු ලප ඇතිවීම, පත්‍ර කහ පැහැයට හැරී වේලා හැලී යාම.'
);
DECLARE @d2 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d2, N'Organic', N'පස මට්ටමේ සිට අඟල් 12ක් දක්වා පහළ රෝගී පත්‍ර කපා ඉවත් කර වාතාශ්‍රය වැඩි කරන්න.'),
(@d2, N'Organic', N'ට්‍රයිකොඩර්මා (Trichoderma) හෝ කොම්පෝස්ට් තේ ද්‍රාවණය පසට යොදන්න.'),
(@d2, N'Chemical', N'ක්ලොරොතැලොනිල් 75% WP (Chlorothalonil) වතුර ලීටර් 10 කට ග්‍රෑම් 20ක් හෝ කොපර් හයිඩ්‍රොක්සයිඩ් ස්ප්‍රේ කරන්න.');

-- 3. Tomato Bacterial Spot
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Tomato___Bacterial_spot',
    N'Tomato Bacterial Spot',
    N'තක්කාලි බැක්ටීරියා කොළ ලප රෝගය (Bacterial Spot)',
    N'පත්‍ර, කඳන් සහ කොළ පැහැති ගෙඩි මත කුඩා තෙතමනය සහිත අඳුරු ලප ඇතිවීම, ලප වටා කහ පැහැති වලල්ලක් හටගැනීම සහ පත්‍ර හැලී යාම.'
);
DECLARE @d3 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d3, N'Organic', N'රෝගී ශාක කොටස් ඉවත් කර විනාශ කරන්න. බීජ සිටුවීමට පෙර සෙල්සියස් අංශක 50 උණුසුම් ජලයේ විනාඩි 25ක් තබා බීජ ප්‍රතිකාර කරන්න.'),
(@d3, N'Chemical', N'කොපර් ඔක්සික්ලෝරයිඩ් 50% WP (වතුර 10L ට 30g) සමඟ කැසුගාමයිසින් (Kasugamycin) හෝ ස්ට්‍රෙප්ටොමයිසින් මිශ්‍ර කර යොදන්න.');

-- 4. Tomato Leaf Mold
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Tomato___Leaf_Mold',
    N'Tomato Leaf Mold',
    N'තක්කාලි පත්‍ර පුස් රෝගය (Leaf Mold)',
    N'පත්‍රයේ උඩ පැත්තේ ලා කොළ හෝ කහ පැහැති ලප හටගැනීම සහ ඊට යටින් ඔලිව් කොළ හෝ දුඹුරු පැහැති වෙල්වට් වැනි පුස් වර්ධනයක් ඇතිවීම.'
);
DECLARE @d4 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d4, N'Organic', N'පැල අතර වාතාශ්‍රය වැඩි කරන්න. බේකින් සෝඩා හෝ පොටෑසියම් බයිකාබනේට් (5g/L) දියර සබන් සමඟ මිශ්‍ර කර ස්ප්‍රේ කරන්න.'),
(@d4, N'Chemical', N'මැන්කොසෙබ් 80% WP හෝ කැප්ටාන් 50% WP දින 7-10 ක පරතරයකින් ස්ප්‍රේ කරන්න.');

-- 5. Tomato Septoria Leaf Spot
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Tomato___Septoria_leaf_spot',
    N'Septoria Leaf Spot',
    N'සෙප්ටෝරියා කොළ ලප රෝගය (Septoria Leaf Spot)',
    N'පත්‍ර මත මැද අළු පැහැති සහ වටේ තද දුඹුරු දාර සහිත කුඩා වටකුරු ලප රාශියක් ඇතිවීම, ලප මැද කුඩා කළු තිත් දැකිය හැකිවීම.'
);
DECLARE @d5 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d5, N'Organic', N'පසෙන් බීජාණු විසිවීම වැළැක්වීමට පිදුරු වසුන් යොදන්න. පහළ රෝගී පත්‍ර වහාම කඩා ඉවත් කරන්න.'),
(@d5, N'Chemical', N'ක්ලොරොතැලොනිල් 75% WP හෝ ඇසොක්සිස්ට්‍රොබින් (Azoxystrobin 23% SC) ලීටර් 10 කට මිලිලීටර් 10ක් යොදන්න.');

-- 6. Tomato Spider Mites
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Tomato___Spider_mites Two-spotted_spider_mite',
    N'Two-Spotted Spider Mite Damage',
    N'තක්කාලි කීඩෑ හානිය (Spider Mites)',
    N'පත්‍ර මතුපිට කහ-සුදු කුඩා තිත් ඇතිවීම, පත්‍ර ලෝකඩ පැහැයට හැරී වියළී යාම සහ පත්‍ර යට සිහින් මකුළු දැල් දැකිය හැකිවීම.'
);
DECLARE @d6 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d6, N'Organic', N'කොහොඹ තෙල් (ලීටරයකට 3ml) සබන් දියර සමඟ මිශ්‍ර කර පත්‍ර යටට අධි පීඩනයෙන් ස්ප්‍රේ කරන්න.'),
(@d6, N'Chemical', N'ඇබමෙක්ටින් 1.8% EC (Abamectin) ලීටර් 10කට 10ml හෝ ස්පයිරෝමෙසිෆෙන් (Spiromesifen) පත්‍ර යටට ස්ප්‍රේ කරන්න.');

-- 7. Tomato Target Spot
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Tomato___Target_Spot',
    N'Tomato Target Spot',
    N'තක්කාලි ටාගට් ස්පොට් රෝගය (Target Spot)',
    N'පත්‍ර මත කේන්ද්‍රීය වළලු සහ කහ පැහැති දාර සහිත දුඹුරු පැහැති වටකුරු ලප ඇතිවීම, කඳන් සහ ගෙඩි වලටද පැතිර යාම.'
);
DECLARE @d7 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d7, N'Organic', N'අමතර රිකිලි කප්පාදු කර වාතාශ්‍රය සහ හිරු එළිය ශාකයට හොඳින් ලැබීමට සලස්වන්න.'),
(@d7, N'Chemical', N'පයිරැක්ලෝස්ට්‍රොබින් 20% WG හෝ මැන්කොසෙබ් 80% WP නිර්දේශිත පරිදි ස්ප්‍රේ කරන්න.');

-- 8. Tomato Yellow Leaf Curl Virus
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    N'Tomato Yellow Leaf Curl Virus (TYLCV)',
    N'තක්කාලි කහ කොළ කොඩවීම (Yellow Leaf Curl Virus)',
    N'පත්‍ර ඉහළට ගුලි වී කෝප්ප හැඩයට හැරීම, පත්‍ර දාර කහ පැහැවීම, ශාකය කුරු වීම සහ මල් හැලී අස්වැන්න සම්පූර්ණයෙන්ම නැතිවීම.'
);
DECLARE @d8 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d8, N'Organic', N'සුදුමැස්සන් මර්දනයට කහ ඇලෙන සුළු උගුල් (Yellow Sticky Traps) අක්කරයකට 15-20ක් සවිකරන්න. රෝගී පැල ගලවා මුද්‍රා තැබූ බෑග් වල දමා විනාශ කරන්න.'),
(@d8, N'Chemical', N'සුදුමැස්සා මර්දනයට ඉමිඩැක්ලෝප්‍රිඩ් 200 SL (10L ට 5ml) හෝ තයමෙතොක්සම් 25% WG (10L ට 3g) ස්ප්‍රේ කරන්න.');

-- 9. Tomato Mosaic Virus
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Tomato___Tomato_mosaic_virus',
    N'Tomato Mosaic Virus (ToMV)',
    N'තක්කාලි මොසැයික් වෛරසය (Mosaic Virus)',
    N'පත්‍ර මත ලා කොළ සහ තද කොළ පැහැති මොසැයික් විචිත්‍ර රටා ඇතිවීම, පත්‍ර විකෘති වීම සහ ගෙඩි කුඩා වීම.'
);
DECLARE @d9 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d9, N'Organic', N'රෝගී පැල වහාම ගලවා ගිනිතබා විනාශ කරන්න. පැල ඇල්ලීමට පෙර අත් සහ උපකරණ සබන් දියරයෙන් හොඳින් සෝදන්න.'),
(@d9, N'Chemical', N'වෛරස් සඳහා සෘජු රසායනික ප්‍රතිකාර නොමැත; උපකරණ පිරිසිදුව තබාගැනීම සහ වල් මර්දනය ප්‍රධාන වේ.');

-- 10. Tomato Healthy
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Tomato___healthy',
    N'Healthy Tomato Plant',
    N'නිරෝගී තක්කාලි ශාකයක් (Healthy Plant)',
    N'පත්‍ර මත කිසිදු ලපයක්, කහ වීමක්, විකෘති වීමක් හෝ කෘමි හානියක් නොමැත. ශාකය නිරෝගී සවිමත් තත්ත්වයේ පවතී.'
);
DECLARE @d10 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d10, N'Organic', N'සති දෙකකට වරක් කොම්පෝස්ට් හෝ ජීවාමෘත යොදමින් නිරෝගී වර්ධනයක් පවත්වා ගන්න.'),
(@d10, N'Chemical', N'ප්‍රතිකාර අවශ්‍ය නොවේ. නිර්දේශිත සමබර පොහොර යොදන්න.');

-- ============================================================================
-- 6. Insert Data: Chili Diseases (7 Classes)
-- ============================================================================

-- 11. Chili Fruit Rot / Anthracnose
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Chili_fruit_rot',
    N'Chili Fruit Rot / Anthracnose',
    N'මිරිස් කරල් කුණුවීමේ රෝගය (Anthracnose / Fruit Rot)',
    N'මිරිස් කරල් මත තෙතමනය සහිත දුඹුරු හෝ කළු පැහැති ගිලුණු වටකුරු ලප ඇතිවීම, කරල් වියළී පිදුරු පැහැ ගැන්වී කුණු වී හැලී යෑම.'
);
DECLARE @d11 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d11, N'Organic', N'රෝගී වූ මිරිස් කරල් වහාම කඩා ඉවත් කර ගිනිතබා විනාශ කරන්න. 5% කොහොඹ ඇට සාරය හෝ 1% බෝඩෝ මිශ්‍රණය මල් පිපෙන අවස්ථාවේ යොදන්න.'),
(@d11, N'Chemical', N'මැන්කොසෙබ් 80% WP (10L ට 30g) හෝ කැප්ටාන් 50% WP (10L ට 25g) මල් හටගන්නා විට දින 10කට වරක් ස්ප්‍රේ කරන්න. උග්‍ර අවස්ථාවල ටෙබුකොනසෝල් (Tebuconazole) යොදන්න.');

-- 12. Chili Leaf Curl
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Chili__leaf curl',
    N'Chili Leaf Curl Virus Disease',
    N'මිරිස් කොළ කොඩවීම (Leaf Curl Virus)',
    N'පත්‍ර ඉහළට හෝ පහළට රැලි ගැසී කුඩා වීම, අතු අතර පරතරය අඩුවී ශාකය පඳුරක් මෙන් කුරු වීම සහ මල් හටගැනීම නැවතීම.'
);
DECLARE @d12 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d12, N'Organic', N'සුදුමැස්සන් හා පැළ මැක්කන් (Thrips) සඳහා කහ සහ නිල් ඇලෙන සුළු උගුල් යොදන්න. කොහොඹ තෙල් (ලීටරයකට 5ml) සබන් මිශ්‍ර කර පත්‍ර යටට ස්ප්‍රේ කරන්න.'),
(@d12, N'Chemical', N'පැළ මැක්කන් සහ සුදුමැස්සන් මර්දනයට ෆිප්‍රොනිල් 5% SC (10L ට 15ml) හෝ ඉමිඩැක්ලෝප්‍රිඩ් 200 SL (10L ට 5ml) ස්ප්‍රේ කරන්න.');

-- 13. Chili Leaf Spot
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Chili__leaf spot',
    N'Chili Cercospora Leaf Spot (Frog-Eye)',
    N'මිරිස් කොළ ලප රෝගය (Cercospora Leaf Spot)',
    N'ගෙම්බන්ගේ ඇස් වැනි මැද අළු-සුදු සහ වටේ තද දුඹුරු පැහැති දාර සහිත වටකුරු ලප පත්‍ර මත ඇතිවීම සහ පත්‍ර හැලී යාම.'
);
DECLARE @d13 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d13, N'Organic', N'පහළ රෝගී පත්‍ර කපා ඉවත් කරන්න. කොපර් අඩංගු කාබනික දිලීර නාශක හෝ ට්‍රයිකොඩර්මා යොදන්න.'),
(@d13, N'Chemical', N'මැන්කොසෙබ් 80% WP (10L ට 30g) හෝ කාබෙන්ඩසිම් 50% WP (10L ට 10g) පත්‍ර වලට ස්ප්‍රේ කරන්න.');

-- 14. Chili Whitefly
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Chili__whitefly',
    N'Chili Whitefly Infestation',
    N'මිරිස් සුදුමැස්සා හානිය (Whitefly Infestation)',
    N'ශාකය සොලවන විට කුඩා සුදු මැස්සන් රංචු පිටින් පියාඹා යාම, යුෂ උරා බීම නිසා පත්‍ර කහ පැහැවීම සහ කළු පැහැති පුස් (Sooty Mold) හටගැනීම.'
);
DECLARE @d14 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d14, N'Organic', N'කහ ඇලෙන සුළු උගුල් ක්ෂේත්‍රයේ සවිකරන්න. කොහොඹ-සුදුලූනු සාරය හෝ දියර සබන් මිශ්‍රණය පත්‍ර යටට ස්ප්‍රේ කරන්න.'),
(@d14, N'Chemical', N'ඇසිටමිප්‍රිඩ් 20% SP (10L ට 5g) හෝ තයමෙතොක්සම් 25% WG (10L ට 4g) යොදන්න.');

-- 15. Chili Yellowish
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Chili__yellowish',
    N'Chili Leaf Chlorosis / Nutrient Deficiency',
    N'මිරිස් පත්‍ර කහ වීම / පෝෂණ ඌනතාවය (Chlorosis)',
    N'පත්‍ර නාරටි අතර හෝ සම්පූර්ණ පත්‍රයම ලා කහ පැහැයට හැරීම, කඳන් කෙට්ටු වීම සහ ශාකයේ වර්ධනය බාල වීම (නයිට්‍රජන්, යකඩ හෝ මැග්නීසියම් ඌනතාවය).'
);
DECLARE @d15 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d15, N'Organic', N'කොම්පෝස්ට් තේ ද්‍රාවණය හෝ දියර ගොම පොහොර මුල් වලට යොදන්න. එප්සම් ලුණු (Epsom Salt) ලීටර් 10කට 10g බැගින් දියකර පත්‍ර වලට ඉසින්න.'),
(@d15, N'Chemical', N'සින්ක්, යකඩ, බෝරෝන් සහ මැග්නීසියම් අඩංගු ක්ෂුද්‍ර පෝෂක ද්‍රාවණයක් (Foliar Micronutrient) ලීටරයකට 1-2ml බැගින් ස්ප්‍රේ කරන්න.');

-- 16. Chili Fruit Healthy
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Chili_fruit_healthy',
    N'Healthy Chili Fruit',
    N'නිරෝගී මිරිස් කරලක් (Healthy Fruit)',
    N'මිරිස් කරලේ කිසිදු ලපයක්, කුණුවීමක් හෝ රෝග ලක්ෂණයක් නොමැත. කරල සෞඛ්‍ය සම්පන්න දිලිසෙන තත්ත්වයේ පවතී.'
);
DECLARE @d16 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d16, N'Organic', N'පසෙහි තෙතමනය නිසි පරිදි පවත්වා ගනිමින් කාබනික පොහොර ලබාදෙන්න.'),
(@d16, N'Chemical', N'ප්‍රතිකාර අවශ්‍ය නොවේ. නියමිත කාලයට අස්වැන්න නෙළාගන්න.');

-- 17. Chili Plant Healthy
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Chili__healthy',
    N'Healthy Chili Plant',
    N'නිරෝගී මිරිස් ශාකයක් (Healthy Plant)',
    N'පත්‍ර තද කොළ පැහැතිව නිරෝගීව පවතින අතර කිසිදු රෝග හෝ පළිබෝධ හානියක් නොමැත.'
);
DECLARE @d17 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d17, N'Organic', N'නිතිපතා කාබනික පොහොර සහ අවශ්‍ය පමණට ජලය ලබාදෙන්න.'),
(@d17, N'Chemical', N'ප්‍රතිකාර අවශ්‍ය නොවේ.');

-- ============================================================================
-- 7. Insert Data: Brinjal / Eggplant Diseases (5 Classes)
-- ============================================================================

-- 18. Brinjal Shoot and Fruit Borer
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Brinjal_shoot_and_fruit_borer',
    N'Brinjal Shoot and Fruit Borer',
    N'වම්බටු දළු සහ කරල් විදින පණුවා (Shoot & Fruit Borer)',
    N'ළපටි දළු මැලවී පහළට කඩා හැලීම, වම්බටු ගෙඩි තුළට පණුවන් විද යෑමෙන් ගෙඩි මත කුඩා හිල් හා මලද්‍රව්‍ය දැකිය හැකිවීම සහ ගෙඩි කුණු වීම.'
);
DECLARE @d18 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d18, N'Organic', N'හානි වූ දළු සහ ගෙඩි පණුවා සමඟම කපා ඉවත් කර ක්ෂේත්‍රයෙන් බැහැරව විනාශ කරන්න. ෆෙරමෝන් උගුල් (Lucinlure Pheromone Traps) අක්කරයකට 8-10ක් සවිකරන්න. කොහොඹ තෙල් (5ml/L) දින 5කට වරක් දළු වලට ස්ප්‍රේ කරන්න.'),
(@d18, N'Chemical', N'ක්ලොරැන්ට්‍රානිලිප්‍රෝල් 18.5% SC (Coragen - 10L ට 3ml) හෝ ස්පිනොසෑඩ් 45% SC (10L ට 4ml) හෝ එමාමෙක්ටින් බෙන්සොඒට් (10L ට 4g) මාරුවෙන් මාරුවට යොදන්න.');

-- 19. Brinjal Fruit Cracking
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Brinjal_fruit_cracking',
    N'Brinjal Fruit Cracking',
    N'වම්බටු ගෙඩි පිපිරීමේ රෝගය (Fruit Cracking)',
    N'වම්බටු ගෙඩි මත ඉරි තැළුණු හෝ පිපිරුණු ස්වභාවයක් ඇතිවීම, බෝරෝන් හා කැල්සියම් ඌනතා හෝ ජල හිඟකම නිසා ගෙඩි මතුපිට වියළී ඉරී යාම.'
);
DECLARE @d19 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d19, N'Organic', N'පසෙහි තෙතමනය නියත මට්ටමක පවත්වා ගැනීමට නිසි පරිදි ජලසම්පාදනය කරන්න. බෝරෝන් හා කැල්සියම් අඩංගු කාබනික පොහොර හෝ කොම්පෝස්ට් පසට එකතු කරන්න.'),
(@d19, N'Chemical', N'බෝරෝන් 20% ක්ෂුද්‍ර පෝෂක ද්‍රාවණයක් (Boron Foliar Spray) පත්‍ර වලට ස්ප්‍රේ කරන්න.');

-- 20. Brinjal Phomopsis Blight
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Brinjal_phomopsis_blight',
    N'Phomopsis Blight of Brinjal',
    N'වම්බටු ෆොමොප්සිස් අංගමාරය (Phomopsis Blight)',
    N'පත්‍ර මත දුඹුරු පැහැති වටකුරු ලප ඇතිවීම, ගෙඩි මත ගිලුණු දුඹුරු පැහැති කුණුවීම් ඇතිවීම සහ ශාකය පරවී යාම.'
);
DECLARE @d20 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d20, N'Organic', N'රෝගී පත්‍ර සහ කුණු වූ ගෙඩි වහාම කඩා ඉවත් කර ගිනිතබන්න. බෝග පරිවර්තනය (Crop Rotation) අනුගමනය කරන්න.'),
(@d20, N'Chemical', N'කැප්ටාන් (Captan) හෝ මැන්කොසෙබ් (Mancozeb) දිලීර නාශකය නිර්දේශිත සාන්ද්‍රණයෙන් ස්ප්‍රේ කරන්න.');

-- 21. Brinjal Wet Rot
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Brinjal_wet_rot',
    N'Brinjal Wet Rot (Choanephora Rot)',
    N'වම්බටු තෙත කුණුවීමේ රෝගය (Wet Rot)',
    N'මල් සහ ළපටි ගෙඩි මත තෙතමනය සහිත කලු/දුඹුරු පැහැති පූස් අච්චු (දිලීර) හට ගැනීම සහ ගෙඩි සිනිඳු වී කුණු වී හැලී යාම.'
);
DECLARE @d21 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d21, N'Organic', N'වගාවේ වාතාශ්‍රය වැඩි කිරීමට අතිරික්ත පත්‍ර කපා ඉවත් කරන්න. අධික තෙතමනය රැඳීම වළක්වන්න.'),
(@d21, N'Chemical', N'කොපර් ඔක්සික්ලෝරයිඩ් (Copper Oxychloride) හෝ කාබෙන්ඩසිම් (Carbendazim) දිලීර නාශකය ස්ප්‍රේ කරන්න.');

-- 22. Brinjal Healthy Fruit
INSERT INTO dbo.Diseases (AIModelLabel, CommonName_EN, CommonName_SI, Symptoms_SI)
VALUES (
    N'Brinjal_healthy_fruit',
    N'Healthy Brinjal Fruit',
    N'නිරෝගී වම්බටු ගෙඩියක් (Healthy Fruit)',
    N'වම්බටු ගෙඩියේ කිසිදු ලපයක්, පණුවන් හානියක් හෝ පිපිරීමක් නොමැත. ගෙඩිය නිරෝගී තත්ත්වයේ පවතී.'
);
DECLARE @d22 INT = SCOPE_IDENTITY();
INSERT INTO dbo.Treatments (DiseaseID, TreatmentType, Instruction_SI) VALUES
(@d22, N'Organic', N'නිරෝගී වගාවක් පවත්වා ගැනීම සඳහා නිසි පරිදි කාබනික පොහොර සහ ජලය සපයන්න.'),
(@d22, N'Chemical', N'ප්‍රතිකාර අවශ්‍ය නොවේ.');
GO

-- ============================================================================
-- Verification Queries
-- ============================================================================
PRINT '---------------------------------------------------';
PRINT 'AgriCareLK_DB Database Setup Completed Successfully!';
PRINT '---------------------------------------------------';
SELECT COUNT(*) AS [Total Diseases Count] FROM dbo.Diseases;
SELECT COUNT(*) AS [Total Treatments Count] FROM dbo.Treatments;
GO
