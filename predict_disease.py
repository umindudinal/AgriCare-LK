import tensorflow as tf
import numpy as np
import cv2
import matplotlib.pyplot as plt

print("Loading model...")
model = tf.keras.models.load_model('tomato_disease_model.keras')

class_names = ['Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 
               'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite', 
               'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy']

def predict_disease(image_path):
    img = cv2.imread(image_path)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img_resized = cv2.resize(img_rgb, (224, 224))
    
    img_array = np.expand_dims(img_resized, axis=0) 

    predictions = model.predict(img_array)
    predicted_class_index = np.argmax(predictions)
    confidence = np.max(predictions) * 100
    
    predicted_disease = class_names[predicted_class_index]

    print(f"\n--- ප්‍රතිඵලය ---")
    print(f"හඳුනාගත් රෝගය: {predicted_disease}")
    print(f"නිරවද්‍යතා ප්‍රතිශතය (Confidence): {confidence:.2f}%")

    plt.imshow(img_rgb)
    plt.title(f"{predicted_disease} ({confidence:.2f}%)")
    plt.axis('off')
    plt.show()

IMAGE_TO_TEST = 'image_02.jpg'
predict_disease(IMAGE_TO_TEST)