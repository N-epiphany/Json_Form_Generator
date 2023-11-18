import React from "react";

const Radio = ({ required, options, jsonKey, defaultValue, immutable }) => {
  return (
    <div className="w-full grid grid-cols-2 gap-1">
      
      {options.map((d) => (
        <span className="w-full inline-flex" key={d.value}>
          <input
            type="radio"
            id={d.value}
            name={jsonKey}
            value={d.value}
            className="hidden peer"
            required={required}
            defaultChecked={defaultValue===d.value}
          />
          
          <label
            htmlFor={d.value}          
            className={`inline-flex justify-between items-center p-2 w-full bg-[#F1F7FF] rounded-lg border border-gray-200 cursor-pointer   peer-checked:border-[#B9B8F1] peer-checked:bg-[#DFECFD]`}
          >
            <div className="w-full flex justify-center">          
              <div className="w-fit text-sm font-medium">
                {d.label === "Pizza_type" ? `${d.label} ${required && '*'}` : d.label}
              </div>
            </div>
          </label>
        </span>
      ))}
    </div>
  );
};

export default Radio;
