import { BrowserRouter, Routes, Route } from "react-router-dom";


import './App.css'
import Headder from './components/Headder'
import LogIn from "./components/LogIn";


import Home from './pages/Home'
import About from './pages/About'
import Contacts from './pages/Contact'
import Traveling from './pages/Traveling'
import { useEffect, useState } from "react";

import { getTravels } from "./api/travelApi";



//first page sections: images, quote, the latest story with a date, maybe a globe as a map where you can click on a country and see the stories from that country, footer with social media links, and a copyright notice.



function App() {
  const [travels, setTravels] = useState([]);

    useEffect(() => {
        getTravels()
            .then(data => {
                setTravels(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

  return (
    <>
    <BrowserRouter>


      <Headder />
      <LogIn />


      <Routes>
        <Route path="/" element={<Home travels={travels}/>} />
        <Route path="/traveling" element={<Traveling travels={travels}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contacts />} />
      </Routes>
      <div className="footer">
        <p>&copy; 2024 Traveling Blog. All rights reserved.</p>
      </div>
    </BrowserRouter>
      
    </>
  )
}

export default App
