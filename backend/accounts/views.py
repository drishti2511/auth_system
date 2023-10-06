from django.shortcuts import render
from rest_framework import viewsets,generics
from .models import UserProfileAccount, BandFrequency
from .serializers import UserProfileAccountSerializer, BandFrequencySerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import requests
from django.http import Http404
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes,api_view
from rest_framework.permissions import IsAuthenticated
import logging
logger = logging.getLogger(__name__)


class ProfileCreateView(generics.CreateAPIView):
    queryset = UserProfileAccount.objects.all()
    serializer_class = UserProfileAccountSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        # Get the uploaded image from the request
        profileImage = self.request.FILES.get('profile_image')
        # Create a new user profile, including the profile image
        serializer.save(profileImage=profileImage)


@authentication_classes([])
@permission_classes([AllowAny])
class UserProfileDetailView(generics.RetrieveAPIView):
    queryset = UserProfileAccount.objects.all()
    serializer_class = UserProfileAccountSerializer
    lookup_field = 'email'


    def retrieve(self, request, *args, **kwargs):
        email = self.kwargs.get('email')
        try:
            user_profile = UserProfileAccount.objects.get(email=email)
            serializer = UserProfileAccountSerializer(user_profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfileAccount.DoesNotExist:
            raise Http404("User profile not found")




@authentication_classes([])
@permission_classes([AllowAny])
class BandFrequencyViewSet(viewsets.ModelViewSet):
    queryset = BandFrequency.objects.all()
    serializer_class = BandFrequencySerializer


@authentication_classes([])
@permission_classes([AllowAny])
class BandFrequencyDataDetail(generics.ListAPIView):
    queryset = BandFrequency.objects.all()
    serializer_class = BandFrequencySerializer