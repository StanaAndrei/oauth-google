import React from 'react';
import { axiosAuthInstToApi } from './../../utils/axios.utils';

function Me() {
  
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    axiosAuthInstToApi.get('/user/me').then(res => {
      delete res.data.password
      setUser(res.data)
    }).catch(err => {
      alert('error')
      console.error(err);
    })
  }, [])

  return (
    <div>
      {
        user && JSON.stringify(user)
      }
    </div>
  );
}

export default Me;