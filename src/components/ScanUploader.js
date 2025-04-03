// import React, { useState } from "react";
// import "./ScanUploader.css";
// import { FiAlertTriangle, FiUpload } from "react-icons/fi";
// import { Tooltip as ReactTooltip } from "react-tooltip";
// import toast from "react-hot-toast";
// import { FaAngleDoubleRight } from "react-icons/fa";
// // import { HiOutlineDownload } from "react-icons/hi";
// // import html2canvas from "html2canvas";
// // import jsPDF from "jspdf";
// // import getBase64Image from "../utils/getBase64Image";

// const ScanUploader = () => {
//   const [selectedScan, setSelectedScan] = useState("");
//   const [progress, setProgress] = useState(0);
//   const [file, setFile] = useState(null);
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     dob: "",
//     gender: "",
//   });
//   const [isChecked, setIsChecked] = useState(false);
//   const [dragging, setDragging] = useState(false);
//   // const [showTooltip, setShowTooltip] = useState(false);
//   // const reportRef = useRef(null);

//   const handleSelectedFile = (file) => {
//     if (!selectedScan) {
//       toast.error(
//         "Oops! Looks like you haven't selected a scan type. Please select the type of scan first.",
//         { style: { maxWidth: "700px" } }
//       );
//       return;
//     }

//     const validFormats = ["jpg", "jpeg", "dicom"];
//     const fileName = file.name;
//     const fileType = file.name.split(".").pop().toLowerCase();
//     const validNamePattern = new RegExp(`\\w+_${selectedScan}$`);
//     const textLabel = { Xray: "X-Ray", MRI: "MRI", CTScan: "CT Scan" };

//     if (!validNamePattern.test(fileName.split(".")[0])) {
//       toast.error(
//         `Seems like you have chosen ${textLabel[selectedScan]}. Please rename the file as User_Name_${selectedScan} and try uploading the file again.`,
//         { style: { maxWidth: "900px" } }
//       );
//       return;
//     }

//     if (!validFormats.includes(fileType)) {
//       toast.error(
//         "Oops! We only support JPG, JPEG, and DICOM files. Please try again.",
//         { style: { maxWidth: "700px" } }
//       );
//       return;
//     }

//     setFile(file);
//   };

//   // Handle file selection (import)
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;
//     event.target.value = "";
//     handleSelectedFile(file);
//   };

//   // Drag & Drop Handlers
//   const handleDragOver = (event) => {
//     event.preventDefault();
//     setDragging(true);
//   };

//   const handleDragLeave = () => {
//     setDragging(false);
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     setDragging(false);
//     if (event.dataTransfer.files.length > 0) {
//       handleSelectedFile(event.dataTransfer.files[0]);
//     }
//   };

//   // Handle upload button click
//   const handleUpload = () => {
//     if (!selectedScan) {
//       toast.error(
//         "Oops! Looks like you haven't selected a scan type. Please select the type of scan first.",
//         { style: { maxWidth: "700px" } }
//       );
//       return;
//     }

//     if (!file) {
//       toast.error("Please select a file before proceeding.", {
//         style: { maxWidth: "700px" },
//       });
//       return;
//     }

//     setProgress(20);
//     setStep(2);
//   };

//   // Handle form input changes
//   const handleChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   // Handle form submission
//   const handleNext = () => {
//     if (!formData.firstName) {
//       toast.error("Please write First Name.", {
//         style: { maxWidth: "700px" },
//       });
//       return;
//     }
//     if (!formData.lastName) {
//       toast.error("Please write Last Name.", {
//         style: { maxWidth: "700px" },
//       });
//       return;
//     }
//     if (!formData.dob) {
//       toast.error("Please select your DOB.", {
//         style: { maxWidth: "700px" },
//       });
//       return;
//     }
//     if (!formData.gender || formData.gender === "default") {
//       toast.error("Please select your Gender.", {
//         style: { maxWidth: "700px" },
//       });
//       return;
//     }
//     setProgress(50);
//     setStep(3);
//   };

//   // Handle checkbox change
//   const handleCheckboxChange = (event) => {
//     setIsChecked(event.target.checked);
//   };

//   const submitFinal = async () => {
//     if (!isChecked) {
//       toast.error("Please select the checkbox to proceed.", {
//         style: { maxWidth: "700px" },
//       });
//       return;
//     }
//     const result = await uploadMedicalScan(selectedScan, file);
//     console.log(result);
//     setProgress(100);
//     setStep(4);
//   };

