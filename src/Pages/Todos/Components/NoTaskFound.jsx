import React from 'react'

const NoTaskFound = () => {
  return (
    <div className="w-[83%] h-96 flex flex-col gap-4 justify-center items-center bg-slate-800 rounded-md text-white">
        <span className='text-2xl'>No Task Found</span>
        <span className='text-base text-gray-400 hover:text-white transition-all' >Click to Create</span>
    </div>
  )
}

export default NoTaskFound