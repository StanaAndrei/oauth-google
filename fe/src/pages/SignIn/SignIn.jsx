import React from 'react';
import { axiosInstToSv } from '../../utils/axios.utils';

function SignIn() {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('');
  
  const handleSubmit = e => {
    e.preventDefault()
    axiosInstToSv.post('/user/signin', {
      email, password
    }).then(res => {
      console.log(res);
      localStorage.setItem('auth_jwt', res.data)
    }).catch(err => {
      alert('ERROR')
      console.error(err);
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input onChange={e => setEmail(e.target.value)} type="text" placeholder='email' /> <br />
      <input onChange={e => setPassword(e.target.value)} type="password" placeholder='password' /> <br />
      <button type='submit'>Sign In</button>
      </form>

    </div>
  );
}

export default SignIn;