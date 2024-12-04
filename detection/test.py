import cv2
import json
import time
import requests
from ultralytics import YOLO

API_URL = "http://127.0.0.1:8000/inventory/api/update-food-items/"

model = YOLO("yolo11m.pt")  

cap = cv2.VideoCapture(0)  # 0 def cam

detected_items = []

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    results = model.predict(frame, save=False, save_txt=False)
    
    detected_items = []
    for box in results[0].boxes.data.tolist():
        _, _, _, _, confidence, class_id = box
        item_name = model.names[int(class_id)]
        detected_items.append({"name": item_name, "quantity": 1})

    unique_items = []
    item_counts = {}
    for item in detected_items:
        if item["name"] not in item_counts:
            item_counts[item["name"]] = 0
        item_counts[item["name"]] += item["quantity"]

    for name, quantity in item_counts.items():
        unique_items.append({"name": name, "quantity": quantity})

    
    try:
        response = requests.post(API_URL, json=unique_items)
        if response.status_code == 200:
            print(f"Éléments mis à jour : {unique_items}")
        else:
            print(f"Erreur d'envoi : {response.status_code} - {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"Erreur de connexion au serveur : {e}")


cap.release()
cv2.destroyAllWindows()