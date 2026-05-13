import React from 'react'
import loader from '/loader.gif'
const Loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center bg-black'>
      <img className='sm:h-[60%] object-cover' src={loader} alt="" />
    </div>
  )
}

export default Loading
