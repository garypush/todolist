from django.db import models

class Item(models.Model):
    description = models.CharField(max_length=256)
    createdOn = models.DateTimeField(auto_now_add=True)
    modifiedOn = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, default='In-Progress')

    class Meta:
        ordering = ('createdOn',)