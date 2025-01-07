import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
    if (!(location?.state?.data?.success)) {
      navigate("/")
    }
  },[])

  console.log("resetPassword page", location);
  return (
    <div>
      ResetPassword
    </div>
  )
}

export default ResetPassword
