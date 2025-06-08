from django.urls import path
from authentication.views import register, login

urlpatterns = [
    path('signupnow/', register),
    path('signin/', login),
]
