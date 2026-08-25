import tensorflow as tf
import numpy as np
import cv2
import matplotlib.pyplot as plt

# 1. පුහුණු කරපු Model එක Load කරගැනීම
print("Loading model...")
model = tf.keras.models.load_model('tomato_disease_model.keras')

# රෝග කාණ්ඩ වල නම් ටික (කලින් ආපු පිළිවෙලටම)
class_names = ['Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 
               'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite', 
               'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy']

def predict_disease(image_path):
    # 2. පින්තූරය කියවීම සහ සකස් කිරීම
    img = cv2.imread(image_path)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB) # OpenCV BGR -> RGB 
    img_resized = cv2.resize(img_rgb, (224, 224))  # Model එකට ඕන Size එකට හැදීම
    
    # Model එකට දෙන්න කලින් හරියටම හැඩය හදාගන්නවා 
    # (උදා: (1, 224, 224, 3) - එක පින්තූරයයි කියලා පෙන්නන්න)
    img_array = np.expand_dims(img_resized, axis=0) 

    # 3. රෝගය අනුමාන කිරීම (Prediction)
    predictions = model.predict(img_array)
    predicted_class_index = np.argmax(predictions)
    confidence = np.max(predictions) * 100
    
    predicted_disease = class_names[predicted_class_index]

    # ප්‍රතිඵලය පෙන්වීම
    print(f"\n--- ප්‍රතිඵලය ---")
    print(f"හඳුනාගත් රෝගය: {predicted_disease}")
    print(f"නිරවද්‍යතා ප්‍රතිශතය (Confidence): {confidence:.2f}%")

    # පින්තූරය පෙන්නන්න
    plt.imshow(img_rgb)
    plt.title(f"{predicted_disease} ({confidence:.2f}%)")
    plt.axis('off')
    plt.show()

# ---------------------------------------------------------
# මෙතන 'test_image.jpg' වෙනුවට ඔයා අත්හදා බලන්න කැමති පින්තූරෙක නම දෙන්න.
# (උදාහරණයක් විදියට ඔයාගේ Tomato_Dataset එකේ තියෙන ෆොටෝ එකක් වෙනම copy කරලා 
#  AgriCare LK ෆෝල්ඩරේට දාගෙන ඒකේ නම මෙතන දෙන්න)
# ---------------------------------------------------------

IMAGE_TO_TEST = 'image_02.jpg' # <--- අත්හදා බලන පින්තූරයේ නම මෙතැන දෙන්න
predict_disease(IMAGE_TO_TEST)