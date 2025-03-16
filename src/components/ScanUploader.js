import React, { useState, useRef } from "react";
import "./ScanUploader.css";
import { HiOutlineDownload } from "react-icons/hi";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FiAlertTriangle, FiUpload } from "react-icons/fi";
import { Tooltip as ReactTooltip } from "react-tooltip";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import getBase64Image from "../utils/getBase64Image";

const ScanUploader = () => {
  const [selectedScan, setSelectedScan] = useState("");
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const reportRef = useRef(null);

  const handleSelectedFile = (file) => {
    if (!selectedScan) {
      toast.error(
        "Oops! Looks like you haven't selected a scan type. Please select the type of scan first.",
        { style: { maxWidth: "700px" } }
      );
      return;
    }

    const validFormats = ["jpg", "jpeg", "dicom"];
    const fileName = file.name;
    const fileType = file.name.split(".").pop().toLowerCase();
    const validNamePattern = new RegExp(`\\w+_${selectedScan}$`);
    const textLabel = { Xray: "X-Ray", MRI: "MRI", CTScan: "CT Scan" };

    if (!validNamePattern.test(fileName.split(".")[0])) {
      toast.error(
        `Seems like you have chosen ${textLabel[selectedScan]}. Please rename the file as User_Name_${selectedScan} and try uploading the file again.`,
        { style: { maxWidth: "900px" } }
      );
      return;
    }

    if (!validFormats.includes(fileType)) {
      toast.error(
        "Oops! We only support JPG, JPEG, and DICOM files. Please try again.",
        { style: { maxWidth: "700px" } }
      );
      return;
    }

    setFile(file);
    setShowTooltip(false);
  };

  // Handle file selection (import)
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    event.target.value = "";
    handleSelectedFile(file);
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
      handleSelectedFile(event.dataTransfer.files[0]);
    }
  };

  // Handle upload button click
  const handleUpload = () => {
    if (!selectedScan) {
      setShowTooltip(true); // Show tooltip if no scan type is selected
      setTimeout(() => setShowTooltip(false), 2000); // Hide tooltip after 2 seconds
      return;
    }

    if (!file) {
      toast.error("Please select a file before proceeding.", {
        style: { maxWidth: "700px" },
      });
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
    if (!formData.firstName) {
      toast.error("Please write First Name.", {
        style: { maxWidth: "700px" },
      });
      return;
    }
    if (!formData.lastName) {
      toast.error("Please write Last Name.", {
        style: { maxWidth: "700px" },
      });
      return;
    }
    if (!formData.dob) {
      toast.error("Please select your DOB.", {
        style: { maxWidth: "700px" },
      });
      return;
    }
    if (!formData.gender || formData.gender === "default") {
      toast.error("Please select your Gender.", {
        style: { maxWidth: "700px" },
      });
      return;
    }
    setProgress(50);
    setStep(3);
  };

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const submitFinal = () => {
    if (!isChecked) {
      toast.error("Please select the checkbox to proceed.", {
        style: { maxWidth: "700px" },
      });
      return;
    }
    setProgress(100);
    setStep(4);
  };

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Adjust if birthdate hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };

  // const downloadPDF = async () => {
  //   if (!reportRef.current) return;

  //   try {
  //     const logoBase64 = await getBase64Image("/logo.png"); // Convert logo to Base64 dynamically
  //     console.log(logoBase64);

  //     html2canvas(reportRef.current, { scale: 2 }).then((canvas) => {
  //       const imgData = canvas.toDataURL("image/png");
  //       const pdf = new jsPDF("p", "mm", "a4");
  //       const imgWidth = 190;
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //       // Add Logo (Centered at Top)
  //       const logoWidth = 40;
  //       const logoHeight = 20;
  //       const logoX = (pdf.internal.pageSize.width - logoWidth) / 2;
  //       pdf.addImage(logoBase64, "PNG", logoX, 10, logoWidth, logoHeight);

  //       // Add Report Content Below Logo
  //       pdf.addImage(imgData, "PNG", 10, 40, imgWidth, imgHeight);
  //       pdf.save("report.pdf");
  //     });
  //   } catch (error) {
  //     console.error("Error loading logo:", error);
  //   }
  // };

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
            <h3>
              <span style={{ color: "red" }}>*</span>
              <span>Select the type of scan</span>
            </h3>

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
            <div className="or">
              <hr></hr>
              <p>or</p>
              <hr></hr>
            </div>
            <label htmlFor="file-upload" className="import-btn">
              <FiUpload />
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
            <span className="tooltip">
              ⚠️ Please select a scan type before uploading a file.
            </span>
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
          <h2>Personal Information</h2>
          <h3>About you</h3>
          <div className="patient-form">
            <div>
              {" "}
              <label>First name</label>{" "}
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Last name</label>{" "}
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                placeholder="Birthdate"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="default" id="select-gender">
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <button onClick={handleNext}>
            Next <FaAngleDoubleRight size={16} />
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="disclaimer">
          <div>
            <FiAlertTriangle size={300} />
          </div>

          <div>
            <h2>Disclaimer</h2>
            <div className="disclaimer-form">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label>
                This diagnosis is automated and should be reviewed by a medical
                professional.{" "}
              </label>
            </div>
            <button onClick={submitFinal}>Confirm</button>
          </div>
        </div>
      )}

      {step === 4 && file && (
        <div className="result-container">
          <div className="left">
            {" "}
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded Scan"
              className="scan-image"
            />
          </div>
          <div className="right">
            <div className="report">
              <h2>Report</h2>
              <div className="patient-info">
                <p>
                  <strong>Name:</strong> {formData.firstName}{" "}
                  {formData.lastName}
                </p>
                <p>
                  <strong>Age:</strong> {calculateAge(formData.dob)}
                </p>
                <p>
                  <strong>Gender:</strong> {formData.gender}
                </p>
              </div>
              {/* <button id="download" onClick={downloadPDF}>
                <HiOutlineDownload />
                Download Report
              </button> */}
            </div>
          </div>
        </div>
      )}
      <ReactTooltip
        id="ct-scan-tooltip"
        place="bottom"
        variant="info"
        content="Save file as User_Name_CTScan"
        openOnClick={true}
        className="radio-tooltip"
      />
      <ReactTooltip
        id="mri-tooltip"
        place="bottom"
        variant="info"
        content="Save file as User_Name_MRI"
        openOnClick={true}
        className="radio-tooltip"
      />
      <ReactTooltip
        id="x-ray-tooltip"
        place="bottom"
        variant="info"
        content="Save file as User_Name_Xray"
        openOnClick={true}
        className="radio-tooltip"
      />
    </div>
  );
};

export default ScanUploader;
