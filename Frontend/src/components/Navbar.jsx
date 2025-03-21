import React from 'react'

const Navbar = ({ setToken, setUserId }) => {
    return (
        <nav className='bg-gray-800 px-8 lg:px-20 py-4 flex items-center justify-between'>
            <ul className='text-2xl font-bold tracking-wide'>Mirza Todo</ul>
            <ul>
                <li className='bg-red-500 size-10 relative cursor-pointer rounded-full group'>

                    <img className='h-full w-full rounded-full object-contain' src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" alt="" />


                    <span className='hidden group-hover:flex bg-gray-700 absolute top-full right-0 px-10 w-40 py-6 z-50 mt-2 rounded-md shadow-lg flex-col'>
                        <button>Edit Profile</button>
                        <button onClick={() => { setToken(""); setUserId("") }} className='hover:bg-red-600 mt-4 bg-red-500 rounded-md py-1 '>Logout</button>
                    </span>

                </li>
            </ul>
        </nav>
    )
}

export default Navbar
