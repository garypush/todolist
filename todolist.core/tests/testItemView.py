from rest_framework import status
from rest_framework.test import APITestCase
from todolist.models.item import Item

class TestItemView(APITestCase):

    def test_create_item(self):
        """
        Ensure we can create a new item object.
        """
        data = {'description': 'created'}
        response = self.client.post('/items/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Item.objects.count(), 1)
        self.assertEqual(Item.objects.get().description, 'created')
        self.assertEqual(Item.objects.get().status, 'In-Progress')

    def test_update_item(self):
        data = {'description': 'created'}
        response = self.client.post('/items/', data, format='json')
        id = response.data['id']
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        data = {
            'description': 'updated',
            'status': 'In-Progress'
        }
        response = self.client.put('/items/' + str(id) + '/', data, format='json')
        self.assertEqual(Item.objects.count(), 1)
        self.assertEqual(Item.objects.get(id=id).description, 'updated')
        self.assertEqual(Item.objects.get(id=id).status, 'In-Progress')

    def test_delete_item(self):
        data = {'description': 'created'}
        response = self.client.post('/items/', data, format='json')
        id = response.data['id']
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.delete('/items/' + str(id) + '/', format='json')
        self.assertEqual(Item.objects.count(), 0)

    def test_view_items(self):
        data = {'description': 'created1'}
        response = self.client.post('/items/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        data = {'description': 'created2'}
        response = self.client.post('/items/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.get('/items/', format='json')
        self.assertEqual(len(response.data), 2)
