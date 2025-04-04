import React, { useState } from "react";
import axios from "axios";


const DataInsert: React.FC = () => {
  const [PriorityName, setPriorityName] = useState<string | null>(null);
  const [PriorityCode, setPriorityCode] = useState<string | null>(null);

  function SaveData() {
    debugger
    if(PriorityName && PriorityCode){
        axios.post(
            "https://localhost:44310/api/DropdownApi/SavePriority",
            {
                PriorityName,
                PriorityCode
              },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            })
            .then((response) => {
                debugger
                console.log(response);
            })
    }else{
        alert("all fields are mandatory");
    }

     
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-bg-secondary  p-3">Data Insert Using API</h5>
        <div className="row">
          <div className="col-md-3">
            <label className="form-label">Priority Name:</label>
            <input className="form-control" onChange={(e) => setPriorityName(e.target.value) }></input>
          </div>

          <div className="col-md-3">
            <label className="form-label">Priority Code:</label>
            <input className="form-control" onChange={(e) => setPriorityCode(e.target.value) }></input>
          </div>
          <div className="col-md-3 mt-4 py-2">
            <button className="btn btn-outline-primary" onClick={SaveData}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DataInsert;
