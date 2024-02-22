from django.urls import path,include
from .views import *

urlpatterns = [
    
    # Resume API
    path('resume/list/<uuid:job_static_id>/',ResumeListAPI.as_view()),
    path('resume/detail/<uuid:static_id>/',ResumeDetailAPI.as_view()),
    path('resume/upload/',ResumeUploadAPI.as_view()),
    
    # Job API
    path('job/list/',JobListAPI.as_view()),
    path('job/create/',JobCreateAPI.as_view()),
    path('job/delete/<uuid:static_id>',JobDeleteAPI.as_view()),
]