from django.contrib.auth.models import User, Group
from django.http import Http404
from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import mixins
from rest_framework import generics
from rest_framework import permissions
from .permissions import IsOwner, IsLogOwner
from rest_framework.decorators import permission_classes, api_view, detail_route
from rest_framework.reverse import reverse
from rest_framework import exceptions


from .serializers import UserSerializer, GroupSerializer, LogSerializer, PositionSerializer
from .models import Log, Position


class LogViewSet(viewsets.ModelViewSet):
    queryset = Log.objects.all()
    serializer_class = LogSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def get_queryset(self):
        return super().get_queryset().filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class LogPositionsList(generics.ListCreateAPIView, generics.DestroyAPIView):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        return super().get_queryset().filter(log__owner=self.request.user)

    def perform_create(self, serializer):
        if serializer.validated_data['log'].owner == self.request.user:
            serializer.save()
        else:
            raise exceptions.PermissionDenied


class PositionList(generics.ListAPIView, generics.DestroyAPIView):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        return super().get_queryset().filter(log__owner=self.request.user)


class PositionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        return super().get_queryset().filter(log__owner=self.request.user)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    # permission_classes = (permissions.IsAdminUser,)


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    # permission_classes = (permissions.IsAdminUser,)


# @api_view(['GET'])
# def api_root(request, format=None):
#     views = {
#
#     }
#     return Response(views)
#     # return Response({
#     #     # 'users': reverse('user-list', request=request, format=format),
#     #     # 'snippets': reverse('snippet-list', request=request, format=format)
#     # })
