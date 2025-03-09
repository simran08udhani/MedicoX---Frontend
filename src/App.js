import React from "react";
import Navbar from "./components/Navbar"; // Your existing Navbar component
import ScanUploader from "./components/ScanUploader";
import Footer from "./components/Footer"; // Import Footer component
import "./Header.css"; // Assuming you have styles for header
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className="App">
      {/* Navbar at the top */}
      <Navbar />

      

      {/* Main content container */}
      <div className="content">
        <ScanUploader />
      </div>

      {/* Footer at the bottom */}
      <Footer /> {/* Add Footer here */}
      <Toaster />
    </div>
  );
}

export default App;
