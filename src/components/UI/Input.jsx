import React from "react";
import Description from "./Description";

const Input = ({
  jsonKey,
  label,
  placeholder,
  description,
  required,
  immutable,
}) => {
  return (
    <div className="flex justify-between items-center">
      <label className="text-sm font-medium" htmlFor="">
        {label}{required&&<span className="font-normal text-red-500">*</span>}
        {description!==""&&<Description  title={label} text={description}/>}
      </label>
      <input
        className="w-1/2 bg-[#EFF7FF] px-2 py-1 rounded-[5px] focus:outline focus:outline-1 outline-blue-300 border border-blue-200 text-sm placeholder:text-[#6F89B2]"
        type="text"
        name={jsonKey}
        id=""
        placeholder={placeholder}
        disabled={immutable}
        required={required}
      />
    </div>
  );
};

export default Input;
