// FileUpload.js
import { useState , useRef} from 'react';
// import axios from 'axios';
import Papa from 'papaparse';
import TableView from '../screens/XTestFileTable';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {MdDeleteForever} from 'react-icons/Md';
import SkeletonLoader from './SkeletonLoader';
import Loader from './Loader';
// import {CloudUploadIcon} from 'react-icons';

// export default function ContactListUpload({ onFileUpload }) {
export default function ContactListUpload() {

  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const MAX_FILE_SIZE = 1024 * 1024

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//   };


  const handleFileChange = (e) => {

        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
            alert('File size exceeds the maximum allowed size.');
            return;
        }else if(selectedFile.type !== 'text/csv') {
            alert('Please select a CSV file.');
            return;
        }
        setFile(selectedFile);
    };


  


  const handleParse = async () => {
    if (!file) return;
    const formData = new FormData();
    setIsUploading(true);
    formData.append('csvFile', file);


    // try {
    //   const response = await axios.post('/upload-csv', formData);
    //   const data = Papa.parse(response.data, { header: true }).data;
    //   onFileUpload(data);
    // } catch (error) {
    //   console.error('Error uploading CSV:', error);
    // }

        Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
            setIsUploading(false);
            setCsvData(result.data);
            // Handle the parsed CSV data here
        },
        error: (error) => {
            console.error('CSV parsing error:', error.message);
        },
    });

  };

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
      {/* <input type="file"   onChange={handleFileChange} /> */}


    <IconButton aria-label="delete" size="large" onClick={()=>setCsvData([])}>
  <MdDeleteForever fontSize="inherit" />
</IconButton>
    {/* <Button variant="contained" onClick={()=>setCsvData([])}>X</Button> */}

    <Button component="label" size="medium" variant="outlined" onClick={() => fileInputRef.current.click()}>
    Upload file
    {/* <VisuallyHiddenInput type="file" accept="csv" /> */}
    </Button>
      
    <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    <Button variant="success" onClick={handleParse}>{isUploading?<Loader/>:'Parse'}</Button>

        {isUploading ? <SkeletonLoader/> :<TableView data={csvData} />}
    </>
  );
}









