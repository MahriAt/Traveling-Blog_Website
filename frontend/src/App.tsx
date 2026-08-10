import { BrowserRouter, Routes, Route } from "react-router-dom";


import './App.css'
import Headder from './components/Headder'



import Home from './pages/Home'
import About from './pages/About'
import Contacts from './pages/Contact'
import Traveling from './pages/Traveling'
import { useEffect, useState } from "react";

import { getTravels } from "./api/travelApi";
import { getAuthorSession } from "./data/constants";




//first page sections: images, quote, the latest story with a date, maybe a globe as a map where you can click on a country and see the stories from that country, footer with social media links, and a copyright notice.



function App() {
  const [travels, setTravels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthor, setIsAuthor] = useState<boolean | null>(() => {
    const userType = localStorage.getItem("userType");

    if (userType === "author" && getAuthorSession()) {
        return true;
    }

    if (userType === "visitor") {
        return false;
    }

    return null;
  });

    useEffect(() => {
        getTravels()
            .then(data => {
                setTravels(data);
            })
            .catch(error => {
                console.error(error);
            }).finally(() => {
                setLoading(false);
              });
    }, []);
    if (loading) {
      return <div className="loading">Loading...</div>;
    }

  return (
    <>
    <BrowserRouter>


      <Headder />


      <Routes>
        
        <Route path="/" element={<Home travels={travels} isAuthor={isAuthor} setIsAuthor={setIsAuthor}/>} />
        <Route path="/traveling" element={<Traveling travels={travels} isAuthor={isAuthor}/>} />
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
