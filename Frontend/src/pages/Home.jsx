import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { backendURL } from '../App'

const Home = ({ userId, setUserId, setToken, token }) => {
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [uptitle, setUpTitle] = useState("")
    const [check, setCheck] = useState(false)
    const [update, setUpdate] = useState(false)
    const [todos, setTodos] = useState([])

    const getAllTodos = async () => {
        try {
            const response = await axios.get(backendURL + "/api/v1/todos/all-todos", {
                params: { id: userId },
                headers: { token }
            });

            if (response.data.success) {
                setTodos(response.data.todos);
                // console.log(response.data.todos);
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Todos not found initially.")
        }
    }

    const createTodo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                backendURL + "/api/v1/todos/create-todo",
                { title }, // data (request body)
                {
                    headers: { token } // OR Authorization header if your backend expects it
                }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                setCheck(false)
                getAllTodos();
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error.message);
            toast.error("Todo not created.")
        }
    }

    const updateTodo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                backendURL + "/api/v1/todos/update-todo",
                {
                    id: id,  // Make sure you're passing the todo ID!
                    title: uptitle
                },
                {
                    headers: { token } // Or Authorization: `Bearer ${token}`
                }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                setUpdate(false);
                getAllTodos();
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error.message);
            toast.error("Todo not updated.");
        }
    };

    const deleteTodo = async (todoId) => {
        try {
            const response = await axios.delete(
                `${backendURL}/api/v1/todos/delete-todo`,
                {
                    params: { id: todoId },
                    headers: { token }
                }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                getAllTodos(); // Refresh todos after deletion
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error.message);
            toast.error("Todo  deleted error.");
        }
    };




    useEffect(() => {
        getAllTodos()
        console.log(id);

    }, [userId, token])
    return (
        <>
            <div className='bg-gray-900 min-h-screen relative text-white px-8 lg:px-20 py-4'>
                <div className='flex items-center justify-between'>
                    <h3 className='tracking-wide text-xl lg:text-3xl text-gray-400'>Your All Todos</h3>

                    <button onClick={() => setCheck(true)} className='bg-blue-500 px-5 py-2 rounded-md shadow-md'>Create Todo</button>
                </div>
                <div className='mt-10 flex flex-col gap-2'>
                    {/* Todo Item */}
                    {
                        todos.map((item, index) => (
                            <div key={index} className='bg-gray-700 px-3 py-4 rounded-md shadow-md flex items-center justify-between'>
                                <span className='ml-4 text-xl tracking-wide text-gray-300'>{item.title}</span>
                                <div className='flex items-center gap-3'>
                                    <button onClick={() => { setUpdate(true); setId(item._id) }} className='bg-green-500 hover:bg-green-600 p-2 rounded-md shadow-md'>
                                        <svg className='size-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg>
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this todo?")) {
                                                deleteTodo(item._id);
                                            }

                                        }}
                                        className='bg-red-500 hover:bg-red-600 p-2 rounded-md shadow-md'
                                    >
                                        <svg className='size-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path>
                                        </svg>
                                    </button>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                check && <>
                    <div className='absolute bg-[#00000094] select-none h-full w-full flex items-center justify-center top-0 left-0'>
                        <form onSubmit={createTodo} className='w-full md:w-1/2 lg:w-1/3 px-10 border border-gray-900 py-10 bg-gray-700 rounded-md shadow-xl'>
                            <div className='flex items-center justify-between'>
                                <h3 className='text-xl'>Create Todo</h3>
                                <button onClick={() => setCheck(false)}>
                                    <svg className='size-6 text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                                </button>
                            </div>
                            <input
                                placeholder='Enter Todo'
                                className='w-full px-4 py-2 text-black rounded-md mt-10'
                                type="text"
                                value={title}
                                required
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <div className='bg--400 mt-3 flex items-center justify-end'>
                                <button type='submit' className='px-10 py-2 rounded-md shadow-md bg-blue-500'>Add</button>
                            </div>
                        </form>
                    </div>
                </>
            }

            {
                update && <>
                    <div className='absolute bg-[#00000094] select-none h-full w-full flex items-center justify-center top-0 left-0'>
                        <form onSubmit={updateTodo} className='w-full md:w-1/2 lg:w-1/3 px-10 border border-gray-900 py-10 bg-gray-700 rounded-md shadow-xl'>
                            <div className='flex items-center justify-between'>
                                <h3 className='text-xl'>Update Todo</h3>
                                <button onClick={() => { setUpdate(false); setId("") }}>
                                    <svg className='size-6 text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                                </button>
                            </div>
                            <input
                                placeholder='Enter Todo'
                                className='w-full px-4 py-2 text-black rounded-md mt-10'
                                type="text"
                                value={uptitle}
                                onChange={(e) => setUpTitle(e.target.value)}
                            />
                            <div className='bg--400 mt-3 flex items-center justify-end'>
                                <button className='px-10 py-2 rounded-md shadow-md bg-blue-500'>Update</button>
                            </div>
                        </form>
                    </div>
                </>
            }


        </>
    )
}

export default Home
