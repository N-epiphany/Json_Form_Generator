// Group.jsx
import React, { useState, useEffect } from "react";

const Group = ({ className, children, heading, required }) => {
  // console.log(required);
  const [astrik, setCount] = useState(false);
  useEffect(() => {
    setCount(required);
    console.log(astrik);
  }, [required]);
  return (
    <div
      className={` p-3 bg-[#FCFDFF] rounded-md border border-blue-100 flex flex-col gap-2 ${className}`}
    >
      {heading && (
        <h2 className="text-sm font-semibold border-b pb-2 mb-1">
          {heading}
          {astrik && <span className="font-normal text-red-500">*</span>}
        </h2>
      )}
      {children}
    </div>
  );
};

export default Group;
