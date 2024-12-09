import cv2
import json
import time
import requests
from ultralytics import YOLO

API_URL = "http://127.0.0.1:8000/inventory/api/update-food-items/"

model = YOLO("yolo11x.pt")

cap = cv2.VideoCapture(0)  # 0 def cam
detected_items = []

while True:
    ret, frame = cap.read()
    if not ret:
        break

    results = model.predict(frame, save=False, save_txt=False)

    detected_items = []
    for box in results[0].boxes.data.tolist():
        x1, y1, x2, y2, confidence, class_id = box
        item_name = model.names[int(class_id)]
        detected_items.append({"name": item_name, "quantity": 1})

    cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
    cv2.putText(frame, f"{item_name} ({confidence:.2f})", (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

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
            print(f"\u00c9l\u00e9ments mis \u00e0 jour : {unique_items}")
        else:
            print(f"Erreur d'envoi : {response.status_code} - {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"Erreur de connexion au serveur : {e}")

    cv2.imshow("YOLO Detection", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