//   const calculateAge = (birthdate) => {
//     const birthDate = new Date(birthdate);
//     const today = new Date();

//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     const dayDiff = today.getDate() - birthDate.getDate();

//     // Adjust if birthdate hasn't occurred yet this year
//     if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
//       age--;
//     }

//     return age;
//   };

//   // const downloadPDF = async () => {
//   //   if (!reportRef.current) return;

//   //   try {
//   //     const logoBase64 = await getBase64Image("/logo.png"); // Convert logo to Base64 dynamically
//   //     console.log(logoBase64);

//   //     html2canvas(reportRef.current, { scale: 2 }).then((canvas) => {
//   //       const imgData = canvas.toDataURL("image/png");
//   //       const pdf = new jsPDF("p", "mm", "a4");
//   //       const imgWidth = 190;
//   //       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//   //       // Add Logo (Centered at Top)
//   //       const logoWidth = 40;
//   //       const logoHeight = 20;
//   //       const logoX = (pdf.internal.pageSize.width - logoWidth) / 2;
//   //       pdf.addImage(logoBase64, "PNG", logoX, 10, logoWidth, logoHeight);

//   //       // Add Report Content Below Logo
//   //       pdf.addImage(imgData, "PNG", 10, 40, imgWidth, imgHeight);
//   //       pdf.save("report.pdf");
//   //     });
//   //   } catch (error) {
//   //     console.error("Error loading logo:", error);
//   //   }
//   // };

//   return (
//     <div className="upload-container">
//       {/* Progress Bar */}
//       <div className="progress-bar">
//         <div className="progress" style={{ width: `${progress}%` }}></div>
//       </div>

//       {step === 1 && (
//         <div className="scan-uploader">
//           {/* Left Section: Scan Type Selection */}
//           <div className="scan-type">
//             <h3>
//               <span style={{ color: "red" }}>*</span>
//               <span>Select the type of scan</span>
//             </h3>

//             <label className="scan-label">
//               <input
//                 data-tooltip-id="ct-scan-tooltip"
//                 type="radio"
//                 name="scanType"
//                 value="CTScan"
//                 onChange={(e) => setSelectedScan(e.target.value)}
//               />
//               CT Scan
//             </label>
//             <label className="scan-label">
//               <input
//                 data-tooltip-id="mri-tooltip"
//                 type="radio"
//                 name="scanType"
//                 value="MRI"
//                 onChange={(e) => setSelectedScan(e.target.value)}
//               />
//               MRI
//             </label>
//             <label className="scan-label">
//               <input
//                 data-tooltip-id="x-ray-tooltip"
//                 type="radio"
//                 name="scanType"
//                 value="Xray"
//                 onChange={(e) => setSelectedScan(e.target.value)}
//               />
//               X-Ray
//             </label>
//           </div>

//           {/* Vertical Dashed Line */}
//           <div className="divider"></div>

//           {/* Right Section: File Upload with Drag & Drop */}
//           <div
//             className={`upload-section ${dragging ? "dragover" : ""}`}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             onDrop={handleDrop}
//           >
//             <h2>Drag and drop files here</h2>
//             <p>Supported format: JPG, JPEG or DICOM</p>
//             <div className="or">
//               <hr></hr>
//               <p>or</p>
//               <hr></hr>
//             </div>
//             <label htmlFor="file-upload" className="import-btn">
//               <FiUpload />
//               Import a File
//             </label>
//             <input
//               id="file-upload"
//               type="file"
//               accept=".png, .jpg, .jpeg, .dicom"
//               onChange={handleFileChange}
//               style={{ display: "none" }}
//               // Disable the file input if no scan type is selected
//             />

//             {/* Display Selected File Name */}
//             {file && <p className="file-name">📂 {file.name}</p>}
//           </div>

//           {/* Tooltip to prompt user to select a scan type after clicking "Import a File" */}
//           {/* {showTooltip && !selectedScan && (
//             <span className="tooltip">
//               ⚠️ Please select a scan type before uploading a file.
//             </span>
//           )} */}
//         </div>
//       )}

//       {/* Upload Button */}
//       {step === 1 && (
//         <div className="upload-btn-container">
//           <button className="upload-btn" onClick={handleUpload}>
//             Upload
//           </button>
//         </div>
//       )}

