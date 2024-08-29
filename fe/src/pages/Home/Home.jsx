
function Home() {
  return (
    <div>
      Home
      <p>
        A simple app to prove google sign in/up using oauth2!
      </p>
      <p>
        <a href="/signin">Sign In</a>
      </p>
      <p>
        <a href="/signup">Sign Up</a>
      </p>
      <p>
        <a href="/me">ME</a>
      </p>
      {localStorage.getItem('auth_jwt') && <button onClick={() => { 
        localStorage.removeItem('auth_jwt')
        window.location.reload()
      }}>logout</button>}
    </div>
  );
}

export default Home;