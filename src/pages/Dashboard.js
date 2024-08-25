// src/pages/Dashboard.js
import React from "react";
import InvoiceForm from "./InvoiceForm";
import main from '../assets/main.svg'

function Dashboard() {
  return (
    <div className="h-[100%] w-full">
      <div className="h-[10%] bg-[#F5F7F8] flex items-center">
          <img src={main} alt="svg" className="h-[80%] w-full"/>
        {/* <div>
          <h2 className="text-center text-2xl">
            Welcome to the Invoice Generator
          </h2>
          <p className="text-center">Create Invoices Effortlessely</p>
        </div> */}
      </div>
      <div className="h-[full] bg-[#F5F7F8]" style={{ scrollbarWidth: "none" }}>
        <InvoiceForm />
      </div>
    </div>
  );
}

export default Dashboard;
