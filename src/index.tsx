import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
// import DropDowns from './DropDowns';
import WatherReport from './WatherReport';
// import DataInsert from './DataInsert'
// import Dashboard from './Dashboard'
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
   <WatherReport />
   {/* <DropDowns/> */}
   {/* <DataInsert/> */}
   {/* <Dashboard/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
