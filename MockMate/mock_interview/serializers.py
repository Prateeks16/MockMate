from rest_framework import serializers
from .models import InterviewSession

class InterviewSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewSession
        fields = ['id', 'resume_file', 'video_file', 'created_at']