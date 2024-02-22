import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Trash2 } from "lucide-react";
import { AxiosError, AxiosResponse } from "axios";
import axios from "@/axios-config";

export interface Job {
  static_id: string;
  role: string;
  description: string;
  number_of_resumes?: number;
}

const JobCard: React.FC<Job> = (job: Job) => {
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState<boolean>(false);

  const handleNavigate = () => {
    navigate(`/job/${job.static_id}`, { state: { static_id: job.static_id } });
  };

  const handleDelete = () => {
    axios
      .delete(`/job/delete/${job.static_id}`)
      .then((response: AxiosResponse) => {
        console.log(response.data);
        setDeleted(true);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  return (
    <div className={`p-4 h-full ${deleted ? "hidden" : "block"}`}>
      <div className=" shadow-lg border-[#5F5ADB] rounded-lg border-[0.5px] h-full flex flex-col justify-between gap-2 p-2">
        <div className="w-full px-2 border-b border-[#5F5ADB] flex justify-between">
          <h1
            className="text-lg font-bold text-[#4a4799] grow hover:cursor-pointer hover:underline "
            onClick={handleNavigate}
          >
            {job.role}
          </h1>
          <div className="my-auto" onClick={handleDelete}>
            <Trash2 className="text-[#5F5ADB] size-3 hover:size-4 hover:text-red-800 hover:cursor-pointer" />
          </div>
        </div>
        <p className="text-sm text-gray-500 px-2 w-full text-justify grow">
          {job.description}
        </p>
        <div className="text-sm border-t px-2 border-[#5F5ADB] flex flex-row justify-between items-center">
          <p className="text-start grow">
            Number of Resumes: {job.number_of_resumes}
          </p>
          <ArrowUpRight
            className="text-[#5F5ADB] size-3 hover:size-4 my-auto hover:text-[#4a4799] hover:cursor-pointer"
            onClick={handleNavigate}
          />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
