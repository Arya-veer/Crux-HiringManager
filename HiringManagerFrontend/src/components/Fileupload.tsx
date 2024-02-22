import { useState, useCallback } from "react";

import PdfUploadCard from "@/components/PdfUploadCard";

import axios from "@/axios-config";
import CryptoJS from "crypto-js";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

interface FileInterface {
  file: File;
  status: "notStarted" | "uploading" | "success" | "error";
  hash: string;
}

interface ResponseInterface {
  message: string;
  hash: string;
  uploaded: boolean;
}

const generateHash = (str: string) => {
  // Convert the number to a string before hashing
  const dataToHash =
    str + str.length.toString() + (Math.random() % 1000033).toString();

  // Use SHA-256 for hashing, you can choose a different algorithm if needed
  const hash = CryptoJS.SHA256(dataToHash);

  // Convert the hash to a hexadecimal string
  const hashString = hash.toString(CryptoJS.enc.Hex);

  return hashString;
};

interface FileuploadProps {
  static_id: string;
}

const Fileupload: React.FC<FileuploadProps> = (props: FileuploadProps) => {
  const { toast } = useToast();
  const [files, setFiles] = useState<FileInterface[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file: File) => ({
        file,
        status: "notStarted" as "notStarted" | "uploading" | "success" | "error",
        hash: generateHash(file.name),
      }));
      setFiles([...files, ...newFiles]);
      console.log(newFiles[0]);
    },
    [files]
  );

  const onDropRejected = () => {
    toast({
      variant: "destructive",
      title: "Max file upload limit exceeded",
      description:
        "File size should be less than 10MB\nMax allowed files is 8 files",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    });
  };

  const { getRootProps} = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    onDropRejected,
    maxFiles: 8,
    maxSize: 10000000,
    multiple: true,
  });

  const removeFile = (file:FileInterface) => () => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
  };


  const handleUpload = () => {
    if (files.length === 0) {
      toast({
        variant: "destructive",
        title: "No files selected",
        description: "Please select some files first !!",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    const data = new FormData();

    data.append("job_static_id", props.static_id);

    files.forEach((file) => {
      data.append("files", file.file);
      data.append("hash", file.hash);
      // Update the file status to "uploading"
      file.status = "uploading";
    });

    setFiles([...files]); // Update the state to trigger re-render with updated status

    axios
      .post("resume/upload/", data)
      .then((res) => {
        // Update the file status to "success" on successful upload

        console.log(res);

        res.data.data.map((obj:ResponseInterface) => {
          files.forEach((file) => {
            if (file.hash === obj.hash) {
              file.status = obj.uploaded ? "success" : "error";
            }
          });
        });

        setFiles([...files]); // Update the state to trigger re-render with updated status
      })
      .catch((err) => {
        // Update the file status to "error" on upload failure
        files.forEach((file) => {
          file.status = "error";
        });
        setFiles([...files]); // Update the state to trigger re-render with updated status
        console.log(err);
      });
  };

  return (
    <>
      <div {...getRootProps({ className: "dropzone" })}>
        <div className="mx-auto border-[#5F5ADB] m-5 w-[40%] p-5 rounded-lg border-[2px] flex flex-col items-center justify-around gap-3 cursor-pointer">
          <UploadCloud className="scale-[1.6] text-gray-600" />
          <div className="flex w-3/5 justify-around">
            <div className="font-semibold text-sm">
              <span className="font-normal text-[#5F5ADB]">
                Click to upload PDF
              </span>{" "}
              <span className="font-light">or drag and drop</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto m-5 w-[40%]">
        {files.map((file, idx) => (
          <div key={idx}>
            <PdfUploadCard
              isUploaded={file.status}
              fileName={file.file.name}
              fileSize={(file.file.size / 1000).toPrecision(3) + " KB"}
              onRemove={removeFile(file)}
            />
          </div>
        ))}
      </div>

      <div className="mx-auto m-5 w-1/5 flex items-center justify-around">
        <Button
          variant="outline"
          className="w-36"
          onClick={() => {
            setFiles([]);
          }}
        >
          Cancel
        </Button>
        <Button className="w-36 bg-[#5F5ADB]" onClick={handleUpload}>
          Attach Files
        </Button>
      </div>
    </>
  );
};

export default Fileupload;
