from django.conf import settings
from django.db import models


class Log(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='logs'
    )
    name = models.CharField(max_length=200)

    def __str__(self):
        return f'{self.name} {self.owner}'


class Position(models.Model):
    log = models.ForeignKey(
        Log,
        on_delete=models.CASCADE,
        related_name='positions'
    )
    latitude = models.FloatField()
    longitude = models.FloatField()
    accuracy = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.log} ({self.latitude}, {self.longitude})'
