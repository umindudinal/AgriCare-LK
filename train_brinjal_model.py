import sys
import os
from PIL import ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True

import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# සිංහල සහ Emojis console එකේ සාර්ථකව print වීමට
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# 1. Dataset එක තියෙන තැන
dataset_path = 'Brinjal_Dataset' # වම්බටු පින්තූර අඩංගු ෆෝල්ඩරය

# 2. පින්තූර සකස් කිරීම සහ Data Augmentation
datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2, # 80% ක් Training වලට, 20% ක් Validation වලට
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    horizontal_flip=True
)

train_generator = datagen.flow_from_directory(
    dataset_path,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='training'
)

val_generator = datagen.flow_from_directory(
    dataset_path,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='validation'
)

# 3. Neural Network එක නිර්මාණය කිරීම
model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
    layers.MaxPooling2D(2, 2),
    
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D(2, 2),
    
    layers.Conv2D(128, (3, 3), activation='relu'),
    layers.MaxPooling2D(2, 2),
    
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.5), # Overfitting අඩු කිරීමට
    layers.Dense(train_generator.num_classes, activation='softmax') # රෝග ගණනට අනුව Output එක (5 classes)
])

model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# 4. Model එක Training කිරීම
print("🚀 වම්බටු AI Model එක පුහුණු කිරීම ආරම්භ වේ...")
history = model.fit(
    train_generator,
    epochs=12,
    validation_data=val_generator
)

# 5. පුහුණු කළ Model එක Save කිරීම
model.save('brinjal_disease_model.keras')
print("✅ වම්බටු Model එක සාර්ථකව brinjal_disease_model.keras ලෙස Save විය!")

# පන්ති (Classes) වල නම් ටික Print කරගන්න
print("📌 රෝග කාණ්ඩ ටික:", list(train_generator.class_indices.keys()))
