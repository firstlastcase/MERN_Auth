import {Navigate, Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'



export default function RouteSA(){
  const {userInfo} = useSelector(state=>state.auth)

  let content;
  if(!userInfo){
    content = <Navigate to="/login" replace/>
  }else if(userInfo.role.toString() !== import.meta.env.VITE_SA_ROLE){
    content = <Navigate to="/404"/>
  }else{
    content = <Outlet/>
  }
  return content
}

