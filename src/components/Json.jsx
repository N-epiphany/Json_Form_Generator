import React, { useState } from "react";
import dummyData from "../dummyData";

const Json = ({ className, setJsonForm, setJsonFormHeading }) => {
  const [formHeading, setFormHeading] = useState("")
  const [formData, setFormData] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    setJsonForm(formData);
    setFormData("");
    setJsonFormHeading(formHeading);
    setFormHeading("")
  };
  return (
    <div
      className={`bg-gray-900 border-r border-gray-500 text-white flex flex-col items-center p-1 ${className}`}
    >
      <h1 className="bg-violet-900 p-2 w-full rounded-md pl-3">
        Enter the UI-Schema in JSON
      </h1>
      <div className="w-full p-2 mt-2">
        <input
        value={formHeading}
        onChange={(e) => {
          setFormHeading(e.target.value);
        }}
          type="text"
          className="w-full bg-gray-800 px-4 py-3 text-sm outline-none rounded-lg"
          placeholder="Enter the Heading"
        />
      </div>

      <div className="flex-grow w-full p-2">
        <textarea
          value={formData}
          onChange={(e) => {
            setFormData(e.target.value);
          }}
          className="h-full resize-none w-full bg-gray-800 px-4 py-2 text-sm outline-none rounded-lg"
          placeholder="Enter the JSON"
        ></textarea>
      </div>
      <div className="flex w-full gap-2 px-2">
        <div onClick={()=>{setFormHeading("Yummy Pizza"); setFormData(JSON.stringify(dummyData[0]))}} className="flex flex-grow justify-center text-sm font-medium bg-violet-800 py-2 rounded-md active:scale-95 duration-200 cursor-pointer">Dummy Data 1</div>
        <div onClick={()=>{setFormHeading("Tasty Pasta"); setFormData(JSON.stringify(dummyData[1]))}} className="flex flex-grow justify-center text-sm font-medium bg-violet-800 py-2 rounded-md active:scale-95 duration-200 cursor-pointer">Dummy Data 2</div>
      </div>
      <div className="w-full p-2">
        <button
          onClick={submitHandler}
          type="submit"
          disabled={formData === "" || formHeading === ""}
          className="bg-violet-800 py-2 uppercase w-full rounded-md duration-200 active:scale-95 disabled:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default Json;
