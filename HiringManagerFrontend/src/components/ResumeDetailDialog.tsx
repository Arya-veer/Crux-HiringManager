// import React from 'react'
import { Resume } from "@/pages/ResumePage";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AxiosError, AxiosResponse } from "axios";
import axios from "@/axios-config";
import { useEffect, useState } from "react";

interface College {
  name: string;
  branch: string;
  degree: string;
  start_date: string;
  end_date: string;
  [key: string]: string;
}

interface CollegeTabProps {
  college: College;
}

const CollegeTab = (props: CollegeTabProps) => {
  const COLLEGE_KEY_MAPPING = new Map<string, string>([
    ["name", "Name"],
    ["branch", "Branch"],
    ["degree", "Degree"],
    ["start_date", "Start"],
    ["end_date", "End"],
    ["cgpa","CGPA"]
  ]);
  const college: College = props.college;
  return (
    <div className="flex flex-col gap-3 p-3">
      {Object.keys(college ?? {}).map((key: string) => {
        return (
          <>
            {college && college[key] && (
              <div className="flex flex-row justify-start gap-2 items-center">
                <p className="text-sm font-semibold">
                  {COLLEGE_KEY_MAPPING.get(key)}:
                </p>
                <p className="text-xs text-gray-600">{college[key]}</p>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

interface Project {
  static_id: string;
  project_title: string;
  short_description: string;
  tech_stack: string[];
  time_duration: {
    start_date: string;
    end_date: string;
    duration_in_months: number;
  };
  relevancy: number;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = (props: ProjectCardProps) => {
  const project: Project = props.project;
  return (
    <div className="border rounded-lg border-grey-600 flex flex-col w-full p-1">
      <div className="flex flex-row justify-between w-full border-b-2 border-gray-600">
        <p className="font-semibold text-sm">{project.project_title}</p>
        <p className="text-sm text-gray-800">
          {project.time_duration.start_date} - {project.time_duration.end_date}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-gray-600">{project.short_description}</p>
        <div className="flex flex-row flex-wrap gap-1 items-center">
          {project.tech_stack.map((tech: string, index: number) => (
            <div
              key={index}
              className="bg-gray-300 rounded-md p-[0.2px] text-center text-nowrap text-xs h-fit"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
      <p className="w-full text-center text-xs font-semibold">
        Relevance: {project.relevancy}
      </p>
    </div>
  );
};

interface ProjectTabProps {
  projects: Project[];
}

const ProjectTab = (props: ProjectTabProps) => {
  const projects: Project[] = props.projects;
  return (
    <div className="flex flex-col gap-3 p-3">
      {projects.map((project: Project) => (
        <ProjectCard key={project.static_id} project={project} />
      ))}
    </div>
  );
};

interface ProfessionalExperience {
  static_id: string;
  organization: string;
  role: string;
  tech_stack: string[];
  short_description: string;
  time_duration: {
    start_date: string;
    end_date: string;
    duration_in_months: number;
  };
  relevance: number;
}

interface ProfessionalExperienceCardProps {
  professionalExperience: ProfessionalExperience;
}

const ProfessionalExperienceCard = (props: ProfessionalExperienceCardProps) => {
  const professionalExperience: ProfessionalExperience =
    props.professionalExperience;
  return (
    <div className="border rounded-lg border-grey-600 flex flex-col w-full p-1">
      <div className="flex flex-row justify-between w-full border-b-2 border-gray-600">
        <div className="flex flex-col">
          <p className="font-semibold text-md">{professionalExperience.role}</p>
          <p className="font-semibold text-sm text-gray-500">
            {professionalExperience.organization}
          </p>
        </div>
        <p className="text-sm text-gray-800">
          {professionalExperience.time_duration.start_date} -{" "}
          {professionalExperience.time_duration.end_date}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-gray-600">
          {professionalExperience.short_description}
        </p>
        <div className="flex flex-row flex-wrap gap-1 items-center">
          {professionalExperience.tech_stack.map((tech: string) => (
            <div className="bg-gray-300 rounded-md p-[0.2px] text-center text-nowrap text-xs h-fit">
              {tech}
            </div>
          ))}
        </div>
      </div>
      <p className="w-full text-center text-xs font-semibold">
        Relevance: {professionalExperience.relevance}
      </p>
    </div>
  );
};

interface ProfessionalExperienceTabProps {
  professionalExperiences: ProfessionalExperience[];
}

const ProfessionalExperienceTab = (props: ProfessionalExperienceTabProps) => {
  const professionalExperiences: ProfessionalExperience[] =
    props.professionalExperiences;
  return (
    <div className="flex flex-col gap-3 p-3">
      {professionalExperiences.map(
        (professionalExperience: ProfessionalExperience) => (
          <ProfessionalExperienceCard
            professionalExperience={professionalExperience}
          />
        )
      )}
    </div>
  );
};

export const ResumeDetailDialog = (resume: Resume) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [professionalExperiences, setProfessionalExperiences] = useState<
    ProfessionalExperience[]
  >([]);
  const [college, setCollege] = useState<College>();

  useEffect(() => {
    getDetails();
  }, [isOpen]);

  const getDetails = () => {
    if (isOpen) {
      axios
        .get(`/resume/detail/${resume.static_id}`)
        .then((response: AxiosResponse) => {
          setCollege(response.data.college);
          setProjects([...response.data.projects]);
          setProfessionalExperiences([
            ...response.data.professional_experiences,
          ]);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    }
  };

  return (
    <Dialog
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
    >
      <DialogTrigger>
        <Button variant={"outline"}>View Details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-6">
            <div className="bg-[#c2c5ca] rounded-full w-fit text-center p-3 text-md">
              {resume.candidate_name.split(" ")[0][0]}
              {
                resume.candidate_name.split(" ")[
                  resume.candidate_name.split(" ").length - 1
                ][0]
              }
            </div>
            <div className="flex flex-col justify-between">
              <p className="font-bold text-lg">{resume.candidate_name}</p>
              <p className=" text-sm text-gray-400 font-thin">{resume.email}</p>
            </div>
          </DialogTitle>
          <DialogClose />
        </DialogHeader>
        <Tabs defaultValue="college" className="w-full ">
          <TabsList>
            <TabsTrigger value="college">College</TabsTrigger>
            <TabsTrigger value="project">Project</TabsTrigger>
            <TabsTrigger value="profexp">Professional Experience</TabsTrigger>
          </TabsList>
          <TabsContent value="college" className="h-fit">
            {college ? <CollegeTab college={college} /> : <p>Loading...</p>}
          </TabsContent>
          <TabsContent value="project" className="h-[400px] overflow-y-scroll">
            {projects ? <ProjectTab projects={projects} /> : <p>Loading...</p>}
          </TabsContent>
          <TabsContent value="profexp" className="h-[400px] overflow-y-scroll">
            {professionalExperiences ? (
              <ProfessionalExperienceTab
                professionalExperiences={professionalExperiences}
              />
            ) : (
              <p>Loading...</p>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
