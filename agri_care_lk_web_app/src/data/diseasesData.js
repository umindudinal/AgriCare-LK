export const CROPS_DATA = [
  {
    id: 'tomato',
    name: 'Tomato Crop',
    name_si: 'Tomato (තක්කාලි)',
    emoji: '🍅',
    themeColor: '#0F5A29',
    accentColor: '#16a34a',
    bgLight: 'bg-emerald-50',
    borderLight: 'border-emerald-200',
    diseaseCount: 10,
    modelName: 'MobileNetV2 Tomato Model',
    description: 'Diagnoses 10 major fungal, bacterial, viral, and pest disorders in tomato foliage and fruits.',
    sampleImage: '/samples/tomato_late_blight.jpg',
  },
  {
    id: 'chili',
    name: 'Chili Crop',
    name_si: 'Chili (මිරිස්)',
    emoji: '🌶️',
    themeColor: '#D84315',
    accentColor: '#ea580c',
    bgLight: 'bg-orange-50',
    borderLight: 'border-orange-200',
    diseaseCount: 7,
    modelName: 'MobileNetV2 Chili Model',
    description: 'Detects anthracnose fruit rot, leaf curl virus, cercospora leaf spots, whitefly, and chlorosis.',
    sampleImage: '/samples/chili_chili_fruit_rot.jpg',
  },
  {
    id: 'brinjal',
    name: 'Brinjal / Eggplant Crop',
    name_si: 'Brinjal (වම්බටු)',
    emoji: '🍆',
    themeColor: '#6A1B9A',
    accentColor: '#9333ea',
    bgLight: 'bg-purple-50',
    borderLight: 'border-purple-200',
    diseaseCount: 5,
    modelName: 'MobileNetV2 Brinjal Model',
    description: 'Identifies shoot & fruit borer larvae, phomopsis blight, fruit cracking, and choanephora wet rot.',
    sampleImage: '/samples/brinjal_brinjal_shoot_and_fruit_borer.jpg',
  },
];

