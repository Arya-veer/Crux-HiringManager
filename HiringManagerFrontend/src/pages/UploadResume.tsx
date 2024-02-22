import Fileupload from "@/components/Fileupload";

import { useLocation } from "react-router-dom";

const UploadResume = () => {
  const location = useLocation();

  return (
    <div>
      <Fileupload static_id={location.state.static_id} />
    </div>
  );
};

export default UploadResume;
