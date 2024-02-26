//import {Logo} from "@/../public/Logo.png";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full border-b-2 p-3">
      <Link to="/">
        <img src="/Logo.svg" alt="logo" />
      </Link>
    </div>
  );
};

export default Navbar;
