import React from "react";
import Navbar from "./components/Navbar";
import ScanUploader from "./components/ScanUploader";
import Footer from "./components/Footer";
import "./Header.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <ScanUploader />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
