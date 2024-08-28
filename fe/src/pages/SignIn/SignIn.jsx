import React from 'react';
import { axiosInstToSv } from '../../utils/axios.utils';

function SignIn() {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('');
  
  const handleSubmit = e => {
    e.preventDefault()
    console.log(email, password);
    axiosInstToSv.post('/user/signin', {
      email, password
    }).then(res => {
      console.log(res);
      
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