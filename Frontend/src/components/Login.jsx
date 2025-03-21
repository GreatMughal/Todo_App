import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { backendURL } from '../App'

const Login = ({ setToken, setUserId }) => {
    const [toggle, setToggle] = useState("Login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate()

    const submitHandlerLogin = async (e) => {
        e.preventDefault();
        try {
            if (!email || !password) {
                toast.error("Enter all fields.")
                return;
            }
            if (password.length < 8) {
                toast.error("Password must be 8 characters.")
                return;
            }
            const response = await axios.post(backendURL + "/api/v1/users/login", {
                email,
                password
            })

            if (response.data.success) {
                toast.success(response.data.message);
                setToken(response.data.token);
                setUserId(response.data.userId)
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }

    }

    const submitHandlerRegister = async (e) => {
        e.preventDefault();
        try {
            if (!name || !email || !password) {
                toast.error("Enter all fields.")
                return;
            }
            if (password.length < 8) {
                toast.error("Password must be 8 characters.")
                return;
            }
            const response = await axios.post(backendURL + "/api/v1/users/register", {
                name,
                email,
                password
            })

            if (response.data.success) {
                toast.success(response.data.message);
                setToken(response.data.token)
                setUserId(response.data.userId)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }

    }


    return (
        <>
            {
                toggle === "Login" ? (<div className='w-full h-screen bg-gray-900 text-white flex items-center justify-center'>
                    <form onSubmit={submitHandlerLogin} className='w-full md:w-1/2 lg:w-1/3 bg-gray-800 rounded-md shadow-lg p-10'>
                        <h3 className='text-3xl text-center capitalize mb-6'>Login First</h3>
                        <div className='w-full flex flex-col gap-2'>
                            <label className='text-gray-200' htmlFor="email">
                                Enter Email:
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id='email'
                                    placeholder='eg. demo@demo.com'
                                    className='w-full text-black bg-gray-700 rounded-md px-4 py-2'
                                    type="email"
                                />
                            </label>
                            <label className='text-gray-200 mt-3' htmlFor="password">
                                Enter Password
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id='password'
                                    placeholder='eg. Password'
                                    className='w-full text-black bg-gray-700 rounded-md px-4 py-2'
                                    type="password"
                                />
                            </label>
                        </div>
                        <button className='w-full bg-blue-500 py-2 mt-3 rounded-md shadow-md'>Login Now</button>
                        <p onClick={() => setToggle("Signup")} className='mt-3 text-center font-normal cursor-pointer'>Don't have an account <strong className='text-blue-500'>Sign In</strong></p>
                    </form>
                </div>)


                    :


                    (<div className='w-full h-screen bg-gray-900 text-white flex items-center justify-center'>
                        <form onSubmit={submitHandlerRegister} className='w-full md:w-1/2 lg:w-1/3 bg-gray-800 rounded-md shadow-lg p-10'>
                            <h3 className='text-3xl text-center capitalize mb-6'>Sign Up First</h3>
                            <div className='w-full flex flex-col gap-2'>
                                {
                                    toggle === "Signup" && (
                                        <label className='text-gray-200' htmlFor="name">
                                            Enter Name:
                                            <input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                id='name'
                                                placeholder='eg. JohnDoe'
                                                className='w-full text-black bg-gray-700 rounded-md px-4 py-2'
                                                type="text"
                                            />
                                        </label>)
                                }
                                <label className='text-gray-200' htmlFor="email">
                                    Enter Email:
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        id='email'
                                        placeholder='eg. demo@demo.com'
                                        className='w-full text-black bg-gray-700 rounded-md px-4 py-2'
                                        type="email"
                                    />
                                </label>
                                <label className='text-gray-200' htmlFor="password">
                                    Enter Password
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        id='password'
                                        placeholder='eg. Password'
                                        className='w-full text-black bg-gray-700 rounded-md px-4 py-2'
                                        type="password"
                                    />
                                </label>
                            </div>
                            <button className='w-full bg-blue-500 py-2 mt-3 rounded-md shadow-md'>Create Account</button>
                            <p onClick={() => setToggle("Login")} className='mt-3 text-center font-normal cursor-pointer'>Have an account <strong className='text-blue-500'>Log In</strong></p>
                        </form>
                    </div>)
            }
        </>
    )
}

export default Login
