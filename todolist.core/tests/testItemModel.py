from django.test import TestCase
from todolist.models.item import Item

class TestItemModel(TestCase):

    def test_insert(self):
        id1 = Item.objects.create(description='desc1').id
        id2 = Item.objects.create(description='desc2').id
        item1 = Item.objects.get(id=id1)
        item2 = Item.objects.get(id=id2)
        self.assertEqual(item1.status, 'In-Progress')
        self.assertEqual(item1.description, 'desc1')
        self.assertEqual(item2.status, 'In-Progress')
        self.assertEqual(item2.description, 'desc2')

    def test_update(self):
        item = Item.objects.create(description='update')
        item.status='Done'
        item.description='updated'
        item.save()
        item = Item.objects.get(id=item.id)
        self.assertEqual(item.status, 'Done')
        self.assertEqual(item.description, 'updated')

    def test_delete(self):
        item = Item.objects.create(description='delete1')
        item.delete()
        self.assertIsNone(item.id)



