import uuid

from django.db import models

class Job(models.Model):
    static_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(max_length=100)
    description = models.TextField()
    hidden = models.BooleanField(default=False)
    
    class Meta:
        verbose_name = 'Job'
        verbose_name_plural = 'Jobs'
    
    def __str__(self):
        return self.role


class Resume(models.Model):
    static_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    candidate_name = models.CharField(max_length=100,blank = True)
    email = models.EmailField(max_length=100,blank = True,null=True)
    file = models.FileField(upload_to='resumes/')
    text = models.TextField(blank=True)
    job = models.ForeignKey(Job, on_delete=models.CASCADE,related_name='resumes')
    relevance = models.IntegerField(default=0,null=True)
    
    
    class Meta:
        verbose_name = 'Resume'
        verbose_name_plural = 'Resumes'
    
    def __str__(self):
        return f"{self.candidate_name} - {self.job.role}"
    

class College(models.Model):
    
    static_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100,blank = True,null=True)
    branch = models.CharField(max_length=100,blank = True,null=True)
    degree = models.CharField(max_length=100,blank = True,null=True)
    cgpa = models.DecimalField(max_digits = 3,decimal_places = 1,null=True)
    start_date = models.CharField(max_length=7,blank = True,null=True)
    end_date = models.CharField(max_length=7,blank = True,null=True)
    resume = models.OneToOneField(Resume, on_delete=models.CASCADE,related_name='college')
    
    class Meta:
        verbose_name = 'College'
        verbose_name_plural = 'Colleges'
    
    def __str__(self):
        return self.name


class Project(models.Model):
    
    static_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100,blank = True)
    description = models.TextField(null = True)
    tech_stack = models.JSONField(null = True)
    time_duration = models.JSONField(null = True)
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE,related_name='projects')
    relevance = models.IntegerField(default = 0,null=True)
    
    class Meta:
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'
    
    def __str__(self):
        return f"{self.title} - {self.resume.candidate_name}"


class ProfessionalExperience(models.Model):
    
    static_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization = models.CharField(max_length=100,blank = True,null=True)
    role = models.CharField(max_length=100,blank = True,null = True)
    tech_stack = models.JSONField(null = True)
    description = models.TextField(null = True)
    time_duration = models.JSONField(null = True)
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE,related_name='professional_experiences')
    relevance = models.IntegerField(default = 0,null=True)
    
    class Meta:
        verbose_name = 'Professional Experience'
        verbose_name_plural = 'Professional Experiences'
    
    def __str__(self):
        return f"{self.role} - {self.resume.candidate_name}"