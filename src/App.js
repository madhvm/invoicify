import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import InvoiceForm from "./pages/InvoiceForm";

function App() {
  return (
    <div className="h-[100vh] w-[100vw]" style={{scrollbarWidth:'none'}}>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