//       {step === 2 && (
//         <div className="form-container">
//           <h2>Personal Information</h2>
//           <h3>About you</h3>
//           <div className="patient-form">
//             <div>
//               {" "}
//               <label>First name</label>{" "}
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First Name"
//                 value={formData.firstName}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label>Last name</label>{" "}
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Last Name"
//                 value={formData.lastName}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label>Date of Birth</label>
//               <input
//                 type="date"
//                 name="dob"
//                 placeholder="Birthdate"
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label>Gender</label>
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//               >
//                 <option value="default" id="select-gender">
//                   Select Gender
//                 </option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//           </div>
//           <button onClick={handleNext}>
//             Next <FaAngleDoubleRight size={16} />
//           </button>
//         </div>
//       )}

//       {step === 3 && (
//         <div className="disclaimer">
//           <div>
//             <FiAlertTriangle size={300} />
//           </div>

//           <div>
//             <h2>Disclaimer</h2>
//             <div className="disclaimer-form">
//               <input
//                 type="checkbox"
//                 checked={isChecked}
//                 onChange={handleCheckboxChange}
//               />
//               <label>
//                 This diagnosis is automated and should be reviewed by a medical
//                 professional.{" "}
//               </label>
//             </div>
//             <button onClick={submitFinal}>Confirm</button>
//           </div>
//         </div>
//       )}

//       {step === 4 && file && (
//         <div className="result-container">
//           <div className="left">
//             {" "}
//             <img
//               src={URL.createObjectURL(file)}
//               alt="Uploaded Scan"
//               className="scan-image"
//             />
//           </div>
//           <div className="right">
//             <div className="report">
//               <h2>Report</h2>
//               <div className="patient-info">
//                 <p>
//                   <strong>Name:</strong> {formData.firstName}{" "}
//                   {formData.lastName}
//                 </p>
//                 <p>
//                   <strong>Age:</strong> {calculateAge(formData.dob)}
//                 </p>
//                 <p>
//                   <strong>Gender:</strong> {formData.gender}
//                 </p>
//               </div>
//               {/* <button id="download" onClick={downloadPDF}>
//                 <HiOutlineDownload />
//                 Download Report
//               </button> */}
//             </div>
//           </div>
//         </div>
//       )}
//       <ReactTooltip
//         id="ct-scan-tooltip"
//         place="bottom"
//         variant="info"
//         content="Save file as User_Name_CTScan"
//         openOnClick={true}
//         className="radio-tooltip"
//       />
//       <ReactTooltip
//         id="mri-tooltip"
//         place="bottom"
//         variant="info"
//         content="Save file as User_Name_MRI"
//         openOnClick={true}
//         className="radio-tooltip"
//       />
//       <ReactTooltip
//         id="x-ray-tooltip"
//         place="bottom"
//         variant="info"
//         content="Save file as User_Name_Xray"
//         openOnClick={true}
//         className="radio-tooltip"
//       />
//     </div>
//   );
// };

// export default ScanUploader;

// async function uploadMedicalScan(scanType, imageFile, options = {}) {
//   const endpoints = {
//     CTScan: "/predict/ct-scan/",
//     MRI: "/predict/mri/",
//     Xray: "/predict/xray/",
//   };
//   if (!endpoints[scanType]) {
//     throw new Error(
//       `Invalid scan type: ${scanType}. Must be one of: ${Object.keys(
//         endpoints
//       ).join(", ")}`
//     );
//   }

//   const baseUrl = "http://127.0.0.1:8000/api";
//   const url = `${baseUrl}${endpoints[scanType]}`;

//   // Create FormData to handle file upload
//   const formData = new FormData();
//   formData.append("image", imageFile);

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         ...options.headers,
//       },
//       body: formData,
//     });

//     // Check if request was successful
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         `API request failed with status ${response.status}: ${errorText}`
//       );
//     }

//     // Parse and return the JSON response
//     const data = await response.json();

//     // Validate that result property exists
//     if (!data.result) {
//       throw new Error('API response missing expected "result" property');
//     }

//     return data.result;
//   } catch (error) {
//     console.error(`Error uploading ${scanType}:`, error);
//     throw error;
//   }
// }

//Update code
// import React, { useState } from "react";
// import "./ScanUploader.css";
// import { FiAlertTriangle, FiUpload } from "react-icons/fi";
// import { Tooltip as ReactTooltip } from "react-tooltip";
// import toast from "react-hot-toast";
// import { FaAngleDoubleRight } from "react-icons/fa";
// // import { HiOutlineDownload } from "react-icons/hi";
// // import html2canvas from "html2canvas";
// // import jsPDF from "jspdf";
// // import getBase64Image from "../utils/getBase64Image";

