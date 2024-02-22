from rest_framework import serializers

from .models import Job,Resume,College,Project,ProfessionalExperience


class JobSerializer(serializers.ModelSerializer):
    
    static_id = serializers.UUIDField(read_only=True)
    number_of_resumes = serializers.SerializerMethodField()
    
    class Meta:
        model = Job
        exclude = ['hidden']
    
    def get_number_of_resumes(self,obj):
        return obj.resumes.count()


class CollegeSerializer(serializers.ModelSerializer):
    
    static_id = None
    
    class Meta:
        model = College
        exclude = ['resume','static_id']


class ProjectSerializer(serializers.ModelSerializer):
    
    static_id = serializers.UUIDField(read_only=True)
    project_title = serializers.CharField(source = 'title')
    short_description = serializers.CharField(source = 'description')
    relevancy = serializers.IntegerField(source = 'relevance')
    
    class Meta:
        model = Project
        exclude = ['resume','title','description','relevance']


class ProfessionalExperienceSerializer(serializers.ModelSerializer):
    
    static_id = serializers.UUIDField(read_only=True)
    short_description = serializers.CharField(source = 'description')
    
    class Meta:
        model = ProfessionalExperience
        exclude = ['resume','description']


class ResumeSerializer(serializers.ModelSerializer):
    static_id = serializers.UUIDField(read_only=True)
    
    class Meta:
        model = Resume
        exclude = ['text',]
        extra_kwargs = {
            "candidate_name": {"read_only": True},
            "email": {"read_only": True},
            "relevance": {"read_only": True},
            "job": {"write_only": True},
        }


class ResumeDetailSerializer(serializers.ModelSerializer):
    
    static_id = serializers.UUIDField(read_only=True)
    college = serializers.SerializerMethodField()
    projects = serializers.SerializerMethodField()
    professional_experiences = serializers.SerializerMethodField()
    
    class Meta:
        model = Resume
        exclude = ['job','text']

    def get_college(self,obj):
        return CollegeSerializer(obj.college).data
    
    def get_projects(self,obj):
        return ProjectSerializer(obj.projects.order_by("-relevance"),many=True).data
    
    def get_professional_experiences(self, obj):
        return ProfessionalExperienceSerializer(obj.professional_experiences.order_by("-relevance"),many=True).data