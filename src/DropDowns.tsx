import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

interface State {
  stateId: number;
  stateNameEng: string;
}

interface Division {
  divisionId: number;
  divisionNameEng: string;
}
interface district {
  districtId: number;
  districtNameEng: string;
}

const DropDowns: React.FC = () => {
  const [states, setStates] = useState<State[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [selectedState, setSelectedState] = useState<number | null>(null);
  const [district, setDistrict] = useState<district[]>([]);
  const [selectdivisions, setselectdivisions] = useState<number | null>(null);

  useEffect(() => {
    // Fetch states
    axios
      .post("https://localhost:44310/api/DropdownApi/GetState", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data)
        ) {
          setStates(response.data.data); // Access the 'data' property
        } else {
          console.error("Expected 'data' as an array, but received:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedState) {
      // Fetch divisions based on selected state
      axios
        .post(
          `https://localhost:44310/api/DropdownApi/GetDivision?stateId=${selectedState}`,
          {
            headers: {
              "Content-Type": "application/json",
             
            },
          }
        )
        .then((response) => {
          if (
            response.data &&
            response.data.data &&
            Array.isArray(response.data.data)
          ) {
            setDivisions(response.data.data); // Access the 'data' property
          } else {
            console.error("Expected 'data' as an array, but received:",
              response.data
            );
          }
          // setDivisions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching divisions:", error);
        });
    } else {
      setDivisions([]);
    }
  }, [selectedState]);
  useEffect(() => {
    if (selectdivisions) {
      debugger;
      axios
        .post(
          "https://localhost:44310/api/DropdownApi/GetDistrictByDivisionId",
          `DivisionId=${encodeURIComponent(selectdivisions)}`, // Send as form-data string
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",

            },
          }
        )
        .then((response) => {
          debugger;
          if (response.data && response.data.data && Array.isArray(response.data.data)) {
            setDistrict(response.data.data);
          } else {
            console.error("Expected 'data' as an array, but received:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
        });
    }
  }, [selectdivisions]);
  
  

  return (
<div className="card" >
  <div className="card-body">
    <h5 className="card-title text-bg-secondary  p-3">Report</h5>
    <div className="row">
      <div className="col-md-3">
        <label className="form-label">State:</label>
        <select
          className="form-control"
          onChange={(e) => setSelectedState(Number(e.target.value))}
          defaultValue="">
          <option value="">Select a state</option>
          {states.map((state) => (
            <option key={state.stateId} value={state.stateId}>
              {state.stateNameEng}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-3">
        <label className="form-label">Division:</label>
        <select
          className="form-control"
          disabled={!selectedState}
          onChange={(e) => setselectdivisions(Number(e.target.value))}
          defaultValue="">
          <option value="" disabled>
            Select a division
          </option>
          {divisions.map((division) => (
            <option key={division.divisionId} value={division.divisionId}>
              {division.divisionNameEng}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-3">
        <label className="form-label">District</label>
        <select className="form-control" disabled={!selectdivisions}>
          <option value="">Select a District</option>
          {district.map((district) => (
            <option key={district.districtId} value={district.districtId}>
              {district.districtNameEng}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
</div>
  );
};

export default DropDowns;
