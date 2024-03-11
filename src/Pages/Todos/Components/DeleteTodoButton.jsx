import React from 'react'

const DeleteTodoButton = ({onClickFunction}) => {
  return (
    <button onClick={onClickFunction} className="px-6 py-4 bg-gray-300 hover:bg-red-500 rounded-md font-bold ">delete</button>
  )
}

export default DeleteTodoButton