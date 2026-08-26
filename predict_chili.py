import sys
import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import json

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

try:
    model_path = os.path.join(os.path.dirname(__file__), 'chili_disease_model.keras')
    model = tf.keras.models.load_model(model_path)

    class_names = [
        'Chili__healthy',
        'Chili__leaf curl',
        'Chili__leaf spot',
        'Chili__whitefly',
        'Chili__yellowish',
        'Chili_fruit_healthy',
        'Chili_fruit_rot'
    ]

    img_path = sys.argv[1]
    
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0

    predictions = model.predict(img_array, verbose=0)
    predicted_class_index = np.argmax(predictions[0])
    predicted_class_name = class_names[predicted_class_index]
    confidence = float(np.max(predictions[0]))

    result = {
        "predicted_class": predicted_class_name,
        "confidence": confidence
    }
    print(json.dumps(result))

except Exception as e:
    error_result = {"error": str(e)}
    print(json.dumps(error_result))