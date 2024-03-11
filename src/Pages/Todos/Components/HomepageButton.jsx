import React from 'react'

const HomepageButton = ({handelNavigateToHome}) => {
  return (
    <button onClick={handelNavigateToHome} className="px-6 py-4 bg-gray-300 hover:bg-blue-500 rounded-md font-bold">{`< home`}</button>
  )
}

export default HomepageButton