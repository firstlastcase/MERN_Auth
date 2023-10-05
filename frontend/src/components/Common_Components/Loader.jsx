import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader(props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress {...props}/>
    </Box>
  );
}
// import { Spinner } from 'react-bootstrap';
    // <Spinner
    //   animation='border'
    //   role='status'
    //   style={{
    //     width: '30px',
    //     height: '30px',
    //     margin: 'auto',
    //     display: 'block',
    //   }}
    // ></Spinner>
//   );
// };
