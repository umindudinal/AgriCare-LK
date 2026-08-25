import tensorflow as tf
import matplotlib.pyplot as plt

# මෙතන 'Tomato_Dataset' කියන්නේ අපි කලින් හදාගත්ත, තක්කාලි ෆෝල්ඩර ටික තියෙන ෆෝල්ඩරේ.
# ඔයාගේ Project එක ඇතුළෙම තියෙන නිසා මෙහෙම නම විතරක් දුන්නම ඇති.
DATASET_PATH = 'Tomato_Dataset' 

IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32

print("Loading Training Data...")
# Training Data වෙන් කරගැනීම (80%)
train_dataset = tf.keras.utils.image_dataset_from_directory(
    DATASET_PATH,
    validation_split=0.2,
    subset="training",
    seed=123,
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE
)

print("\nLoading Validation Data...")
# Validation Data වෙන් කරගැනීම (20%)
validation_dataset = tf.keras.utils.image_dataset_from_directory(
    DATASET_PATH,
    validation_split=0.2,
    subset="validation",
    seed=123,
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE
)

# මේ dataset එකේ තියෙන රෝග වර්ග (Classes) ටික බලාගන්න
class_names = train_dataset.class_names
print("\nහඳුනාගත් රෝග කාණ්ඩ:", class_names)

# --- අලුත් කොටස: AI Model එක ගොඩනැගීම සහ පුහුණු කිරීම ---

# 1. Base Model එක විදියට MobileNetV2 යොදාගැනීම
base_model = tf.keras.applications.MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,
    weights='imagenet'
)
# Base model එකේ තියෙන දැනුම වෙනස් නොවෙන්න ඒක 'Lock' කරනවා
base_model.trainable = False 

# 2. අපේ Project එකට ගැලපෙන විදියට අලුත් Layers එකතු කිරීම
model = tf.keras.Sequential([
    # පින්තූර වල වර්ණ MobileNetV2 එකට තේරෙන විදියට හැඩගැස්වීම (Normalization)
    tf.keras.layers.Rescaling(1./127.5, offset=-1), 
    
    base_model,
    tf.keras.layers.GlobalAveragePooling2D(),
    
    # අපේ රෝග කාණ්ඩ 10 හඳුනාගන්න අවසාන Layer එක හදනවා
    tf.keras.layers.Dense(len(class_names), activation='softmax') 
])

# 3. Model එක Compile කිරීම
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

print(model.summary())

# 4. Model එක Train කිරීම ආරම්භ කිරීම
# (පළමු අත්හදා බැලීම සඳහා වට 5 ක් - Epochs 5 - පමණක් පුහුණු කරමු)
print("\n🚀 AI Model එක Train වීම ආරම්භ වේ... (මෙයට සුළු වේලාවක් ගත විය හැක)")
history = model.fit(
    train_dataset,
    validation_data=validation_dataset,
    epochs=5
)

# 5. Train කරපු Model එක Save කරගැනීම
model.save('tomato_disease_model.keras')
print("\n✅ Model එක 'tomato_disease_model.keras' නමින් සාර්ථකව Save විය!")