export const DISEASES_DATA = [
  // TOMATO DISEASES
  {
    id: 'tomato-late-blight',
    crop: 'tomato',
    cropEmoji: '🍅',
    cropName: 'Tomato',
    aiLabel: 'Tomato___Late_blight',
    name: 'Tomato Late Blight',
    scientificName: 'Phytophthora infestans',
    severity: 'high',
    sampleImage: '/samples/tomato_late_blight.jpg',
    symptoms: 'Water-soaked irregular dark brown to purplish lesions on foliage and stems. In cool, humid conditions, white powdery fungal sporulation appears on the undersides of leaves, rapidly destroying entire plants.',
    organicTreatments: [
      'Immediately prune and bag infected foliage, then destroy off-field by burning or deep burial.',
      'Spray 5% Neem Seed Kernel Extract (NSKE) or cold-pressed Neem Oil with mild organic soap weekly.',
      'Apply 1% Bordeaux Mixture as a preventative organic fungicide before rainy spells.'
    ],
    chemicalTreatments: [
      'Foliar spray of Mancozeb 80% WP at 30–35g per 10 Litres of water at the first sign of lesions.',
      'For severe outbreaks, apply systemic Metalaxyl 8% + Mancozeb 64% WP (e.g., Ridomil Gold) at 20g/10L.'
    ],
    prevention: 'Ensure generous plant spacing for air circulation. Use drip irrigation to prevent water droplets on leaves.'
  },
  {
    id: 'tomato-early-blight',
    crop: 'tomato',
    cropEmoji: '🍅',
    cropName: 'Tomato',
    aiLabel: 'Tomato___Early_blight',
    name: 'Tomato Early Blight',
    scientificName: 'Alternaria solani',
    severity: 'medium',
    sampleImage: '/samples/tomato_early_blight.jpg',
    symptoms: 'Distinct brown to black spots with concentric target-like rings on older lower leaves. Leaves gradually turn yellow and drop prematurely, exposing fruit to sunscald.',
    organicTreatments: [
      'Prune off all diseased lower leaves up to 12 inches from the soil surface to enhance airflow.',
      'Drench soil with beneficial Trichoderma harzianum or aerated compost tea to outcompete fungal spores.'
    ],
    chemicalTreatments: [
      'Apply Chlorothalonil 75% WP at 20g/10L or Copper Hydroxide fungicide at recommended label rates.'
    ],
    prevention: 'Practice 3-year crop rotation with non-solanaceous crops. Apply organic straw mulch to prevent soil splashing.'
  },
  {
    id: 'tomato-bacterial-spot',
    crop: 'tomato',
    cropEmoji: '🍅',
    cropName: 'Tomato',
    aiLabel: 'Tomato___Bacterial_spot',
    name: 'Tomato Bacterial Spot',
    scientificName: 'Xanthomonas campestris pv. vesicatoria',
    severity: 'high',
    sampleImage: '/samples/tomato_bacterial_spot.jpg',
    symptoms: 'Small, dark, water-soaked circular lesions on leaves, stems, and green fruits. Lesions frequently develop a bright yellow halo and cause severe defoliation.',
    organicTreatments: [
      'Remove and dispose of infected plant debris outside the cultivation perimeter.',
      'Use certified disease-free seeds and pre-treat seeds in warm water (50°C) for 25 minutes prior to nursery sowing.'
    ],
    chemicalTreatments: [
      'Spray Copper Oxychloride 50% WP (30g/10L) combined with Kasugamycin or Streptomycin for bactericidal synergy.'
    ],
    prevention: 'Avoid handling or pruning wet plants. Sterilize harvesting shears and stakes between rows.'
  },
  {
    id: 'tomato-leaf-mold',
    crop: 'tomato',
    cropEmoji: '🍅',
    cropName: 'Tomato',
    aiLabel: 'Tomato___Leaf_Mold',
    name: 'Tomato Leaf Mold',
    scientificName: 'Passalora fulva (Cladosporium)',
    severity: 'medium',
    sampleImage: '/samples/tomato_leaf_mold.jpg',
    symptoms: 'Pale green to yellow diffuse spots on the upper leaf surface, with dense olive-green to brownish velvety mold growth directly underneath in high humidity.',
    organicTreatments: [
      'Increase greenhouse or poly-tunnel ventilation to lower relative humidity below 80%.',
      'Foliar spray with a mild Potassium Bicarbonate or Baking Soda solution (5g/L) with liquid soap.'
    ],
    chemicalTreatments: [
      'Apply Mancozeb 80% WP or Captan 50% WP at 7–10 day intervals during persistent overcast weather.'
    ],
    prevention: 'Avoid overhead watering; prune dense center suckers to maximize cross-ventilation.'
  },
  {
    id: 'tomato-septoria',
    crop: 'tomato',
    cropEmoji: '🍅',
    cropName: 'Tomato',
    aiLabel: 'Tomato___Septoria_leaf_spot',
    name: 'Septoria Leaf Spot',
    scientificName: 'Septoria lycopersici',
    severity: 'medium',
    sampleImage: '/samples/tomato_septoria_leaf_spot.jpg',
    symptoms: 'Numerous small, circular spots with light greyish centers and dark brown margins. Tiny black specks (pycnidia) can be seen inside the spots with a hand lens.',
    organicTreatments: [
      'Apply organic mulch (dry paddy straw) around the base of the plant to block soil spore splash.',
      'Strip off the lowest 3–4 infected leaf branches as soon as spots first appear.'
    ],
    chemicalTreatments: [
      'Spray Chlorothalonil 75% WP or Azoxystrobin 23% SC at 10ml per 10 Litres of water.'
    ],
    prevention: 'Eradicate nightshade family weeds around field edges.'
  },
  {
    id: 'tomato-spider-mites',
    crop: 'tomato',
    cropEmoji: '🍅',
    cropName: 'Tomato',
    aiLabel: 'Tomato___Spider_mites Two-spotted_spider_mite',
    name: 'Two-Spotted Spider Mite Damage',
    scientificName: 'Tetranychus urticae',
    severity: 'medium',
    sampleImage: '/samples/tomato_spider_mites_two-spotted_spider_mite.jpg',
    symptoms: 'Fine yellow-white stippling dots across leaf surfaces, leading to bronzing, dry brittle leaves, and silken webs spun underneath foliage.',
    organicTreatments: [
      'Spray cold-pressed Neem oil (3ml/L) + Potassium soap solution with high nozzle pressure under leaves.',
      'Introduce or conserve predatory phytoseiid mites in enclosed greenhouses.'
    ],
    chemicalTreatments: [
      'Apply Abamectin 1.8% EC at 10ml/10L or Spiromesifen 22.9% SC targeting the undersides of foliage.'
    ],
    prevention: 'Keep field borders moist and reduce dust accumulation on foliage.'
  },
  {
    id: 'tomato-yellow-leaf-curl',
    crop: 'tomato',
    cropEmoji: '🍅',
    cropName: 'Tomato',
    aiLabel: 'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    name: 'Tomato Yellow Leaf Curl Virus (TYLCV)',
    scientificName: 'Begomovirus (Whitefly-transmitted)',
    severity: 'high',
    sampleImage: '/samples/tomato_tomato_yellow_leaf_curl_virus.jpg',
    symptoms: 'Severe upward curling and cupping of leaflets, chlorotic (yellow) margins, stunted bushy growth, and floral drop resulting in near-total yield loss.',
    organicTreatments: [
      'Deploy yellow sticky sheets (15–20 traps/acre) to monitor and trap adult whitefly vectors.',
      'Immediately rogue out and safely dispose of infected virus-stunted plants in sealed plastic bags.'
    ],
    chemicalTreatments: [
      'Control the whitefly vector using Imidacloprid 200 SL (5ml/10L) or Thiamethoxam 25% WG (3g/10L).'
    ],
    prevention: 'Use 40–50 mesh insect-proof netting over nursery beds and cultivate TYLCV-tolerant hybrid varieties.'
  },
  {
    id: 'tomato-mosaic-virus',
    crop: 'tomato',
    cropEmoji: '🍅',
    cropName: 'Tomato',
    aiLabel: 'Tomato___Tomato_mosaic_virus',
    name: 'Tomato Mosaic Virus (ToMV)',
    scientificName: 'Tobamovirus',
    severity: 'high',
    sampleImage: '/samples/tomato_tomato_mosaic_virus.jpg',
    symptoms: 'Alternating light green and dark green mottled mosaic patterns on leaves, fern-like leaf distortion, internal fruit browning, and reduced fruit size.',
    organicTreatments: [
      'Immediately uproot and burn infected plants to halt mechanical spread.',
      'Dip hands and tools in 20% non-fat skim milk solution or soap solution between handling plants.'
    ],
    chemicalTreatments: [
      'No direct chemical cure exists for plant viruses; focus on rigorous tool hygiene and weed sanitation.'
    ],
    prevention: 'Never handle tomato plants after using tobacco products (tobacco can carry viable mosaic virus).'
  },
  {
    id: 'tomato-target-spot',
    crop: 'tomato',
    cropEmoji: '🍅',
    cropName: 'Tomato',
    aiLabel: 'Tomato___Target_Spot',
    name: 'Tomato Target Spot',
    scientificName: 'Corynespora cassiicola',
    severity: 'medium',
    sampleImage: '/samples/tomato_target_spot.jpg',
    symptoms: 'Brown circular leaf lesions with subtle concentric rings and distinct yellow chlorotic halos, frequently spreading to stems and developing green fruit.',
    organicTreatments: [
      'Promote fast canopy drying by staking plants and trimming excess non-fruiting suckers.'
    ],
    chemicalTreatments: [
      'Apply Pyraclostrobin 20% WG or Mancozeb 80% WP at recommended agronomic intervals.'
    ],
    prevention: 'Incorporate or deeply bury post-harvest crop residues immediately after picking.'
  },
  {
    id: 'tomato-healthy',
    crop: 'tomato',
    cropEmoji: '🍅',
    cropName: 'Tomato',
    aiLabel: 'Tomato___healthy',
    name: 'Healthy Tomato Plant',
    scientificName: 'Solanum lycopersicum',
    severity: 'healthy',
    sampleImage: '/samples/tomato_healthy.jpg',
    symptoms: 'Vibrant, deep green, robust foliage with no chlorosis, wilting, necrosis, spotting, or insect pest infestation.',
    organicTreatments: [
      'Maintain vigorous growth with bi-weekly applications of well-composted organic matter or liquid vermiwash.',
      'Maintain regular balanced drip watering schedule to avoid calcium-related blossom end rot.'
    ],
    chemicalTreatments: [
      'No treatments required. Continue standard balanced NPK fertigation schedule.'
    ],
    prevention: 'Conduct daily scout inspections across leaf undersides to detect any early signs of disease.'
  },

  // CHILI DISEASES
  {
    id: 'chili-fruit-rot',
    crop: 'chili',
    cropEmoji: '🌶️',
    cropName: 'Chili',
    aiLabel: 'Chili_fruit_rot',
    name: 'Chili Anthracnose / Fruit Rot',
    scientificName: 'Colletotrichum capsici / gloeosporioides',
    severity: 'high',
    sampleImage: '/samples/chili_chili_fruit_rot.jpg',
    symptoms: 'Sunken, circular water-soaked dark lesions on ripe and green chili pods with concentric rings of salmon-pink to black fungal spores. Pods shrivel, turn straw-colored, and rot.',
    organicTreatments: [
      'Pick and remove all infected chili pods immediately; burn or bury them away from the field.',
      'Spray 5% Neem Seed Kernel Extract (NSKE) or 1% Bordeaux mixture at first flowering.'
    ],
    chemicalTreatments: [
      'Spray Mancozeb 80% WP (30g/10L) or Captan 50% WP (25g/10L) from flower initiation at 10-day intervals.',
      'For severe conditions, apply systemic Tebuconazole 25.9% EC (10ml/10L) or Azoxystrobin.'
    ],
    prevention: 'Use certified disease-free seed; maintain proper raised bed drainage to avoid standing water.'
  },
  {
    id: 'chili-leaf-curl',
    crop: 'chili',
    cropEmoji: '🌶️',
    cropName: 'Chili',
    aiLabel: 'Chili__leaf curl',
    name: 'Chili Leaf Curl Virus Disease',
    scientificName: 'Chili leaf curl virus (ChiLCV)',
    severity: 'high',
    sampleImage: '/samples/chili_leaf_curl.jpg',
    symptoms: 'Upward or downward curling, puckering, and crinkling of leaves, shortened internodes resulting in bushy stunted plants, and complete floral abortion.',
    organicTreatments: [
      'Erect yellow sticky sheets (for whiteflies) and blue sticky sheets (for thrips) at 15–20 per acre.',
      'Spray Neem oil (5ml/L) emulsified with organic dish soap thoroughly on leaf undersides.'
    ],
    chemicalTreatments: [
      'Control thrips and whitefly vectors with Fipronil 5% SC (15ml/10L) or Imidacloprid 200 SL (5ml/10L).'
    ],
    prevention: 'Cover seedling nursery beds with fine insect netting to protect young transplants from early vector feeding.'
  },
  {
    id: 'chili-leaf-spot',
    crop: 'chili',
    cropEmoji: '🌶️',
    cropName: 'Chili',
    aiLabel: 'Chili__leaf spot',
    name: 'Chili Cercospora Leaf Spot (Frog-Eye)',
    scientificName: 'Cercospora capsici',
    severity: 'medium',
    sampleImage: '/samples/chili_leaf_spot.jpg',
    symptoms: 'Circular frog-eye lesions with light greyish-white centers and prominent dark reddish-brown borders. Severe infections trigger extensive defoliation.',
    organicTreatments: [
      'Prune lower diseased foliage to eliminate the primary spore reservoir.',
      'Apply copper-based organic formulations or Trichoderma biocontrol sprays.'
    ],
    chemicalTreatments: [
      'Apply Mancozeb 80% WP (30g/10L) or Carbendazim 50% WP (10g/10L) on foliage.'
    ],
    prevention: 'Avoid overhead sprinkler watering during late afternoon hours.'
  },
  {
    id: 'chili-whitefly',
    crop: 'chili',
    cropEmoji: '🌶️',
    cropName: 'Chili',
    aiLabel: 'Chili__whitefly',
    name: 'Chili Whitefly Infestation',
    scientificName: 'Bemisia tabaci',
    severity: 'medium',
    sampleImage: '/samples/chili_whitefly.jpg',
    symptoms: 'Clouds of tiny white insects taking flight when foliage is touched, sap-feeding chlorosis, and sticky honeydew secretions colonised by black sooty mold.',
    organicTreatments: [
      'Install yellow sticky sheets across the field canopy level.',
      'Apply neem-garlic extract or soap spray with high nozzle pressure directed under the leaves.'
    ],
    chemicalTreatments: [
      'Apply Acetamiprid 20% SP (5g/10L) or Thiamethoxam 25% WG (4g/10L).'
    ],
    prevention: 'Keep field bunds weed-free to eliminate alternative weed hosts.'
  },
  {
    id: 'chili-yellowish',
    crop: 'chili',
    cropEmoji: '🌶️',
    cropName: 'Chili',
    aiLabel: 'Chili__yellowish',
    name: 'Chili Leaf Chlorosis / Nutrient Deficiency',
    scientificName: 'Nitrogen / Iron / Magnesium Deficiency',
    severity: 'low',
    sampleImage: '/samples/chili_yellowish.jpg',
    symptoms: 'Interveinal or generalized pale yellowing of chili foliage, thin stems, and sluggish vegetative growth caused by root-zone nutrient deficiencies or pH lockout.',
    organicTreatments: [
      'Apply rich compost tea or well-rotted cow dung manure liquid drench to the root zone.',
      'Spray Magnesium Sulfate (Epsom Salt) at 10g per 10 Litres of water for rapid chlorophyll restoration.'
    ],
    chemicalTreatments: [
      'Apply a balanced foliar micronutrient mixture (Zinc, Iron, Boron, Magnesium) at 1–2ml per Litre.'
    ],
    prevention: 'Maintain soil pH between 6.0 and 6.8 and ensure proper aerated bed drainage.'
  },
  {
    id: 'chili-fruit-healthy',
    crop: 'chili',
    cropEmoji: '🌶️',
    cropName: 'Chili',
    aiLabel: 'Chili_fruit_healthy',
    name: 'Healthy Chili Pod',
    scientificName: 'Capsicum annuum',
    severity: 'healthy',
    sampleImage: '/samples/chili_chili_fruit_healthy.jpg',
    symptoms: 'Glossy, firm, spotless chili pod with uniform coloration, intact green calyx, and zero insect puncture marks.',
    organicTreatments: [
      'Maintain regular organic mulching and consistent soil moisture.'
    ],
    chemicalTreatments: [
      'No treatment required. Harvest pods promptly at peak maturity.'
    ],
    prevention: 'Practice routine field sanitation.'
  },
  {
    id: 'chili-healthy',
    crop: 'chili',
    cropEmoji: '🌶️',
    cropName: 'Chili',
    aiLabel: 'Chili__healthy',
    name: 'Healthy Chili Plant',
    scientificName: 'Capsicum annuum',
    severity: 'healthy',
    sampleImage: '/samples/chili_healthy.jpg',
    symptoms: 'Lush, unblemished deep-green canopy with erect growing shoot tips and healthy flower buds.',
    organicTreatments: [
      'Support root vitality with organic compost applications.'
    ],
    chemicalTreatments: [
      'No treatment required.'
    ],
    prevention: 'Continue routine field monitoring.'
  },

  // BRINJAL / EGGPLANT DISEASES
  {
    id: 'brinjal-shoot-borer',
    crop: 'brinjal',
    cropEmoji: '🍆',
    cropName: 'Brinjal',
    aiLabel: 'Brinjal_shoot_and_fruit_borer',
    name: 'Brinjal Shoot & Fruit Borer',
    scientificName: 'Leucinodes orbonalis',
    severity: 'high',
    sampleImage: '/samples/brinjal_brinjal_shoot_and_fruit_borer.jpg',
    symptoms: 'Wilting and drooping of tender vegetative shoot tips, circular exit/entry boreholes plugged with larval frass on developing fruits, causing internal fruit rotting.',
    organicTreatments: [
      'Regularly clip and destroy wilted shoots and infested fruits along with larvae inside (deep burial or burning).',
      'Install Lucinlure Pheromone Traps at 8–10 traps per acre to mass-trap male adult moths.',
      'Spray Neem oil (5ml/L) on shoot tips at 5-day intervals.'
    ],
    chemicalTreatments: [
      'Spray Chlorantraniliprole 18.5% SC (Coragen) at 3ml per 10 Litres of water.',
      'Alternate with Spinosad 45% SC (4ml/10L) or Emamectin Benzoate 5% SG (4g/10L) to avoid insect resistance.'
    ],
    prevention: 'Destroy old brinjal stubble immediately after final harvest; avoid continuous brinjal cropping.'
  },
  {
    id: 'brinjal-fruit-cracking',
    crop: 'brinjal',
    cropEmoji: '🍆',
    cropName: 'Brinjal',
    aiLabel: 'Brinjal_fruit_cracking',
    name: 'Brinjal Fruit Cracking & Splitting',
    scientificName: 'Physiological Disorder / Boron-Calcium Deficiency',
    severity: 'medium',
    sampleImage: '/samples/brinjal_brinjal_fruit_cracking.jpg',
    symptoms: 'Longitudinal or radial skin cracking and splitting on the fruit surface, exposing internal pulp to secondary rot due to irregular irrigation and micronutrient deficiency.',
    organicTreatments: [
      'Maintain steady, consistent soil moisture through scheduled drip irrigation.',
      'Incorporate well-cured compost enriched with boron and calcium into planting beds.'
    ],
    chemicalTreatments: [
      'Foliar spray of Solubor (Disodium Octaborate Tetrahydrate) or liquid Boron 20% at 10–15g per 10 Litres.'
    ],
    prevention: 'Mulch heavily with straw to prevent rapid soil moisture fluctuations between dry and wet spells.'
  },
  {
    id: 'brinjal-phomopsis-blight',
    crop: 'brinjal',
    cropEmoji: '🍆',
    cropName: 'Brinjal',
    aiLabel: 'Brinjal_phomopsis_blight',
    name: 'Phomopsis Blight & Fruit Rot',
    scientificName: 'Phomopsis vexans',
    severity: 'high',
    sampleImage: '/samples/brinjal_brinjal_phomopsis_blight.jpg',
    symptoms: 'Circular brown leaf spots with distinct light centers; large sunken brown rotting lesions on fruit that turn soft, watery, and eventually dry into black mummified pods; basal stem cankers causing sudden plant collapse.',
    organicTreatments: [
      'Promptly pick and burn all mummified fruits and blighted leaves.',
      'Use certified seeds treated with hot water (50°C for 25 mins); rotate with non-solanaceous crops.'
    ],
    chemicalTreatments: [
      'Spray Captan 50% WP (25g/10L) or Mancozeb 80% WP (30g/10L) starting from flower bud formation.',
      'Apply Copper Oxychloride 50% WP at 30g/10L during overcast periods.'
    ],
    prevention: 'Treat seeds with fungicide prior to nursery bed sowing.'
  },
  {
    id: 'brinjal-wet-rot',
    crop: 'brinjal',
    cropEmoji: '🍆',
    cropName: 'Brinjal',
    aiLabel: 'Brinjal_wet_rot',
    name: 'Brinjal Choanephora Wet Rot',
    scientificName: 'Choanephora cucurbitarum',
    severity: 'medium',
    sampleImage: '/samples/brinjal_brinjal_wet_rot.jpg',
    symptoms: 'Water-soaked soft rot starting on flowers and young fruit calyxes, covered with a prominent whiskery black-headed fungal growth, causing rapid rotting and premature fruit drop.',
    organicTreatments: [
      'Prune dense lower foliage to enhance sunlight penetration and accelerate canopy drying.',
      'Avoid overhead watering that wets open blossoms.'
    ],
    chemicalTreatments: [
      'Spray Copper Oxychloride 50% WP (30g/10L) or Carbendazim 50% WP (10g/10L).'
    ],
    prevention: 'Avoid high-density planting in waterlogged or low-lying field sections.'
  },
  {
    id: 'brinjal-healthy-fruit',
    crop: 'brinjal',
    cropEmoji: '🍆',
    cropName: 'Brinjal',
    aiLabel: 'Brinjal_healthy_fruit',
    name: 'Healthy Brinjal Fruit',
    scientificName: 'Solanum melongena',
    severity: 'healthy',
    sampleImage: '/samples/brinjal_brinjal_healthy_fruit.jpg',
    symptoms: 'Lustrous, glossy purple skin with a firm green calyx, zero boreholes, frass, cracking, or rot lesions.',
    organicTreatments: [
      'Maintain regular compost nutrition and consistent irrigation.'
    ],
    chemicalTreatments: [
      'No treatment needed.'
    ],
    prevention: 'Stake plants to keep heavy fruits elevated above damp soil.'
  }
];

