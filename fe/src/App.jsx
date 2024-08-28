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


function App() {
  return (
    <Router>
      <Routes>
        <Route index path="" element={<Home />} />
        <Route  path="/signin" element={<SignIn />} />
        <Route  path="/signup" element={<SignUp />} />

      </Routes>
    </Router>
  )
}

export default App
