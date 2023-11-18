import React, { useState } from "react";
import Form from "./components/Form";
import Json from "./components/Json";

const App = () => {
  const [jsonForm, setJsonForm] = useState("[]");
  const [jsonFormHeading, setJsonFormHeading] = useState("");
  return (
    <div className="w-full flex overflow-y-scroll">
      <Json
        className="w-1/2 min-h-screen overflow-y-scroll"
        setJsonForm={setJsonForm}
        setJsonFormHeading={setJsonFormHeading}
      />
      <Form
        className="w-1/2 min-h-screen overflow-y-scroll"
        jsonForm={jsonForm}
        setJsonForm={setJsonForm}
        jsonFormHeading={jsonFormHeading}
      />
    </div>
  );
};

export default App;
