// FileUpload.js
import { useState, useRef } from "react";
// import axios from 'axios';
import Papa from "papaparse";
import TableView from "./Common_Components/FileTableForUploadedCSV";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { MdDeleteForever } from "react-icons/Md";
import SkeletonLoader from "./Common_Components/SkeletonLoader";
import Loader from "./Common_Components/Loader";
import {toast} from 'react-toastify'
import { Typography } from "@mui/material";
// import {CloudUploadIcon} from 'react-icons';

// export default function ContactListUpload({ onFileUpload }) {
export default function CLUpload({onDataChange}) {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const MAX_FILE_SIZE = 1024 * 1024;
  // const [canUpload, setCanUpload] = useState(false);

  //   const handleFileChange = (e) => {
  //     const selectedFile = e.target.files[0];
  //     setFile(selectedFile);
  //   };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
      alert("File size exceeds the maximum allowed size.");
      return;
    } else if (selectedFile&&selectedFile.type !== "text/csv") {
      alert("Please select a CSV file.");
      return;
    }
    selectedFile&&setFile(selectedFile);
    return;
  };

  const handleParse = async () => {
    if (!file) return;
    const formData = new FormData();
    setIsUploading(true);
    formData.append("csvFile", file);


    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        setIsUploading(false);
        if (!result.data) {
          toast.error('Error parsing the CSV file')
          return;
        } else if (result.data.length > 25) {
          toast.error('Too many entries! Make sure that your contact list does not contain more than 5000 entries')
          return;
        } else if (Object.keys(result.data[0])[0]!=='phoneNumber' && Object.keys(result.data[0])[1]!=='everContacted') {
          // should add more checks in this if statement to make sure the file format is correct
          toast.error('Make sure your file matches the csv template format')
          return;
        } else {

        // console.log(Object.keys(result.data[0]))
        setCsvData(result.data);
        onDataChange(result.data);
        // !res.error?toast.success("User deleted successfully"):
        // Handle the parsed CSV data here
        // console.log(result.data[0])
        // console.log(result.data[0].keys)
        }

      },
      error: (error) => {
        console.error("CSV parsing error:", error.message);
        toast.error('Error parsing the CSV file')

      },
    });
  };


  // useEffect(() => {
  //   console.log('useEffect fired')
  //   file?setCanUpload(true):setCanUpload(false);
  // },[file])

  // const VisuallyHiddenInput = styled('input')({
  //     clip: 'rect(0 0 0 0)',
  //     clipPath: 'inset(50%)',
  //     height: 1,
  //     overflow: 'hidden',
  //     position: 'absolute',
  //     bottom: 0,
  //     left: 0,
  //     whiteSpace: 'nowrap',
  //     width: 1,
  //     });

  return (
    <>

      <Button
        component="label"
        sx={{m:2}}
        // size="medium"
        variant="outlined"
        onClick={() => fileInputRef.current.click()}
        // disabled={file!==null}
        hidden={file!==null}
      >
        Select a file
        {/* <VisuallyHiddenInput type="file" accept="csv" /> */}
      </Button>

      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <Button sx={{m:2}} color="success" variant="contained" onClick={handleParse} hidden={file===null||csvData.length!==0}>
        {isUploading ? <Loader /> : "Upload"}
      </Button>

      {/* <IconButton
        aria-label="delete"
        size="large" */}
        <Typography
        sx={{m:2, alignSelf: "center", fontStyle: "italic"}}
        hidden={file===null||csvData.length===0}> Review the list then hit Next at the bottom</Typography>
        <Button sx={{m:2}} color="error" variant="outlined"
        // disabled={file===null}
        hidden={file===null}
        // hidden={csvData.length ===0}
        onClick={() => {
            setCsvData([]); 
            setFile(null);
            onDataChange([])
            }}
      > {csvData.length!==0?'Clear all':'Choose another file'}
      </Button>
        {/* <MdDeleteForever fontSize="inherit" />
      </IconButton> */}

      {isUploading ? <SkeletonLoader /> : csvData.length>0&&<TableView data={csvData} />}
    </>
  );
}
