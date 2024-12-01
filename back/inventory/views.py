from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import FoodItem
from .serializers import FoodItemSerializer

class FoodItemListView(APIView):
    def get(self, request):
        food_items = FoodItem.objects.all()
        serializer = FoodItemSerializer(food_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdateFoodItemView(APIView):
    def post(self, request):
        """
        Ajoute ou retire des aliments.
        Le corps de la requête doit contenir une liste d'aliments avec les champs :
        - `name` (nom de l'aliment)
        - `quantity` (quantité positive pour ajouter, négative pour retirer)
        """
        data = request.data
        for item in data:
            name = item.get('name')
            quantity = item.get('quantity', 0)

            if not name or not isinstance(quantity, int):
                return Response({"error": "Invalid input data"}, status=status.HTTP_400_BAD_REQUEST)

            food_item, created = FoodItem.objects.get_or_create(name=name)
            new_quantity = food_item.quantity + quantity

            if new_quantity < 0:
                return Response({"error": f"Cannot have negative quantity for {name}"}, status=status.HTTP_400_BAD_REQUEST)

            food_item.quantity = new_quantity
            food_item.save()

        return Response({"message": "Food items updated successfully"}, status=status.HTTP_200_OK)
