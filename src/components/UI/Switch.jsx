import React from "react";

const Switch = ({
  jsonKey,
  label,
  placeholder,
  description,
  required,
  immutable,
  defaultValue
}) => {
  return (
    <>
      <div className="flex items-center gap-3 py-1">
        <input
          type="checkbox"
          name={jsonKey}
          id=""
          value={true}
          className="accent-gray-800 bg-gray-100 rounded border-gray-300"
          defaultChecked={defaultValue}
          disabled={immutable}
        />
        <label htmlFor="" className="text-xs font-semibold">
          {label}
        </label>
      </div>
    </>
  );
};

export default Switch;
