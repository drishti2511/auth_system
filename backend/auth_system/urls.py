from django.urls import path, include, re_path
from rest_framework import routers

from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from accounts.views import ProfileCreateView
from accounts.views import UserProfileDetailView
from accounts.views import BandFrequencyViewSet
from accounts.views import BandFrequencyDataDetail
from django.conf import settings
from django.conf.urls.static import static


# router = routers.DefaultRouter()
# router.register(r'edit-frequency/', BandFrequencyViewSet)


urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    path('profiles/create/', ProfileCreateView.as_view(), name='profile-create'),
    # path('user/profile/', user_profile, name='get_user_profile'),
    path('user/profile/<str:email>/', UserProfileDetailView.as_view(), name='get_user_profile'),
    path('edit-frequency/', BandFrequencyViewSet.as_view({'get': 'list', 'post': 'create'}), name='band-freq-create'),
    path('available-frequency/', BandFrequencyDataDetail.as_view(), name='band-freq-available'),
    # path('', include(router.urls)),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
