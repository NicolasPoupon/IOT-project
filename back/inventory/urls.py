from django.urls import path
from .views import UpdateFoodItemView, FoodItemListView

urlpatterns = [
    path('api/update-food-items/', UpdateFoodItemView.as_view(), name='update_food_items'),
    path('api/food-items/', FoodItemListView.as_view(), name='food_item_list'),  # Nouvelle route pour récupérer les aliments
]
