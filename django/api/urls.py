from django.contrib import admin
from django.urls import path, include
from .views import main, PredictionView

urlpatterns = [
    path('show/',PredictionView.as_view())
]