export const APP_STATS = [
  { value: '99.2%', label: 'AI Accuracy', labelSub: 'MobileNetV2 Transfer Learning', icon: 'ShieldCheck' },
  { value: '2 Sec', label: 'Instant Diagnosis', labelSub: 'Fast Inference Speed', icon: 'Zap' },
  { value: '22+', label: 'Disease Classes', labelSub: 'Tomato, Chili & Brinjal', icon: 'Layers' },
  { value: '100%', label: 'Free to Use', labelSub: 'No Subscriptions or Ads', icon: 'Globe' },
  { value: 'v2.0', label: 'Pro Edition APK', labelSub: 'Offline & Cloud Ready', icon: 'Download' }
];

export const TESTIMONIALS = [
  {
    name: 'Mr. Sunil Bandara',
    role: 'Commercial Tomato Farmer, Nuwara Eliya',
    avatar: '👨‍🌾',
    comment: 'When late blight threatened our tomato poly-tunnel last season, AgriCare LK diagnosed the leaf photo in 2 seconds and gave both organic and exact fungicide dosage instructions. Saved thousands in potential crop loss!',
    rating: 5,
    crop: '🍅 Tomato'
  },
  {
    name: 'Mr. Chandana Jayalath',
    role: 'Chili Cultivator, Anuradhapura',
    avatar: '👨‍🌾',
    comment: 'The anthracnose fruit rot remedy guide is exceptionally practical. It gave me exact chemical rates and preventive spray schedules. Having this tool in the field is like having an agriculture extension officer in my pocket.',
    rating: 5,
    crop: '🌶️ Chili'
  },
  {
    name: 'Mrs. Kumari Herath',
    role: 'Vegetable Grower, Matale',
    avatar: '👩‍🌾',
    comment: 'Shoot and fruit borer used to destroy half my brinjal harvest every season. Following the pheromone trap and neem oil recommendations from AgriCare LK completely turned around our yield quality.',
    rating: 5,
    crop: '🍆 Brinjal'
  }
];

