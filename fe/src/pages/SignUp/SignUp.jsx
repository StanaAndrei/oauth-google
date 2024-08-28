import React from 'react';
import { axiosInstToSv } from '../../utils/axios.utils';

function SignUp() {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('');
  const [cpassword, setCpassword] = React.useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (password !== cpassword) {
      return alert('Passwords must match!')
    }
    axiosInstToSv.post('/user/signup', {
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
      <input onChange={e => setCpassword(e.target.value)} type="password" placeholder='confirm password' /> <br />

      <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;