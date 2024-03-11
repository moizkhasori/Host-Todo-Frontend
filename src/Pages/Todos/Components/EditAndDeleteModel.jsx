import React from 'react'

const EditAndDeleteModel = ({openClose3Dots,openThreeDots,deleteCard, modalRef, _id, onClickFunction}) => {

  

  return (
    <div className="mr-4 mt-1 relative">
    <div
      
      ref={modalRef}
      className={
        openThreeDots
          ? "bg-slate-900 absolute z-10 top-5 right-5 rounded-md flex flex-col gap-2 p-4 justify-start items-start"
          : "hidden"
      }
    >
      <span className="px-4 py-2 bg-white hover:bg-gray-200 w-28 rounded-md cursor-pointer" onClick={onClickFunction}>
        Edit
      </span>
      <span className="px-4 py-2 bg-white hover:bg-gray-200 w-28 rounded-md cursor-pointer" onClick={() => deleteCard(_id)}>
        Delete
      </span>
    </div>
    <svg
      onClick={openClose3Dots}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 512"
      className="w-6 h-6 fill-gray-600 hover:fill-black"
    >
      <path
        d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"
        id="mainIconPathAttribute"
      ></path>
    </svg>
  </div>
  )
}

export default EditAndDeleteModel