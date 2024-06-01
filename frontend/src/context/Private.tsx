// Private.tsx
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuthContext } from './auth';


function Private(props:any) {
  let userData;
  const {setUserId} = useAuthContext()
  const {Component} = props
  const data = localStorage.getItem("auth");
    if(data){
      const decoded_data = jwtDecode(data) as any
      if (decoded_data) {
        console.log(decoded_data)
        userData = decoded_data
        setUserId(decoded_data.userId)
      }
    }

  if (userData && userData.userId) {
    return <Component />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Private;
