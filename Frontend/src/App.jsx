import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'

export const backendURL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "")
  const [userId, setUserId] = useState(localStorage.getItem("user") ? localStorage.getItem("user") : "")

  useEffect(() => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", userId)
    
  }, [token, userId])
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className='bg-gray-950'>
        {
          token === "" && userId === ""
            ? <Login setUserId={setUserId} setToken={setToken} />
            : <>
              <Navbar setToken={setToken} setUserId={setUserId} />
              <Routes>
                <Route path='/' element={<Home userId={userId} setUserId={setUserId} token={token} setToken={setToken} />} />

              </Routes>
              <Footer />
            </>
        }
      </div>
    </>
  )
}

export default App
