import React from "react";
import Description from "./Description";

const Select = ({
  options = [],
  jsonKey,
  label,
  placeholder,
  description,
  required,
  immutable,
  defaultValue,
}) => {
  let calculatedDefault;
  options?.forEach((d) => {
    if((d.value===defaultValue)) calculatedDefault = d.value;
  });
  // console.log(calculatedDefault);
  return (
    <div className="flex justify-between items-center">
      <label className="text-sm font-medium" htmlFor="">
        {label}
        {required && <span className="font-normal text-red-500">*</span>}
        {description !== "" && <Description title={label} text={description} />}
      </label>
      <select
        className="w-1/2 bg-[#EFF7FF] px-2 py-1 rounded-[5px] focus:outline focus:outline-1 outline-blue-300 border border-blue-200 text-sm placeholder:text-[#6F89B2]"
        type="text"
        name={jsonKey}
        id=""
        placeholder="Enter Pizza Name"
        disabled={immutable}
        required={required}
        defaultValue={calculatedDefault}
      >
        {/* <option value="" selected disabled hidden>Select an Option</option> */}
        {options?.map((d) => (
          <option value={d.value} key={d.value}>
            {d.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
