import axios from 'axios'
import React, { useState } from 'react'
import { LogoutUserURL } from '../BackendServerLinks'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../Redux/User/userSlice'

const Header = () => {
  
  const navigate = useNavigate()
  const [internalError, setInternalError] = useState(null)

  const dispatch = useDispatch()

  async function handleLogout(){
    try {
      setInternalError(null)
      await axios.get(LogoutUserURL, {withCredentials:true})
      dispatch(logoutUser())
      navigate("/login")
    } catch (error) {
      setInternalError(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className='w-full h-16 bg-slate-900'>

        <div className=' w-[85%] h-full mx-auto flex justify-between items-center border-b border-gray-400 border-opacity-5'>

            <h1 className='text-2xl font-semibold text-white'>moco-todo.</h1>
            
            <div className='flex justify-center items-center gap-4'>
              {internalError && <h1 className='text-red-500'> {internalError} </h1>}
              <button onClick={handleLogout} className='bg-red-400 hover:bg-red-500 px-4 py-2 rounded-md font-medium text-white'>Logout</button>
            </div>

        </div>

    </div>
  )
}

export default Header