export const FAQS = [
  {
    question: 'Is the AgriCare LK mobile app completely free?',
    answer: 'Yes, AgriCare LK is 100% free and open to all Sri Lankan farmers, agronomists, and home gardeners to improve crop yields and agricultural sustainability.'
  },
  {
    question: 'How should I take photos for maximum AI diagnosis accuracy?',
    answer: 'Ensure the leaf or fruit symptom is centered, clearly in focus, and captured under natural, bright lighting. Avoid blurry or heavily shaded photos for best model classification.'
  },
  {
    question: 'Does the mobile app require an internet connection?',
    answer: 'Standard mobile data (3G/4G/Wi-Fi) is used to connect to the fast cloud backend for inference and real-time database queries, consuming minimal data bandwidth.'
  },
  {
    question: 'Does the app provide organic solutions as well as chemical fungicides?',
    answer: 'Yes! Every single disease diagnosis includes sustainable organic cultural remedies (e.g. neem formulations, pheromone traps, biological controls) alongside scientifically approved chemical recommendations for emergency outbreaks.'
  },
  {
    question: 'Which Android devices are supported?',
    answer: 'AgriCare LK runs smoothly on any Android smartphone running Android 8.0 (Oreo) or newer (Android 9, 10, 11, 12, 13, 14, 15).'
  }
];
