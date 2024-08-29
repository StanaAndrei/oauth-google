import React from 'react';
import { axiosInstToSv, urlPrefix } from '../../utils/axios.utils';
import { useNavigate } from 'react-router';

function SignIn() {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate()

  React.useEffect(() => {
    if (localStorage.getItem('auth_jwt')) {
      navigate('/')
    }
  }, [navigate])
  
  const handleSubmit = e => {
    e.preventDefault()
    axiosInstToSv.post('/user/signin', {
      email, password
    }).then(res => {
      localStorage.setItem('auth_jwt', res.data)
      window.location.reload()
    }).catch(err => {
      alert('ERROR')
      console.error(err);
    })
  }
  const handleGoogleSignIn = e => {
    e.preventDefault()
    window.open(`${urlPrefix}/api/user/google-signin/`, '_self')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input onChange={e => setEmail(e.target.value)} type="text" placeholder='email' /> <br />
      <input onChange={e => setPassword(e.target.value)} type="password" placeholder='password' /> <br />
      <button type='submit'>Sign In</button>
      </form>
      <br /><br />
      OR{' '}
      <button onClick={handleGoogleSignIn}>sign in with google</button>
    </div>
  );
}

export default SignIn;