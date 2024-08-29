import React from 'react';
import { axiosInstToSv, urlPrefix } from '../../utils/axios.utils';
import { useNavigate } from 'react-router';

function SignUp() {
  const navigate = useNavigate()

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

  const handleGoogleSignUp = e => {
    e.preventDefault()
    window.open(`${urlPrefix}/api/user/google-signup/`)
    setTimeout(() => navigate('/signin'), 300)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input onChange={e => setEmail(e.target.value)} type="text" placeholder='email' /> <br />
      <input onChange={e => setPassword(e.target.value)} type="password" placeholder='password' /> <br />
      <input onChange={e => setCpassword(e.target.value)} type="password" placeholder='confirm password' /> <br />

      <button type='submit'>Sign Up</button>
      </form>
      <br /><br />
      OR{' '}
      <button onClick={handleGoogleSignUp}>sign up with google</button>
    </div>
  );
}

export default SignUp;