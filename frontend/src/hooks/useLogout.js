import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLogoutMutation } from '../store/slices/usersApiSlice';
import { logout } from '../store/slices/authSlice';


export default function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();


  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return { logoutHandler };
}