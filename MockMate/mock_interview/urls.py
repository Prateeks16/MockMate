from django.urls import path
from .views import InterviewSessionListCreate

urlpatterns = [
    # ... existing paths ...
    path('api/interview-sessions/', InterviewSessionListCreate.as_view(), name='interview-session-list-create'),
] 