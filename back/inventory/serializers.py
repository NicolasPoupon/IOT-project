from rest_framework import serializers
from .models import FoodItem, WatchedFoodItem

class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = ['id', 'name', 'quantity', 'created_at', 'updated_at']

class WatchedFoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = WatchedFoodItem
        fields = ['id', 'name', 'threshold', 'created_at', 'updated_at']
