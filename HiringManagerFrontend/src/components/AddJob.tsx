import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/* ICON IMPORT */
import { Flag } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import axios from "@/axios-config";
import { Job } from "./JobCard";

interface AddJobProps {
  prevJobs: Job[];
  setJobs: Dispatch<SetStateAction<Job[]>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddJob = (props: AddJobProps) => {
  const [role, setRole] = useState<string>();
  const [description, setDescription] = useState<string>();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    axios
      .post("/job/create/", {
        role: role,
        description: description,
      })
      .then((response: AxiosResponse) => {
        console.log(response.data);
        props.setJobs([
          ...props.prevJobs,
          {
            static_id: response.data.static_id,
            role: response.data.role,
            description: response.data.description,
            number_of_resumes: 0,
          },
        ]);
        props.setOpen(false);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  return (
    <Dialog open={props.open} onOpenChange={(isOpen) => props.setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button
          className="bg-[#5F5ADB] hover:border-[0.5px] hover:border-[#5F5ADB] hover:bg-white hover:text-[#5F5ADB]"
          onClick={() => props.setOpen(true)}
        >
          Add new Job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <div className="border-[0.2px] border-gray-300 w-fit p-2 rounded-md">
            <Flag className="scale-75 text-black -rotate-12" />
          </div>
          <DialogTitle>Add Role</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="flex flex-col gap-3">
            <Label htmlFor="role" className="text-left">
              Role*
            </Label>
            <Input
              id="role"
              placeholder=""
              className="col-span-3 w-full"
              required={true}
              name="name"
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="description" className="text-left">
              Job Description *
            </Label>
            <Textarea
              id="description"
              placeholder=""
              className="col-span-3 w-full"
              rows={4}
              required={true}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <DialogClose asChild>
            <Button
              variant="outline"
              className="w-1/2"
              onClick={() => props.setOpen(false)}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="w-1/2 bg-[#5F5ADB]"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddJob;
