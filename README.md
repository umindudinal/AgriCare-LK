<div align="center">




# 🌿 AgriCare LK

**AI-powered plant disease diagnosis for Sri Lankan farmers — in Sinhala.**

[![Flutter](https://img.shields.io/badge/Flutter-3.x-02569B?logo=flutter&logoColor=white)](https://flutter.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-Keras-FF6F00?logo=tensorflow&logoColor=white)](https://www.tensorflow.org)
[![SQL Server](https://img.shields.io/badge/Database-MS%20SQL%20Server-CC2927?logo=microsoftsqlserver&logoColor=white)](https://www.microsoft.com/sql-server)
[![License](https://img.shields.io/badge/License-Unspecified-lightgrey.svg)](#-license)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS%20%7C%20Web-informational)]()

</div>

---

**AgriCare LK** is an AI-powered mobile application that helps Sri Lankan farmers identify plant diseases in **tomato, chili, and brinjal** crops from a photo, and instantly get diagnosis details and treatment recommendations in **Sinhala**.

The system combines a **Flutter** mobile app, a **Node.js/Express** backend, **TensorFlow (Keras)** deep learning models for disease classification, and a **Microsoft SQL Server** database that stores disease information and treatment instructions.

<div align="center">
  <img src="docs/images/logo.png" alt="AgriCare LK app icon" width="90" />
</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#️-architecture)
- [Project Structure](#-project-structure)
- [Tech Stack](#️-tech-stack)
- [Machine Learning Models](#-machine-learning-models)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Roadmap](#️-roadmap)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 📱 Overview

Farmers can:

1. Select the crop type — Tomato 🍅, Chili 🌶️, or Brinjal 🍆
2. Take or upload a photo of the affected leaf/fruit
3. Get an instant AI-based disease diagnosis
4. View the disease name, symptoms, and both **organic** and **chemical** treatment recommendations — all in Sinhala

---

## ✨ Features

| | |
|---|---|
| 📸 | **Camera / gallery image capture** for plant disease detection |
| 🤖 | **AI-powered classification** using MobileNetV2 transfer-learning models trained separately for tomato, chili, and brinjal |
| 🌐 | **Sinhala-first UI and content** for accessibility to local farmers |
| 💊 | **Organic and chemical treatment suggestions** pulled from a structured database |
| 🗄️ | **Fallback treatment data** built into the backend for diseases not yet catalogued in the database |
| 🧩 | **Modular architecture** — separate Flutter frontend, Node.js API layer, and Python ML inference scripts |

---

## 🏗️ Architecture

```
┌──────────────────┐        HTTP (multipart/form-data)        ┌───────────────────────┐
│    Flutter App    │ ────────────────────────────────────────▶ │   Node.js / Express    │
│  (agricare_app)   │ ◀──────────────────────────────────────── │       Backend          │
└──────────────────┘               JSON response                └────────────┬───────────┘
                                                                               │ spawns
                                                                               ▼
                                                                 ┌───────────────────────┐
                                                                 │   Python (TensorFlow)  │
                                                                 │   predict_*.py scripts │
                                                                 └────────────┬───────────┘
                                                                              │ predicted class
                                                                              ▼
                                                                 ┌───────────────────────┐
                                                                 │   SQL Server Database  │
                                                                 │  Diseases / Treatments │
                                                                 └───────────────────────┘
```

**Flow:** The Flutter app sends the crop type and image to the Express API → the backend spawns the matching Python script → the trained Keras model predicts the disease class → the backend looks up symptoms and treatments in SQL Server (falling back to built-in data if the record isn't in the database yet) → the result is returned to the app as JSON.

---

## 📂 Project Structure

```
AgriCare-LK/
├── agricare_app/              # Flutter mobile application
│   ├── assets/
│   │   └── app-icon.png       # App logo
│   ├── lib/
│   │   ├── main.dart
│   │   ├── models/            # Data models
│   │   ├── screens/           # Home, Info, Result screens
│   │   ├── services/          # API service (calls backend)
│   │   └── widgets/           # Reusable UI widgets
│   └── pubspec.yaml
│
├── backend/                   # Node.js / Express API server
│   ├── server.js
│   └── package.json
│
├── predict_api.py             # Inference script used by the backend (tomato)
├── predict_chili.py           # Inference script for chili
├── predict_brinjal.py         # Inference script for brinjal
├── predict_disease.py         # Standalone script for local testing/visualization
├── train_model.py             # Trains the tomato disease model
├── train_chili_model.py       # Trains the chili disease model
├── train_brinjal_model.py     # Trains the brinjal disease model
├── test_db.py                 # Script to verify SQL Server connectivity
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Mobile App | Flutter (Dart), `image_picker`, `http` |
| Backend API | Node.js, Express 5, Multer, CORS |
| Machine Learning | TensorFlow / Keras, MobileNetV2 (transfer learning), OpenCV |
| Database | Microsoft SQL Server (via `mssql` / `msnodesqlv8`) |
| Platforms | Android, iOS, Web, Windows, macOS, Linux (Flutter multi-platform) |

---

## 🧠 Machine Learning Models

Each crop has its own image classification model built with **MobileNetV2** as a frozen feature extractor plus a custom classification head:

- Input size: `224 x 224 x 3`
- Base model: `MobileNetV2` (pretrained on ImageNet, frozen)
- Head: `GlobalAveragePooling2D` → `Dense(num_classes, softmax)`
- Trained separately for:
  - 🍅 **Tomato** — `tomato_disease_model.keras` (`train_model.py`)
  - 🌶️ **Chili** — `train_chili_model.py`
  - 🍆 **Brinjal** — `train_brinjal_model.py`

Trained model files (`.keras`) and datasets are excluded from version control (see `.gitignore`) and must be trained or supplied locally before running inference.

---

## 🖼️ Screenshots

> Add real screenshots of the Home, Result, and Info screens here so the README shows the app in action.
> Place image files under `docs/images/` (e.g. `home.png`, `result.png`, `info.png`) and reference them like this:

```markdown
<p align="center">
  <img src="docs/images/home.png" width="220" alt="Home screen" />
  <img src="docs/images/result.png" width="220" alt="Result screen" />
  <img src="docs/images/info.png" width="220" alt="Info screen" />
</p>
```

---

## 🚀 Getting Started

### Prerequisites

- [Flutter SDK](https://docs.flutter.dev/get-started/install) (Dart SDK `^3.12.2`)
- [Node.js](https://nodejs.org/) (v18+ recommended) and npm
- [Python 3.9+](https://www.python.org/) with `tensorflow`, `opencv-python`, `numpy`, `matplotlib`
- Microsoft SQL Server with **ODBC Driver 17 for SQL Server** installed
- Android Studio / Xcode for mobile builds (optional, for device testing)

### 1. Clone the repository

```bash
git clone https://github.com/umindudinal/AgriCare-LK.git
cd AgriCare-LK
```

### 2. Set up the database

Create a SQL Server database (default expected name: `AgriCareLK_DB`) with `Diseases` and `Treatments` tables, joined on `DiseaseID`, containing at least:

- `Diseases`: `DiseaseID`, `AIModelLabel`, `CommonName_EN`, `CommonName_SI`, `Symptoms_SI`
- `Treatments`: `DiseaseID`, `TreatmentType`, `Instruction_SI`

> Update the `connectionString` in `backend/server.js` to match your SQL Server instance name and database.

### 3. Train or obtain the ML models

```bash
pip install tensorflow opencv-python numpy matplotlib
python train_model.py          # trains the tomato model
python train_chili_model.py    # trains the chili model
python train_brinjal_model.py  # trains the brinjal model
```

Place the resulting `.keras` model files in the project root (or wherever the corresponding `predict_*.py` script expects them).

### 4. Run the backend server

```bash
cd backend
npm install
npm run dev     # or: npm start
```

The server starts on `http://localhost:3000`.

### 5. Run the Flutter app

```bash
cd agricare_app
flutter pub get
flutter run
```

> ⚠️ Update `baseUrl` in `agricare_app/lib/services/api_service.dart` to your machine's local IP address (e.g. `http://192.168.x.x:3000/api`) so a physical device can reach the backend on the same network.

---

## 🔌 API Reference

### `POST /api/analyze-plant`

Analyzes an uploaded plant image and returns disease details.

**Request:** `multipart/form-data`

| Field | Type | Description |
|---|---|---|
| `image` | file | Photo of the plant leaf/fruit |
| `plantType` | string | `tomato` \| `chili` \| `brinjal` (defaults to `tomato`) |

**Response:**

```json
{
  "success": true,
  "data": {
    "CommonName_EN": "Chili Fruit Rot / Anthracnose",
    "CommonName_SI": "මිරිස් කරල් කුණුවීමේ රෝගය",
    "Symptoms_SI": "...",
    "AI_Label": "Chili_fruit_rot",
    "Treatments": [
      { "type": "Organic", "instruction": "..." },
      { "type": "Chemical", "instruction": "..." }
    ]
  }
}
```

---

## 🗺️ Roadmap

- [ ] Expand disease/treatment coverage beyond built-in fallback data
- [ ] Add offline/on-device inference support
- [ ] Support additional crops
- [ ] Add English UI toggle alongside Sinhala
- [ ] Deploy backend to a cloud environment with a managed database

---

## 🤝 Contributing

Contributions, issue reports, and feature suggestions are welcome. Please open an issue or submit a pull request.

## 👤 Author

<div align="center">
  <img src="docs/images/logo.png" alt="AgriCare LK" width="60" />
</div>

**Umindu**
IT Undergraduate, Institute of Technology, University of Moratuwa (ITUM)
GitHub: [@umindudinal](https://github.com/umindudinal)

## 📄 License

No license has been specified for this project yet. All rights reserved by the author unless a license is added.

<div align="center">

Made with 🌿 in Sri Lanka

</div>
