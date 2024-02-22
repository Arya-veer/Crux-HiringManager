import { AxiosError, AxiosResponse } from "axios";
import axios from "@/axios-config";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { MoveRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ResumeDetailDialog } from "@/components/ResumeDetailDialog";
import { Button } from "@/components/ui/button";

export interface Resume {
  static_id: string;
  candidate_name: string;
  email: string;
  file: string;
  relevance: number;
}

interface ResumeTableProps {
  resumes: Resume[];
}

const ResumeTable = (props: ResumeTableProps) => {
  const resumes: Resume[] = props.resumes;
  return (
    <Table>
      <TableHeader className="text-md">
        <TableRow>
          <TableHead className="grow">Name</TableHead>
          <TableHead>Relevance Score</TableHead>
          <TableHead>Resume Link</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="overflow-y-scroll text-sm gap-0">
        {resumes.map((resume: Resume) => (
          <TableRow key={resume.static_id} className="p-2 grow">
            <TableCell className="flex gap-20 py-1 items-center">
              <div className="bg-[#c2c5ca] rounded-full my-auto text-center p-3 text-xs">
                {resume.candidate_name.split(" ")[0][0]}
                {
                  resume.candidate_name.split(" ")[
                    resume.candidate_name.split(" ").length - 1
                  ][0]
                }
              </div>
              <div className="flex flex-col justify-between">
                <p className="font-bold text-xs">{resume.candidate_name}</p>
                <p className=" text-xs">{resume.email}</p>
              </div>
            </TableCell>
            <TableCell className="py-1 text-sm">{resume.relevance}</TableCell>
            <TableCell className="text-[#5F5ADB] text-sm underline py-1">
              <a href={resume.file} target="_blank">
                File
              </a>
            </TableCell>
            <TableCell className="text-right text-sm py-1">
              <ResumeDetailDialog
                static_id={resume.static_id}
                candidate_name={resume.candidate_name}
                email={resume.email}
                file={resume.file}
                relevance={resume.relevance}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const ResumePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const static_id = location.state.static_id as { static_id: string };
  const [recommendedResumes, setRecommendedResumes] = useState<Resume[]>([]);
  const [notRecommendedResumes, setNotRecommendedResumes] = useState<Resume[]>(
    []
  );

  useEffect(() => {
    axios
      .get(`/resume/list/${static_id}/?recommended=true`)
      .then((response: AxiosResponse) => {
        setRecommendedResumes([...response.data]);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });

    axios
      .get(`/resume/list/${static_id}/`)
      .then((response: AxiosResponse) => {
        setNotRecommendedResumes([...response.data]);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, [static_id]);

  const handleResumeRoute = () => {
    navigate(`/resume/upload/${static_id}`, {
      state: { static_id: static_id },
    });
  };

  return (
    <div className="w-full h-screen px-8 pt-6">
      <div className="w-full items-start h-fit border-b-2 pb-2">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-black font-bold text-2xl">
            {recommendedResumes.length} Resumes Filtered
          </h1>
          <div>
            <Button
              className="bg-[#5F5ADB] hover:border-[0.5px] hover:border-[#5F5ADB] hover:bg-white hover:text-[#5F5ADB]"
              onClick={handleResumeRoute}
            >
              Add more resume <MoveRight className="ml-2" />
            </Button>
          </div>
        </div>
        <p className="text-grey-500 font-light text-sm">Purpose Selection</p>
      </div>
      <div className="flex mt-2 p-6">
        <div className="w-1/5">
          <p className="font-strong text-lg">Recommended Profiles</p>
          <p className="font-light text-md">Resumes fit for the Job role</p>
        </div>
        <div className="w-4/5">
          <ResumeTable resumes={recommendedResumes} />
        </div>
      </div>
      <div className="flex mt-2 p-6">
        <div className="w-1/5">
          <p className="font-strong text-lg">Not Recommended Profiles</p>
          <p className="font-light text-md">Resumes not fit for the Job role</p>
        </div>
        <div className="w-4/5">
          <ResumeTable resumes={notRecommendedResumes} />
        </div>
      </div>
    </div>
  );
};
