//This component handles the pop up window that show the data submitted by the form
import React from "react";
import "./App.css"

const FormDataDisplay = ({ jsonData, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        Form Submitted 
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default FormDataDisplay;
