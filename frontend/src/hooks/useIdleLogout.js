import useLogout from './useLogout';
import { toast } from'react-toastify';


export default function useIdleLogout() {
     const {logoutHandler} = useLogout();
    // logout on inactivity
    const handleTimeout = ()=>{
        logoutHandler()
        toast.info('User logged out due to inactivity', {
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        progress: undefined,
        });
    } 

  return { handleTimeout };
}