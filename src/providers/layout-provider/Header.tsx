import Navbar from "@/app/components/Navbar";
import { UserType } from "@/interfaces";
import React from "react";
import ProjectTitle from "./Project-title";
import { Button } from "@/components/ui/button";
import UserInfo from "./User-info";
import DarkTheme from "@/app/components/DarkTheme";

interface HeaderProps {
  loggedInUserData: UserType | null;
}

const Header: React.FC<HeaderProps> = ({ loggedInUserData }) => {
  if (!loggedInUserData) {
    return (
      <div className="flex justify-center items-center h-[100vh] w-full">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      {/* <Navbar/> */}
      <div className="flex justify-between items-center ">
        <ProjectTitle />
        <div className="flex gap-3 items-center">
          <DarkTheme />
          <span className="text-gray-500 text-sm">{loggedInUserData.name}</span>
          <UserInfo loggedInUserData={loggedInUserData} />
        </div>
      </div>
    </div>
  );
};

export default Header;
