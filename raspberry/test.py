import requests

FOOD = "http://127.0.0.1:8000/inventory/api/update-food-items/"
TRACK = "http://127.0.0.1:8000/inventory/api/update-food-items/"

API_URL = TRACK

food_items = [
]

try:
    response = requests.post(API_URL, json=food_items)
    if response.status_code == 200:
        print(f"\u00c9l\u00e9ments mis \u00e0 jour : {food_items}")
    else:
        print(f"Erreur d'envoi : {response.status_code} - {response.text}")
except requests.exceptions.RequestException as e:
    print(f"Erreur de connexion au serveur : {e}")
