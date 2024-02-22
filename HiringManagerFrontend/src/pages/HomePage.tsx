import JobCard, { Job } from "@/components/JobCard";
import AddJob from "@/components/AddJob";
import { AxiosResponse, AxiosError } from "axios";
import axios from "@/axios-config";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("/job/list/")
      .then((response: AxiosResponse) => {
        console.log(response.data);
        setJobs([...response.data]);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="p-2 w-full">
      <div className="flex flex-row justify-end mx-8">
        <div className="items-end my-auto">
          <AddJob
            prevJobs={jobs}
            setJobs={setJobs}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </div>
      <div className="p-3 grid grid-cols-1 md:grid-cols-3">
        {jobs.map((job: Job) => (
          <JobCard
            key={job.static_id}
            static_id={job.static_id}
            role={job.role}
            description={job.description}
            number_of_resumes={job.number_of_resumes}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
