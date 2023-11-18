import React from "react";

const MultiToggle = ({toggle, onClick}) => {
  return (
    <div className="flex gap-3 text-sm font-medium py-2">
      <span>{toggle? "Hide": "Show"} advanced fields</span>
      <div
      onClick={()=>onClick()}
        className={`flex w-10 h-5 rounded-full items-center p-1 px-[2px] ${
          toggle ? "bg-[#461CEF] justify-end duration-500" : "bg-[#DFECFD] duration-500"
        }  `}
      >
        <div className="h-4 w-4 bg-white rounded-full shadow-md"></div>
      </div>
    </div>
  );
};

export default MultiToggle;
