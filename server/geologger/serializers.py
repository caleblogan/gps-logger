from django.contrib.auth.models import User, Group
from rest_framework import serializers

from .models import Log, Position


class PositionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Position
        fields = ('url', 'log', 'latitude', 'longitude', 'accuracy', 'date')


class LogSerializer(serializers.HyperlinkedModelSerializer):
    # owner = serializers.HyperlinkedRelatedField(view_name='user-detail', read_only=True)
    positions = serializers.HyperlinkedRelatedField(view_name='position-detail', read_only=True, many=True)
    positions_all = serializers.HyperlinkedIdentityField(view_name='logpositions-list')

    # positions = serializers.RelatedField(queryset=Position.objects.all())
    # positions =     serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # positions = PositionSerializer(many=True, read_only=True)

    class Meta:
        model = Log
        fields = ('url', 'id', 'owner', 'name', 'positions', 'positions_all')
        read_only_fields = ('owner',)


class UserSerializer(serializers.HyperlinkedModelSerializer):
    # logs = serializers.HyperlinkedRelatedField(many=True, view_name='log-detail', read_only=True)

    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')#, 'logs')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')