// Group.jsx
import React from "react";

const Group = ({ className, children, heading, required }) => {
  return (
    <div
      className={` p-3 bg-[#FCFDFF] rounded-md border border-blue-100 flex flex-col gap-2 ${className}`}
    >
      {heading && (
        <h2 className="text-sm font-semibold border-b pb-2 mb-1">
          {heading}
          {<span className="ml-1 text-red-500">*</span>}
        </h2>
      )}
      {children}
    </div>
  );
};

export default Group;
