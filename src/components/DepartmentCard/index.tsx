import React from "react";
import { Avatar } from "@material-tailwind/react";
import image1 from "../../assets/profile1.jpg";
import image2 from "../../assets/profile2.jpg";

interface DepartmentProps {
  department: string;
  profile: string;
  focalpoint: string;
}

const Department: React.FC<DepartmentProps> = ({
  department,
  profile,
  focalpoint,
}) => {
  return (
    <div className="w-[22%] flex items-center justify-center">
      <div className="w-full rounded-md bg-gradient-to-r from-[#9E2896] to-[#18837E] pt-1">
        <div className="flex flex-col h-full w-full p-3 justify-center bg-[#F2F2F2]">
          <h1 className="font-semibold text-start text-base mb-6">Área de projetos</h1>
          <h2 className="text-[#9E2896] font-bold text-center text-4xl mb-6">
            {department}
          </h2>

          <div className="flex items-start">
            <div className="flex items-center -space-x-4">
              <Avatar
                variant="circular"
                alt="user 1"
                className="border-2 border-white hover:z-10 focus:z-10"
                src={profile}
              />
            </div>
            <div className="flex mt-3.5 items-center">
              <p className="ml-3 text-sm font-semibold">{focalpoint}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Department;