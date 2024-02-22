from rest_framework import generics,views,status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


from .serializers import JobSerializer,ResumeSerializer,ResumeDetailSerializer
from .models import Job,Resume
from .pagination import ResumePagination
from utils.resume_handler import files_handler,NUM_THREADS


class JobListAPI(generics.ListAPIView):
    
    permission_classes = (AllowAny,)
    serializer_class = JobSerializer
    queryset = Job.objects.filter(hidden=False)
    
class JobCreateAPI(generics.CreateAPIView):
    
    permission_classes = (AllowAny,)
    serializer_class = JobSerializer
    
class JobDeleteAPI(generics.DestroyAPIView):
    permission_classes = (AllowAny,)
    queryset = Job.objects.all()
    lookup_field = 'static_id'
    lookup_url_kwarg = 'static_id'
        

class ResumeListAPI(generics.ListAPIView):
    
    permission_classes = (AllowAny,)
    serializer_class = ResumeSerializer
    
    def get_queryset(self):
        job_static_id = self.kwargs.get('job_static_id',None)
        if not job_static_id:
            raise Exception("Job static id not found")
        jobs = Job.objects.filter(static_id=job_static_id)
        if not jobs.exists():
            raise Exception("Job not found")
        if "recommended" not in self.request.query_params:
            return Resume.objects.filter(job=jobs.first(),relevance__lt=80).order_by('-relevance')
        return Resume.objects.filter(job=jobs.first(),relevance__gte=80).order_by('-relevance')
    
    def list(self, request, *args, **kwargs):
        try:
            return super().list(request, *args, **kwargs)
        except Exception as e:
            return Response({"message":str(e)},status=status.HTTP_400_BAD_REQUEST)
    

class ResumeDetailAPI(generics.RetrieveAPIView):
    
    permission_classes = (AllowAny,)
    serializer_class = ResumeDetailSerializer
    
    def get_object(self):
        static_id = self.kwargs.get('static_id',None)
        if not static_id:
            raise Exception("Static id not found")
        resumes = Resume.objects.filter(static_id=static_id)
        if not resumes.exists():
            raise Exception("Resume not found")
        return resumes.first()
    
    def retrieve(self, request, *args, **kwargs):
        try:
            return super().retrieve(request, *args, **kwargs)
        except Exception as e:
            return Response({"message":str(e)},status=status.HTTP_400_BAD_REQUEST)
        
    

class ResumeUploadAPI(views.APIView):
    
    permission_classes = (AllowAny,)
    
    def post(self,request):
        job_static_id = request.data.get('job_static_id',None)
        if not job_static_id:
            return Response({"message":"Job static id not found"},status=status.HTTP_400_BAD_REQUEST)
        jobs = Job.objects.filter(static_id=job_static_id)
        if not jobs.exists():
            return Response({"message":"Job not found"},status=status.HTTP_400_BAD_REQUEST)
        files = request.FILES.getlist('files')
        hash_array = request.data.getlist('hash')
        if len(files) == 0:
            return Response({"message":"No files found"},status=status.HTTP_400_BAD_REQUEST)
        if len(files) > NUM_THREADS:
            return Response({"message":f"Maximum {NUM_THREADS} files can be uploaded at a time"},status=status.HTTP_400_BAD_REQUEST)
        responses = files_handler(files,hash_array,job=jobs.first())
        # responses = []
        return Response({"message":"Resumes uploaded successfully","data":responses},status=status.HTTP_201_CREATED)
    
            