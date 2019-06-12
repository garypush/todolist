from rest_framework import serializers
from todolist.models.item import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('description', 'createdOn', 'modifiedOn', 'id', 'status') # expose id for convenience for now