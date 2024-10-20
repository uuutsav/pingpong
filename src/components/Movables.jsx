import React from 'react'

const Movables = () => {
  return (
    <div className='h-full flex flex-row justify-between items-center'>
        <div id='p1' className='h-20 w-3 ml-3 bg-red-500'>

        </div>
        <div className="divide h-[100%] w-3 bg-gray-400">

        </div>
        <div id='p2' className='h-20 w-3 mr-3 bg-blue-500'>

        </div>
    </div>
  )
}

export default Movables