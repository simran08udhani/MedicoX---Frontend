import React, { useState } from "react";
import "./ScanUploader.css";
import { HiOutlineDownload } from "react-icons/hi";
import { Tooltip as ReactTooltip } from "react-tooltip";
import toast from 'react-hot-toast';
const ScanUploader = () => {
  const [selectedScan, setSelectedScan] = useState("");
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Handle file selection (import)
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    event.target.value = "";
    if (!selectedScan) {
      toast.error("Oops! Looks like you haven't selected a scan type. Please select the type of scan first.",{style:{maxWidth:"700px"}});
      return;
    }
  
    const validFormats = ["jpg", "jpeg", "dicom"];
    const fileName = file.name;
    const fileType = file.name.split(".").pop().toLowerCase();
    const validNamePattern = new RegExp(`\\w+_${selectedScan}$`);
    const textLabel = {"Xray": "X-Ray", "MRI": "MRI", "CTScan": "CT Scan"}
  
    if (!validNamePattern.test(fileName.split(".")[0])) {
      toast.error(`Seems like you have chosen ${textLabel[selectedScan]}. Please rename the file as User_Name_${selectedScan} and try uploading the file again.`,{style:{maxWidth:"900px"}});
      return;
    }
  
    if (!validFormats.includes(fileType)) {
      toast.error("Oops! We only support JPG, JPEG, and DICOM files. Please try again.",{style:{maxWidth:"700px"}});
      return;
    }
  
    setFile(file);
    setShowTooltip(false);
  };
  

  // Drag & Drop Handlers
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    if (event.dataTransfer.files.length > 0) {
      setFile(event.dataTransfer.files[0]);
      setShowTooltip(false); // Hide tooltip if file is selected
    }
  };

  // Handle upload button click
  const handleUpload = () => {
    if (!selectedScan) {
      setShowTooltip(true); // Show tooltip if no scan type is selected
      setTimeout(() => setShowTooltip(false), 2000); // Hide tooltip after 2 seconds
      return;
    }
    setProgress(20);
    setStep(2);
  };

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleNext = () => {
    setProgress(50);
    setStep(3);
  };

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      setProgress(100);
      setStep(4);
    }
  };

  return (
    <div className="upload-container">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      {step === 1 && (
        <div className="scan-uploader">
          {/* Left Section: Scan Type Selection */}
          <div className="scan-type">
            <h3><span style={{color:"red"}}>*</span> Select the type of scan</h3>
            
            <label className="scan-label">
              <input
              data-tooltip-id="ct-scan-tooltip"
                type="radio"
                name="scanType"
                value="CTScan"
                onChange={(e) => setSelectedScan(e.target.value)}
              />
              CT Scan
            </label>
            <label className="scan-label">
              <input
              data-tooltip-id="mri-tooltip"
                type="radio"
                name="scanType"
                value="MRI"
                onChange={(e) => setSelectedScan(e.target.value)}
              />
              MRI
            </label>
            <label className="scan-label">
              <input
              data-tooltip-id="x-ray-tooltip"
                type="radio"
                name="scanType"
                value="Xray"
                onChange={(e) => setSelectedScan(e.target.value)}
              />
              X-Ray
            </label>
          </div>

          {/* Vertical Dashed Line */}
          <div className="divider"></div>

          {/* Right Section: File Upload with Drag & Drop */}
          <div
            className={`upload-section ${dragging ? "dragover" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <h2>Drag and drop files here</h2>
            <p>Supported format: JPG, JPEG or DICOM</p>
            <div className="or"><hr></hr><p>or</p><hr></hr></div>
            <label htmlFor="file-upload" className="import-btn">
              <HiOutlineDownload />
              Import a File
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".png, .jpg, .jpeg, .dicom"
              onChange={handleFileChange}
              style={{ display: "none" }}
               // Disable the file input if no scan type is selected
            />
            
            {/* Display Selected File Name */}
            {file && <p className="file-name">📂 {file.name}</p>}
          </div>

          {/* Tooltip to prompt user to select a scan type after clicking "Import a File" */}
          {showTooltip && !selectedScan && (
            <span className="tooltip">⚠️ Please select a scan type before uploading a file.</span>
          )}
        </div>
      )}

      {/* Upload Button */}
      {step === 1 && (
        <div className="upload-btn-container">
          <button className="upload-btn" onClick={handleUpload}>
            Upload
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="form-container">
          <h2>Patient Details</h2>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          />
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div className="disclaimer">
          <p>⚠️ This diagnosis is automated and should be reviewed by a doctor.</p>
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            I understand and accept the disclaimer.
          </label>
        </div>
      )}

      {step === 4 && file && (
        <div className="result-container">
          <h2>Analyzed Report</h2>
          {/* Display Patient Details */}
          <h3>Patient Information</h3>
          <p><strong>First Name:</strong> {formData.firstName}</p>
          <p><strong>Last Name:</strong> {formData.lastName}</p>
          <p><strong>Age:</strong> {formData.age}</p>
          <p><strong>Gender:</strong> {formData.gender}</p>
          
          {/* Display the uploaded file */}
          <img src={URL.createObjectURL(file)} alt="Uploaded Scan" className="scan-image" />
          <div className="report">
            <p>🩺 Diagnosis Result: **Your AI Model’s Output Here**</p>
          </div>
        </div>
      )}
      <ReactTooltip
        id="ct-scan-tooltip"
        place="bottom"
        variant="info"
        content="Save file as User_Name_CTScan"
        openOnClick={true}
      />
      <ReactTooltip
        id="mri-tooltip"
        place="bottom"
        variant="info"
        content="Save file as User_Name_MRI"
        openOnClick={true}
      />
      <ReactTooltip
        id="x-ray-tooltip"
        place="bottom"
        variant="info"
        content="Save file as User_Name_Xray"
        openOnClick={true}
      />
    </div>
    
  );
};

export default ScanUploader;
