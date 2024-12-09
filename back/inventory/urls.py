from django.urls import path
from .views import UpdateFoodItemView, FoodItemListView, WatchedFoodItemListView

urlpatterns = [
    path('api/update-food-items/', UpdateFoodItemView.as_view(), name='update_food_items'),
    path('api/food-items/', FoodItemListView.as_view(), name='food_item_list'),
    path('api/watched-food-items/', WatchedFoodItemListView.as_view(), name='watched_food_item_list'),
]