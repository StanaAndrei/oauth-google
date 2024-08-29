import React from 'react';
import { useNavigate } from 'react-router-dom';

function OauthSuccess() {
  const navigate = useNavigate()

  React.useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get('token')
    if (token) {
      localStorage.setItem('auth_jwt', token)
      navigate('/')
    } else {
      navigate('/login')
    }
  }, [navigate])

  return null
}

export default OauthSuccess;