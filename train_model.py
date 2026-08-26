import tensorflow as tf
import matplotlib.pyplot as plt

DATASET_PATH = 'Tomato_Dataset' 

IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32

print("Loading Training Data...")
train_dataset = tf.keras.utils.image_dataset_from_directory(
    DATASET_PATH,
    validation_split=0.2,
    subset="training",
    seed=123,
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE
)

print("\nLoading Validation Data...")
validation_dataset = tf.keras.utils.image_dataset_from_directory(
    DATASET_PATH,
    validation_split=0.2,
    subset="validation",
    seed=123,
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE
)

class_names = train_dataset.class_names
print("\nහඳුනාගත් රෝග කාණ්ඩ:", class_names)

base_model = tf.keras.applications.MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,
    weights='imagenet'
)
base_model.trainable = False 

model = tf.keras.Sequential([
    tf.keras.layers.Rescaling(1./127.5, offset=-1), 
    
    base_model,
    tf.keras.layers.GlobalAveragePooling2D(),
    
    tf.keras.layers.Dense(len(class_names), activation='softmax') 
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

print(model.summary())

print("\n🚀 AI Model එක Train වීම ආරම්භ වේ... (මෙයට සුළු වේලාවක් ගත විය හැක)")
history = model.fit(
    train_dataset,
    validation_data=validation_dataset,
    epochs=5
)

model.save('tomato_disease_model.keras')
print("\n✅ Model එක 'tomato_disease_model.keras' නමින් සාර්ථකව Save විය!")