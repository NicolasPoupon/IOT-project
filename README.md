# IOT-project

<img width="419" alt="42_team_IoT_implementation_plan" src="https://github.com/user-attachments/assets/e5baf6c4-ad47-48f6-b7fb-044a3335e25d">

# To run back

## Requirements

```bash
cd back
. myenv/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

## Use API

### For MacOS and Linux:

```bash
curl -X POST http://127.0.0.1:8000/inventory/api/update-food-items/ -H "Content-Type: application/json" -d '[{"name": "Tomatoes", "quantity": 5}, {"name": "Milk", "quantity": -2}]'
```

### On Windows:

```bash
$headers = @{ "Content-Type" = "application/json" }
$data = '[{"name": "Tomatoes", "quantity": 5}, {"name": "Milk", "quantity": 2}]'

Invoke-WebRequest -Uri "http://127.0.0.1:8000/inventory/api/update-food-items/" `
                  -Method POST `
                  -Headers $headers `
                  -Body $data
```

# To run front

```bash
npm install
npm run dev
```
