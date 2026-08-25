import sys
import os
import json

# TensorFlow වලින් එන අනවශ්‍ය Warnings පෙන්නන එක නවත්වන්න
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

import tensorflow as tf
import numpy as np
import cv2

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

try:
    if len(sys.argv) < 2:
        raise ValueError("Image path is required as a command-line argument.")

    image_path = sys.argv[1] 

    model_path = os.path.join(os.path.dirname(__file__), 'brinjal_disease_model.keras')
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at {model_path}. Please train the model first.")

    model = tf.keras.models.load_model(model_path)

    # Brinjal_Dataset ෆෝල්ඩරයේ අකාරාදී පිළිවෙලට අනුව class names
    class_names = [
        'Brinjal_fruit_cracking',
        'Brinjal_healthy_fruit',
        'Brinjal_phomopsis_blight',
        'Brinjal_shoot_and_fruit_borer',
        'Brinjal_wet_rot'
    ]

    def predict(img_path):
        img = cv2.imread(img_path)
        if img is None:
            raise ValueError(f"Could not read image at path: {img_path}")

        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img_resized = cv2.resize(img_rgb, (224, 224))
        img_array = np.expand_dims(img_resized, axis=0)

        predictions = model.predict(img_array, verbose=0)
        predicted_class_index = np.argmax(predictions)
        predicted_disease = class_names[predicted_class_index]
        confidence = float(np.max(predictions))

        result = {
            "predicted_class": predicted_disease,
            "confidence": confidence
        }
        print(json.dumps(result))

    predict(image_path)
except Exception as e:
    error_result = {"error": str(e)}
    print(json.dumps(error_result))
