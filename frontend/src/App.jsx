import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import Navbar from "./components/Navbar/Navbar"
import Signup from "./pages/Signup/Signup"
import Login from "./pages/Login/Login"
import Profile from "./pages/Profile/Profile"

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </>
  )
}

export default App
