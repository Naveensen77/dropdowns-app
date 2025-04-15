import React, { useState, useEffect } from "react";
import axios from "axios";
import constants from "./constants";

interface Priority {
  priorityId: number;
  priorityName: string;
  priorityCode: number;
}

const DataInsert: React.FC = () => {
  const [PriorityName, setPriorityName] = useState<string | null>(null);
  const [PriorityCode, setPriorityCode] = useState<number | null>(null);
  const [PriorityList, setPriority] = useState<Priority[]>([]);
  const [priorityId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    getAllPriorities();
  }, []);

  function SaveData() {
    debugger;
    if (PriorityName && PriorityCode) {
      axios
        .post(
          `${constants.ApiUrl}/api/DropdownApi/SavePriority`,
          {
            PriorityName,
            PriorityCode,
            priorityId
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => {
          debugger;
          if (response.data.status == true) {
            alert("Data Save Successfully");
            setPriorityName("");
            setPriorityCode(null);
          }
        });
    } else {
      alert("all fields are mandatory");
    }
  }
  function getAllPriorities() {
    axios.get(`${constants.ApiUrl}/api/DropdownApi/GetPriority`).then((res) => {
      setPriority(res.data.data);
    });
  }
  const editRow = (item: Priority) => {
    debugger
    setPriorityName(item.priorityName);
    setPriorityCode(item.priorityCode);
    setEditId(item.priorityId);
  };
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-bg-secondary  p-3">
          Data Insert Using API
        </h5>
        <div className="row">
          <div className="col-md-3">
            <label className="form-label">Priority Name:</label>
            <input
              className="form-control"
              placeholder="Enter Priority Name"
              value={PriorityName ?? ""}
              onChange={(e) => setPriorityName(e.target.value)}
            ></input>
          </div>

          <div className="col-md-3">
            <label className="form-label">Priority Code:</label>
            <input
              className="form-control"
              placeholder="Enter Priority Code"
              value={PriorityCode ?? ""}
              onChange={(e) => setPriorityCode(Number(e.target.value))}
            ></input>
          </div>
          <div className="col-md-3 mt-4 py-2">
            <button className="btn btn-outline-primary" onClick={SaveData}>
              {priorityId ? "Update" : "Save"}
            </button>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <table className="table table-bordered">
              <thead>
                <th>Sr.No.</th>
                <th>Priority Name</th>
                <th>Priority Code</th>
                <th>Edit Buttons</th>
              </thead>
              <tbody> 
                {PriorityList.length > 0 ? (
                  PriorityList.map((item, index) => (
                    <tr key={item.priorityId}>
                      <td> {index + 1}</td>
                      <td>{item.priorityName}</td>
                      <td>{item.priorityCode}</td>
                      <td>
                        <button className="btn" onClick={() => editRow(item)}>Edit</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>No data found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DataInsert;
