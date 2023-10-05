from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import UserProfileAccount
from .models import BandFrequency
from django.contrib.auth.models import Group
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    user_accounts_groups = serializers.PrimaryKeyRelatedField(many=True,queryset=Group.objects.all(), required=False)
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password','user_accounts_groups')

class UserProfileAccountSerializer(serializers.ModelSerializer):
    # user_profile_accounts_groups = serializers.PrimaryKeyRelatedField(many=True,queryset=Group.objects.all(), required=False)
    class Meta:
        model = UserProfileAccount
        fields = ('id', 'name', 'email', 'contact', 'designation', 'organization', 'radiodetails', 'radiosetdetails','profileImage')


class BandFrequencySerializer(serializers.ModelSerializer):
    # user_band = serializers.PrimaryKeyRelatedField(many=True,queryset=Group.objects.all(), required=False)
    class Meta:
        model = BandFrequency
        fields = ('id','frequency_type', 'frequency_fm', 'frequency_to', 'channel_spacing')
