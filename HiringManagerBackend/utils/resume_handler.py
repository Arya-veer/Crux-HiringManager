import sys,os
sys.path.append('../')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'HiringManager.settings')

# Django Imports
import django
django.setup()
from django.core.files.uploadedfile import InMemoryUploadedFile

import json

# Import for running multiple threads
import concurrent.futures


# External Libraries imports
from PyPDF2 import PdfReader
from openai import OpenAI


# Internal code imports
from resume.models import Resume,College,Project,ProfessionalExperience,Job
from resume.serializers import ResumeSerializer
from utils.handler_functions import JSON_FUNCTION

NUM_THREADS = 12



class ResumeHandler:
    
    def __init__(self, resume: Resume):
        self.resume = resume
        self.openai = OpenAI()
        self.text = self.__extract_data_from_pdf()

    def __update_resume(self,data: dict,relevance: int):
        self.resume.text = self.text
        self.resume.candidate_name = data.get('candidate_name')
        self.resume.email = data.get('email')
        self.resume.relevance = relevance
        self.resume.save()
    
    def ___create_college(self,data: dict):
        print("Creating college")
        College.objects.create(**data,resume=self.resume)
        print("Created College")
        
    def ___create_projects(self,data: dict):
        print("Creating projects")
        for project in data:
            Project.objects.create(**project,resume=self.resume)
        print("Created projects")
        
    def ___create_professional_experiences(self,data: dict):
        print("Creating professional experiences")
        for experience in data:
            ProfessionalExperience.objects.create(**experience,resume=self.resume)
        print("Created professional experiences")
        
    def __extract_data_from_pdf(self)->str:
        reader = PdfReader(self.resume.file)
        textual_data = []
        for page in reader.pages:
            textual_data.append(page.extract_text())
        return '\n'.join(textual_data)
    
    def parse_resume(self):
        response = self.openai.chat.completions.create(
            model = "gpt-3.5-turbo",
            messages = [
                {"role": "user","content": self.text},
                {"role":"user","content":f"Role: {self.resume.job.role} \nDescription : {self.resume.job.description}"}
            ],
            functions = JSON_FUNCTION,
            function_call = 'auto'
        )
        return json.loads(response.choices[0].message.function_call.arguments)
    
        
    def add_data(self):
        final_data = self.parse_resume()
        if not final_data.get('isResume'):
            raise Exception("The file is not a resume")
        self.__update_resume(final_data.get("profile"),final_data.get('relevance'))
        self.___create_college,final_data.get('college')
        self.___create_projects,final_data.get('projects')
        self.___create_professional_experiences,final_data.get('professional_experiences')

def handle_resume(file: InMemoryUploadedFile, hashCode:str, job: Job):
    serializer = ResumeSerializer(data={'file': file, 'job': job.static_id})
    if serializer.is_valid():
        resume = serializer.save()
    else:
        return serializer.errors
    try:
        resume_handler = ResumeHandler(resume)
        resume_handler.add_data()
        return {
            "message": "Resume added successfully",
            "hash": hashCode,
            "uploaded":True,
        }
    except Exception as e:
        resume.file.delete()
        resume.delete()
        return {
            "message": str(e),
            "hash": hashCode,
            "uploaded": False
        }

def files_handler(files: list,hash_array:list, job: Job):
    responses = []
    with concurrent.futures.ThreadPoolExecutor(NUM_THREADS) as executor:
        responses = executor.map(handle_resume, files, hash_array,[job]*len(files))
    return responses        
        
        

    