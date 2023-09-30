import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function SkeletonLoader({lines=3, width='full', height=45}) {

// width could be specified in numbers e.g. 300 etc..
  return (

    <Box sx={{ width }}>
        <Skeleton animation="wave" height={height}/>
        <Skeleton animation="wave" height={height}/>
        <Skeleton animation="wave" height={height}/>
        {lines===4&&<Skeleton animation="wave" height={height}/>}
        {lines===5&&<>
          <Skeleton animation="wave" height={height}/> 
          <Skeleton animation="wave" height={height}/>
        </>
        }

    </Box>
  );
}