// const ScanUploader = () => {
//   const [selectedScan, setSelectedScan] = useState("");
//   const [progress, setProgress] = useState(0);
//   const [file, setFile] = useState(null);
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     dob: "",
//     gender: "",
//   });
//   const [isChecked, setIsChecked] = useState(false);
//   const [dragging, setDragging] = useState(false);
//   // const [showTooltip, setShowTooltip] = useState(false);
//   // const reportRef = useRef(null);
//   const [predictionResult, setPredictionResult] = useState(null);

//   const handleSelectedFile = (file) => {
//     if (!selectedScan) {
//       toast.error(
//         "Oops! Looks like you haven't selected a scan type. Please select the type of scan first.",
//         { style: { maxWidth: "700px" } }
//       );
//       return;
//     }

//     const validFormats = ["jpg", "jpeg", "dicom"];
//     const fileType = file.name.split(".").pop().toLowerCase();

//     if (!validFormats.includes(fileType)) {
//       toast.error(
//         "Oops! We only support JPG, JPEG, and DICOM files. Please try again.",
//         { style: { maxWidth: "700px" } }
//       );
//       return;
//     }

//     // Store the original file for display purposes
//     setFile(file);
//   };

//   // Handle file selection (import)
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;
//     event.target.value = "";
//     handleSelectedFile(file);
//   };

//   // Drag & Drop Handlers
//   const handleDragOver = (event) => {
//     event.preventDefault();
//     setDragging(true);
//   };

//   const handleDragLeave = () => {
//     setDragging(false);
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     setDragging(false);
//     if (event.dataTransfer.files.length > 0) {
//       handleSelectedFile(event.dataTransfer.files[0]);
//     }
//   };

//   // Handle upload button click
//   const handleUpload = () => {
//     if (!selectedScan) {
//       toast.error(
//         "Oops! Looks like you haven't selected a scan type. Please select the type of scan first.",
//         { style: { maxWidth: "700px" } }
//       );
//       return;
//     }

//     if (!file) {
//       toast.error("Please select a file before proceeding.", {
//         style: { maxWidth: "700px" },
//       });
//       return;
//     }

//     setProgress(20);
//     setStep(2);
//   };

//   // Handle form input changes
//   const handleChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   // Handle form submission
//   const handleNext = () => {
//     if (!formData.firstName) {
//       toast.error("Please write First Name.", {
//         style: { maxWidth: "700px" },
//       });
//       return;
//     }
//     if (!formData.lastName) {
//       toast.error("Please write Last Name.", {
//         style: { maxWidth: "700px" },
//       });
//       return;
//     }
//     if (!formData.dob) {
//       toast.error("Please select your DOB.", {
//         style: { maxWidth: "700px" },
//       });
//       return;
//     }
//     if (!formData.gender || formData.gender === "default") {
//       toast.error("Please select your Gender.", {
//         style: { maxWidth: "700px" },
//       });
//       return;
//     }
//     setProgress(50);
//     setStep(3);
//   };

//   // Handle checkbox change
//   const handleCheckboxChange = (event) => {
//     setIsChecked(event.target.checked);
//   };

//   // Function to prepare file for upload with proper naming convention
//   const prepareFileForUpload = async (originalFile) => {
//     if (!originalFile || !selectedScan || !formData.firstName) {
//       return null;
//     }

//     // Create a new file name following the required pattern
//     const fileExtension = originalFile.name.split('.').pop();
//     const userName = `${formData.firstName.replace(/\s+/g, '')}_${selectedScan}`;
//     const newFileName = `${userName}.${fileExtension}`;

//     // Create a new file with the correct name
//     return new File([originalFile], newFileName, {
//       type: originalFile.type,
//       lastModified: originalFile.lastModified
//     });
//   };

//   const submitFinal = async () => {
//     if (!isChecked) {
//       toast.error("Please select the checkbox to proceed.", {
//         style: { maxWidth: "700px" },
//       });
//       return;
//     }

//     try {
//       // Prepare the file with proper naming convention
//       const preparedFile = await prepareFileForUpload(file);

//       if (!preparedFile) {
//         toast.error("Error preparing file. Please try again.", {
//           style: { maxWidth: "700px" },
//         });
//         return;
//       }

//       toast.success(`File renamed to ${preparedFile.name} for processing`, {
//         style: { maxWidth: "700px" },
//         duration: 2000,
//       });

//       const result = await uploadMedicalScan(selectedScan, preparedFile);
//       setPredictionResult(result);
//       console.log(result);
//       setProgress(100);
//       setStep(4);
//     } catch (error) {
//       toast.error("Error processing scan. Please try again.", {
//         style: { maxWidth: "700px" },
//       });
//       console.error("Error submitting scan:", error);
//     }
//   };

