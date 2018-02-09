from django.conf.urls import url, include
from django.urls import path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('users', views.UserViewSet)
router.register('groups', views.GroupViewSet)
router.register('logs', views.LogViewSet)
# router.register('positions', views.PositionList)
# router.register('positions/<int:pk>/', views.PositionDetail)


urlpatterns = [
    path('', include(router.urls)),
    path('positions/', views.PositionList.as_view(), name='position-list'),
    path('positions/<int:pk>/', views.PositionDetail.as_view(), name='position-detail'),
    path('logs/<int:pk>/positions/', views.LogPositionsList.as_view(), name='logpositions-list'),
]