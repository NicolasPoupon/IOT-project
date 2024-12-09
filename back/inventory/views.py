from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import FoodItem, WatchedFoodItem
from .serializers import FoodItemSerializer, WatchedFoodItemSerializer

class FoodItemListView(APIView):
    def get(self, request):
        """
        get list food
        """
        food_items = FoodItem.objects.all()
        serializer = FoodItemSerializer(food_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class WatchedFoodItemListView(APIView):
    def get(self, request):
        """
        get list to watch food 
        """
        watched_items = WatchedFoodItem.objects.all()
        serializer = WatchedFoodItemSerializer(watched_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        update list to watch food with :
        - name
        - threshold
        """
        data = request.data

        if not isinstance(data, list):
            return Response({"error": "Data must be a list of items."}, status=status.HTTP_400_BAD_REQUEST)

        watched_items_to_create = []
        for item in data:
            name = item.get('name')
            threshold = item.get('threshold', 0)

            if not name or not isinstance(threshold, int):
                return Response({"error": "Invalid input data."}, status=status.HTTP_400_BAD_REQUEST)

            watched_items_to_create.append(WatchedFoodItem(name=name, threshold=threshold))

        WatchedFoodItem.objects.all().delete()
        WatchedFoodItem.objects.bulk_create(watched_items_to_create)

        return Response({"message": "Watched food items updated successfully."}, status=status.HTTP_200_OK)

class UpdateFoodItemView(APIView):
    def post(self, request):
        """
        update list of food in the fridge with :
        - name
        - quantity
        """
        data = request.data

        if not isinstance(data, list):
            return Response({"error": "Data must be a list of items."}, status=status.HTTP_400_BAD_REQUEST)

        new_food_items = []
        for item in data:
            name = item.get('name')
            quantity = item.get('quantity', 0)

            if not name or not isinstance(quantity, int):
                return Response({"error": "Invalid input data."}, status=status.HTTP_400_BAD_REQUEST)

            new_food_items.append({"name": name, "quantity": quantity})

        existing_food_items = list(FoodItem.objects.values('name', 'quantity'))
        if new_food_items == existing_food_items:
            return Response({"message": "No changes detected."}, status=status.HTTP_200_OK)

        FoodItem.objects.all().delete()
        FoodItem.objects.bulk_create([FoodItem(**item) for item in new_food_items])

        return Response({"message": "Food items updated successfully."}, status=status.HTTP_200_OK)