//   const calculateAge = (birthdate) => {
//     const birthDate = new Date(birthdate);
//     const today = new Date();

//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     const dayDiff = today.getDate() - birthDate.getDate();

//     // Adjust if birthdate hasn't occurred yet this year
//     if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
//       age--;
//     }

//     return age;
//   };

//   // Get severity color based on severity level
//   const getSeverityColor = (severity) => {
//     switch (severity?.toLowerCase()) {
//       case 'high':
//         return '#FF4D4F'; // Red
//       case 'medium':
//         return '#FAAD14'; // Orange
//       case 'low':
//         return '#52C41A'; // Green
//       default:
//         return '#1890FF'; // Blue
//     }
//   };

//   return (
//     <div className="upload-container">
//       {/* Progress Bar */}
//       <div className="progress-bar">
//         <div className="progress" style={{ width: `${progress}%` }}></div>
//       </div>

//       {step === 1 && (
//         <div className="scan-uploader">
//           {/* Left Section: Scan Type Selection */}
//           <div className="scan-type">
//             <h3>
//               <span style={{ color: "red" }}>*</span>
//               <span>Select the type of scan</span>
//             </h3>

//             <label className="scan-label">
//               <input
//                 type="radio"
//                 name="scanType"
//                 value="CTScan"
//                 onChange={(e) => setSelectedScan(e.target.value)}
//               />
//               CT Scan
//             </label>
//             <label className="scan-label">
//               <input
//                 type="radio"
//                 name="scanType"
//                 value="MRI"
//                 onChange={(e) => setSelectedScan(e.target.value)}
//               />
//               MRI
//             </label>
//             <label className="scan-label">
//               <input
//                 type="radio"
//                 name="scanType"
//                 value="Xray"
//                 onChange={(e) => setSelectedScan(e.target.value)}
//               />
//               X-Ray
//             </label>
//           </div>

//           {/* Vertical Dashed Line */}
//           <div className="divider"></div>

//           {/* Right Section: File Upload with Drag & Drop */}
//           <div
//             className={`upload-section ${dragging ? "dragover" : ""}`}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             onDrop={handleDrop}
//           >
//             <h2>Drag and drop files here</h2>
//             <p>Supported format: JPG, JPEG or DICOM</p>
//             <div className="or">
//               <hr></hr>
//               <p>or</p>
//               <hr></hr>
//             </div>
//             <label htmlFor="file-upload" className="import-btn">
//               <FiUpload />
//               Import a File
//             </label>
//             <input
//               id="file-upload"
//               type="file"
//               accept=".png, .jpg, .jpeg, .dicom"
//               onChange={handleFileChange}
//               style={{ display: "none" }}
//               // Disable the file input if no scan type is selected
//             />

//             {/* Display Selected File Name */}
//             {file && <p className="file-name">📂 {file.name}</p>}
//           </div>
//         </div>
//       )}

//       {/* Upload Button */}
//       {step === 1 && (
//         <div className="upload-btn-container">
//           <button className="upload-btn" onClick={handleUpload}>
//             Upload
//           </button>
//         </div>
//       )}

//       {step === 2 && (
//         <div className="form-container">
//           <h2>Personal Information</h2>
//           <h3>About you</h3>
//           <div className="patient-form">
//             <div>
//               {" "}
//               <label>First name</label>{" "}
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First Name"
//                 value={formData.firstName}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label>Last name</label>{" "}
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Last Name"
//                 value={formData.lastName}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label>Date of Birth</label>
//               <input
//                 type="date"
//                 name="dob"
//                 placeholder="Birthdate"
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label>Gender</label>
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//               >
//                 <option value="default" id="select-gender">
//                   Select Gender
//                 </option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//           </div>
//           <button onClick={handleNext}>
//             Next <FaAngleDoubleRight size={16} />
//           </button>
//         </div>
//       )}

//       {step === 3 && (
//         <div className="disclaimer">
//           <div>
//             <FiAlertTriangle size={300} />
//           </div>

//           <div>
//             <h2>Disclaimer</h2>
//             <div className="disclaimer-form">
//               <input
//                 type="checkbox"
//                 checked={isChecked}
//                 onChange={handleCheckboxChange}
//               />
//               <label>
//                 This diagnosis is automated and should be reviewed by a medical
//                 professional.{" "}
//               </label>
//             </div>
//             <button onClick={submitFinal}>Confirm</button>
//           </div>
//         </div>
//       )}

