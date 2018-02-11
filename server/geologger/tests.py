from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from .models import Log, Position


class UserTests(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_superuser('sally', 'email@example.com', 'pass')

    def test_login(self):
        url = reverse('rest_login')
        response = self.client.post(url, {'username': 'sally', 'password': 'pass'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['key'])

    def test_login_invalid_credentials(self):
        url = reverse('rest_login')
        response = self.client.post(url, {'username': 'sally', 'password': 'invalidpass'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'non_field_errors': ['Unable to log in with provided credentials.']})

    def test_logout(self):
        url = reverse('rest_logout')
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'detail': 'Successfully logged out.'})


class LogsTest(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_superuser('sally', 'email@example.com', 'pass')
        self.user2 = User.objects.create_superuser('barny', 'email@barny.com', 'pass')

    def tearDown(self):
        self.client.force_authenticate(user=None)

    def test_create_log_fails_no_auth(self):
        url = reverse('log-list')
        response = self.client.post(url, {'owner': self.user1.id, 'name': 'Paris Trip'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_log(self):
        self.client.force_authenticate(user=self.user1)
        url = reverse('log-list')
        response = self.client.post(url, {'name': 'Paris Trip'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Log.objects.count(), 1)
        self.assertEqual(Log.objects.get(pk=response.data['id']).name, 'Paris Trip')

    def test_cannot_create_log_for_another_user(self):
        self.client.force_authenticate(user=self.user1)
        url = reverse('log-list')
        response = self.client.post(url, {'name': 'Paris Trip', 'owner': self.user2.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Log.objects.count(), 1)
        self.assertEqual(Log.objects.get(pk=response.data['id']).owner, self.user1)
