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
    image_path = sys.argv[1] 

    model_path = os.path.join(os.path.dirname(__file__), 'tomato_disease_model.keras')
    model = tf.keras.models.load_model(model_path)

    class_names = ['Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 
                   'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite', 
                   'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy']

    def predict(img_path):
        img = cv2.imread(img_path)
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