//       {step === 4 && file && (
//         <div className="result-container">
//           <div className="left">
//             {" "}
//             <img
//               src={URL.createObjectURL(file)}
//               alt="Uploaded Scan"
//               className="scan-image"
//             />
//           </div>
//           <div className="right">
//             <div className="report">
//               <h2>Report</h2>
//               <div className="patient-info">
//                 <p>
//                   <strong>Name:</strong> {formData.firstName}{" "}
//                   {formData.lastName}
//                 </p>
//                 <p>
//                   <strong>Age:</strong> {calculateAge(formData.dob)}
//                 </p>
//                 <p>
//                   <strong>Gender:</strong> {formData.gender}
//                 </p>
//               </div>

//               {/* AI Prediction Results Section */}
//               {predictionResult && (
//                 <div className="prediction-results">
//                   <h3>AI Analysis Results</h3>

//                   <div className="prediction-card">
//                     <div className="prediction-header">
//                       <h4>Prediction:</h4>
//                       <span className="prediction-value">{predictionResult.prediction}</span>
//                     </div>

//                     <div className="confidence-meter">
//                       <p>Confidence Level: <strong>{predictionResult.confidence_percentage}</strong></p>
//                       <div className="meter-container">
//                         <div
//                           className="meter-fill"
//                           style={{
//                             width: predictionResult.confidence_percentage,
//                             backgroundColor: getSeverityColor(predictionResult.severity_level)
//                           }}
//                         ></div>
//                       </div>
//                     </div>

//                     <div className="severity-indicator">
//                       <p>Severity Level:
//                         <span
//                           style={{
//                             color: getSeverityColor(predictionResult.severity_level),
//                             fontWeight: 'bold',
//                             marginLeft: '5px'
//                           }}
//                         >
//                           {predictionResult.severity_level}
//                         </span>
//                       </p>
//                     </div>

//                     {predictionResult.recommendation && (
//                       <div className="recommendation">
//                         <h4>Recommendation:</h4>
//                         <p>{predictionResult.recommendation}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//       <ReactTooltip
//         id="ct-scan-tooltip"
//         place="bottom"
//         variant="info"
//         content="Save file as User_Name_CTScan"
//         openOnClick={true}
//         className="radio-tooltip"
//       />
//       <ReactTooltip
//         id="mri-tooltip"
//         place="bottom"
//         variant="info"
//         content="Save file as User_Name_MRI"
//         openOnClick={true}
//         className="radio-tooltip"
//       />
//       <ReactTooltip
//         id="x-ray-tooltip"
//         place="bottom"
//         variant="info"
//         content="Save file as User_Name_Xray"
//         openOnClick={true}
//         className="radio-tooltip"
//       />
//     </div>
//   );
// };

// export default ScanUploader;

// async function uploadMedicalScan(scanType, imageFile, options = {}) {
//   const endpoints = {
//     CTScan: "/predict/ct-scan/",
//     MRI: "/predict/mri/",
//     Xray: "/predict/xray/",
//   };
//   if (!endpoints[scanType]) {
//     throw new Error(
//       `Invalid scan type: ${scanType}. Must be one of: ${Object.keys(
//         endpoints
//       ).join(", ")}`
//     );
//   }

//   const baseUrl = "http://127.0.0.1:8000/api";
//   const url = `${baseUrl}${endpoints[scanType]}`;

//   // Create FormData to handle file upload
//   const formData = new FormData();
//   formData.append("image", imageFile);

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         ...options.headers,
//       },
//       body: formData,
//     });

//     // Check if request was successful
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         `API request failed with status ${response.status}: ${errorText}`
//       );
//     }

//     // Parse and return the JSON response
//     const data = await response.json();

//     // Validate that result property exists
//     if (!data.result) {
//       throw new Error('API response missing expected "result" property');
//     }

//     return data.result;
//   } catch (error) {
//     console.error(`Error uploading ${scanType}:`, error);
//     throw error;
//   }
// }

