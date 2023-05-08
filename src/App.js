import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home"
import Pdf from "./components/PDF"

function App() {

  const [formData, setFormData] = useState({
    date: "",
    senderDetails: "",
    salutation: "",
    companyName: "",
    position: "",
    mainContent: "",
    endNote: "",
  });

  return (
    <Routes>
      <Route path="/" element={<Home formData={formData} setFormData={setFormData} />} />
      <Route path="/view" element={<Pdf formData={formData} />} />
    </Routes>
  );
}

export default App;
