from todolist.models.item import Item
from todolist.serializers.itemSerializer import ItemSerializer
from rest_framework import viewsets
from rest_framework import permissions

class ItemViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = (permissions.AllowAny,)