import React, { useState } from "react";
import "./ScanUploader.css";
import { FiAlertTriangle, FiUpload } from "react-icons/fi";
import { Tooltip as ReactTooltip } from "react-tooltip";
import toast from "react-hot-toast";
import { FaAngleDoubleRight } from "react-icons/fa";
// import { HiOutlineDownload } from "react-icons/hi";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import getBase64Image from "../utils/getBase64Image";

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
  // const [showTooltip, setShowTooltip] = useState(false);
  // const reportRef = useRef(null);
  const [predictionResult, setPredictionResult] = useState(null);

  const handleSelectedFile = (file) => {
    if (!selectedScan) {
      toast.error(
        "Oops! Looks like you haven't selected a scan type. Please select the type of scan first.",
        { style: { maxWidth: "700px" } }
      );
      return;
    }

    const validFormats = ["jpg", "jpeg", "dicom"];
    const fileType = file.name.split(".").pop().toLowerCase();

    if (!validFormats.includes(fileType)) {
      toast.error(
        "Oops! We only support JPG, JPEG, and DICOM files. Please try again.",
        { style: { maxWidth: "700px" } }
      );
      return;
    }

    // Store the original file for display purposes
    setFile(file);
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
      toast.error(
        "Oops! Looks like you haven't selected a scan type. Please select the type of scan first.",
        { style: { maxWidth: "700px" } }
      );
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

  // Function to prepare file for upload with proper naming convention
  const prepareFileForUpload = async (originalFile) => {
    if (!originalFile || !selectedScan || !formData.firstName) {
      return null;
    }

    // Create a new file name following the required pattern
    const fileExtension = originalFile.name.split(".").pop();
    const userName = `${formData.firstName.replace(
      /\s+/g,
      ""
    )}_${selectedScan}`;
    const newFileName = `${userName}.${fileExtension}`;

    // Create a new file with the correct name
    return new File([originalFile], newFileName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
  };

  const submitFinal = async () => {
    if (!isChecked) {
      toast.error("Please select the checkbox to proceed.", {
        style: { maxWidth: "700px" },
      });
      return;
    }

    try {
      // Prepare the file with proper naming convention
      const preparedFile = await prepareFileForUpload(file);

      if (!preparedFile) {
        toast.error("Error preparing file. Please try again.", {
          style: { maxWidth: "700px" },
        });
        return;
      }

      toast.success(`File renamed to ${preparedFile.name} for processing`, {
        style: { maxWidth: "700px" },
        duration: 2000,
      });

      const result = await uploadMedicalScan(selectedScan, preparedFile);
      setPredictionResult(result);
      console.log(result);
      setProgress(100);
      setStep(4);
    } catch (error) {
      toast.error("Error processing scan. Please try again.", {
        style: { maxWidth: "700px" },
      });
      console.error("Error submitting scan:", error);
    }
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

  // Get severity color based on severity level
  const getSeverityColor = (severity) => {
    if (!severity) return "#1890FF"; // Default blue

    switch (severity.toLowerCase()) {
      case "high":
        return "#FF4D4F"; // Red
      case "moderate":
      case "medium":
        return "#FAAD14"; // Orange
      case "low":
        return "#52C41A"; // Green
      case "none":
        return "#1890FF"; // Blue
      default:
        if (severity.toLowerCase().includes("low to moderate")) {
          return "#FAAD14"; // Orange
        }
        return "#1890FF"; // Default blue
    }
  };

  // Single function to render all results in one column
  const renderAllResults = () => {
    if (!predictionResult) return null;

    // Extract data depending on the selected scan type
    let diagnosis = "";
    let confidenceValue = "";
    let severityLevel = "";
    let medicalGuidance = "";
    let nextSteps = [];
    let probabilityChart = "";

    switch (selectedScan) {
      case "Xray":
        diagnosis = predictionResult.prediction;
        confidenceValue = predictionResult.confidence_percentage;
        severityLevel = predictionResult.severity_level;
        medicalGuidance = predictionResult.recommendation; // If you have a separate recommendation for Xray
        // nextSteps might be empty for Xray unless you have them
        break;

      case "CTScan":
        diagnosis = predictionResult.medical_guidance;
        confidenceValue = `${(predictionResult.confidence * 100).toFixed(2)}%`;
        severityLevel = predictionResult.severity_level;
        nextSteps = predictionResult.next_steps || [];
        probabilityChart = predictionResult.probability_chart || "";
        break;

      case "MRI":
        // For MRI, the predicted_class might be the diagnosis
        diagnosis = predictionResult.predicted_class?.replace(/_/g, " ");
        confidenceValue = `${(predictionResult.confidence * 100).toFixed(2)}%`;
        // Deduce severity from predicted_class
        severityLevel = predictionResult.predicted_class?.includes(
          "Non_Demented"
        )
          ? "None"
          : predictionResult.predicted_class?.includes("Mild")
          ? "Low"
          : predictionResult.predicted_class?.includes("Moderate")
          ? "Moderate"
          : "High";
        medicalGuidance = predictionResult.medical_guidance;
        nextSteps = predictionResult.next_steps || [];
        probabilityChart = predictionResult.probability_chart || "";
        break;

      default:
        // No recognized scan type
        return null;
    }

    return (
      <div className="prediction-results">
        <h3>Results ({selectedScan})</h3>
        <div className="results-list">
          <table>
            <tbody>
              {/* Diagnosis */}
              {diagnosis && (
                <tr>
                  <td>
                    <strong>Diagnosis:</strong>
                  </td>
                  <td>{diagnosis}</td>
                </tr>
              )}

              {/* Confidence */}
              {confidenceValue && (
                <tr>
                  <td>
                    <strong>Confidence Level:</strong>
                  </td>
                  <td>{confidenceValue}</td>
                </tr>
              )}

              {/* Severity */}
              {severityLevel && (
                <tr>
                  <td>
                    <strong>Severity Level:</strong>
                  </td>
                  <td>
                    <span
                      style={{
                        color: getSeverityColor(severityLevel),
                        fontWeight: "bold",
                      }}
                    >
                      {severityLevel}
                    </span>
                  </td>
                </tr>
              )}

              {/* Medical Guidance */}
              {medicalGuidance && (
                <tr>
                  <td>
                    <strong>Medical Guidance:</strong>
                  </td>
                  <td>{medicalGuidance}</td>
                </tr>
              )}

              {/* Next Steps */}
              {nextSteps.length > 0 && (
                <tr>
                  <td>
                    <strong>Next Steps:</strong>
                  </td>
                  <td>
                    <ul>
                      {nextSteps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Probability Chart moved out of the tabular layout */}
        {probabilityChart && (
          <div className="probability-chart-container">
            <p>
              <strong>Probability Distribution:</strong>
            </p>
            <img
              src={
                selectedScan === "CTScan"
                  ? `data:image/png;base64,${probabilityChart}`
                  : probabilityChart
              }
              alt="Probability Chart"
              className="probability-chart"
            />
          </div>
        )}
      </div>
    );
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
            <h3>
              <span style={{ color: "red" }}>*</span>
              <span>Select the type of scan</span>
            </h3>

            <label className="scan-label">
              <input
                type="radio"
                name="scanType"
                value="CTScan"
                onChange={(e) => setSelectedScan(e.target.value)}
              />
              CT Scan
            </label>
            <label className="scan-label">
              <input
                type="radio"
                name="scanType"
                value="MRI"
                onChange={(e) => setSelectedScan(e.target.value)}
              />
              MRI
            </label>
            <label className="scan-label">
              <input
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

      {/*{step === 4 && file && (
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
              
              {/* AI Prediction Results Section */}
      {/*{predictionResult && (
                <div className="prediction-results">
                  <h3>AI Analysis Results ({selectedScan})</h3>
                  
                  <div className="prediction-card">
                    {/* Primary information display */}
      {/*{renderPrimaryInfo()}
                    
                    {/* Confidence meter */}
      {/* {renderConfidenceMeter()}
                    
                    {/* Severity indicator */}
      {/* {renderSeverityIndicator()}
                    
                    {/* Recommendation section */}
      {/*} {renderRecommendation()}
                    
                    {/* Additional information specific to scan type */}
      {/*} {renderAdditionalInfo()} */}
      {/* </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )} */}

      {/*main rendering logic*/}
      {step === 4 && file && (
        <div className="result-container">
          <div className="left">
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded Scan"
              className="scan-image"
            />
          </div>
          <div className="right">
            <div className="report">
              <h2>Report</h2>

              {/* Patient Info */}
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

              {/* Single-column results layout */}
              {renderAllResults()}
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

async function uploadMedicalScan(scanType, imageFile, options = {}) {
  const endpoints = {
    CTScan: "/predict/ct-scan/",
    MRI: "/predict/mri/",
    Xray: "/predict/xray/",
  };
  if (!endpoints[scanType]) {
    throw new Error(
      `Invalid scan type: ${scanType}. Must be one of: ${Object.keys(
        endpoints
      ).join(", ")}`
    );
  }

  const baseUrl = "http://127.0.0.1:8000/api";
  const url = `${baseUrl}${endpoints[scanType]}`;

  // Create FormData to handle file upload
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...options.headers,
      },
      body: formData,
    });

    // Check if request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`
      );
    }

    // Parse and return the JSON response
    const data = await response.json();

    // Validate that result property exists
    if (!data.result) {
      throw new Error('API response missing expected "result" property');
    }

    return data.result;
  } catch (error) {
    console.error(`Error uploading ${scanType}:`, error);
    throw error;
  }
}
