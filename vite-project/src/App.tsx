import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dasboard";
import UploadRecord from "./components/Upload";
import RetrieveRecord from "./components/RcordRetrieval";

const App: React.FC = () => {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4">
          <Link to="/" className="mr-4 text-blue-500">
            Dashboard
          </Link>
          <Link to="/upload" className="mr-4 text-blue-500">
            Upload Record
          </Link>
          <Link to="/retrieve" className="text-blue-500">
            Retrieve Record
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<UploadRecord />} />
          <Route path="/retrieve" element={<RetrieveRecord />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
