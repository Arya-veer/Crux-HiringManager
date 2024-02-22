import React from "react";

import { Check, Loader2, XOctagon } from "lucide-react";

interface PdfUploadCardProps {
  fileName?: string;
  fileSize?: number;
  isUploaded: string;
}

const PdfUploadCard: React.FC<PdfUploadCardProps> = (
  props: PdfUploadCardProps
) => {
  return (
    <div className="w-full border-[.5px] border-gray-300 rounded-lg p-4 flex my-3">
      <div>
        <img src="/icons/pdfIcon.svg" alt="" />
      </div>
      <div className="text-sm mx-4">
        <div className="font-light">{props.fileName}</div>
        <div className="font-thin">{props.fileSize}</div>
      </div>
      <div className="grow flex items-center justify-end">
        {(() => {
          if (props.isUploaded === "notStarted") {
            return <div></div>;
          } else if (props.isUploaded === "success") {
            return (
              <Check className="bg-[#5F5ADB] text-white rounded-md p-1 font-bold" />
            );
          } else if (props.isUploaded === "uploading") {
            return <Loader2 className="text-[#5F5ADB] animate-spin" />;
          } else {
            return <XOctagon className="text-red-500" />;
          }
        })()}
      </div>
    </div>
  );
};

export default PdfUploadCard;
