from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import FoodItem
from .serializers import FoodItemSerializer

class FoodItemListView(APIView):
    def get(self, request):
        """
        Récupère tous les aliments dans la base de données.
        """
        food_items = FoodItem.objects.all()
        serializer = FoodItemSerializer(food_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdateFoodItemView(APIView):
    def post(self, request):
        """
        Supprime tous les aliments existants et les remplace par les nouveaux.
        Le corps de la requête doit contenir une liste d'aliments avec les champs :
        - `name` (nom de l'aliment)
        - `quantity` (quantité de l'aliment)
        """
        data = request.data

        # Validation de la requête
        if not isinstance(data, list):
            return Response({"error": "Data must be a list of items."}, status=status.HTTP_400_BAD_REQUEST)

        # Supprime tous les éléments existants
        FoodItem.objects.all().delete()

        # Ajoute les nouveaux éléments
        food_items_to_create = []
        for item in data:
            name = item.get('name')
            quantity = item.get('quantity', 0)

            if not name or not isinstance(quantity, int):
                return Response({"error": "Invalid input data"}, status=status.HTTP_400_BAD_REQUEST)

            food_items_to_create.append(FoodItem(name=name, quantity=quantity))

        FoodItem.objects.bulk_create(food_items_to_create)

        return Response({"message": "Food items replaced successfully"}, status=status.HTTP_200_OK)
