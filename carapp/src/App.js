import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import About from "./About";
import './App.css';
import Booking from "./Booking";
import Confirmation from "./Confirmation";
import Safety from "./Safety";
import Blog from "./Blog";
import Contact from "./Contact";
import Admin from "./Admin";
import Driverlogin from "./Driverlogin";
import Driver from "./Driver";
function App() {
     const [user, setUser] = useState(null);
  return (
   <BrowserRouter>
      <Routes>
         <Route path="/" element={<Main user={user} />} />
         <Route path="/home" element={< Home  user={user} />} />
        <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/about" element={<About user={user} />} />
        <Route path="/register" element={<Register  />} />
        <Route path="/booking" element={<Booking user={user}/>} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/safety" element={<Safety user={user} />} />
       <Route path="/blog" element={<Blog user={user} />} />
      <Route path="/contact" element={<Contact user={user} />} />
     <Route path="/admin" element={<Admin />} />
     <Route path="/driver/login" element={<Driverlogin />} />
     <Route path="/driver" element={<Driver />} />

      </Routes>
    </BrowserRouter>


  );
}

export default App;
