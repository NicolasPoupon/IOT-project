from django.db import models

class FoodItem(models.Model):
    name = models.CharField(max_length=255, unique=True)
    quantity = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
