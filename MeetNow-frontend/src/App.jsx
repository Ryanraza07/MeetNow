import { useState } from 'react'
import Landingpage from './landing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from 'react';
import Authentication from './authentication';
import { AuthProvider } from './context/AuthContext';
import VideoMeetComponent from './videomeet';
import HomeComponent from './home';
import History from './history';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Landingpage/>} />
        <Route path='/auth' element ={<Authentication/>} />
        <Route path='/home' element ={<HomeComponent/>}/>
        <Route path='/history' element ={<History />}/>
        <Route path='/:url' element ={<VideoMeetComponent/>} />
        
      </Routes>
       </AuthProvider>
    </Router>
   
    </>
  )
}

export default App

