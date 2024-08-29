//import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  //Navigate
} from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Me from "./pages/Me/Me";
import OauthSuccess from "./pages/OauthSuccess/OauthSuccess";


function App() {
  return (
    <Router>
      <Routes>
        <Route index path="" element={<Home />} />
        <Route  path="/signin" element={<SignIn />} />
        <Route  path="/signup" element={<SignUp />} />
        <Route  path="/me" element={<Me />} />
        <Route  path="/oauth-done" element={<OauthSuccess />} />

      </Routes>
    </Router>
  )
}

export default App
