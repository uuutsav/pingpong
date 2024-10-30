import { useEffect, useRef, useState } from 'react'
import './App.css'
import Board from './components/Board'

function App() {
  const [start, setStart] = useState(false);
  const startRef = useRef();

  const handleClick = () => {
    setStart(prev => !prev)
  }

  return (
    <div id='screen' className='w-[100vw] h-[100vh] bg-gray-500 flex flex-col justify-center items-center '>
      <div
        id='startScreen'
        className='absolute bg-black opacity-70 h-full w-full flex items-center'
        ref={startRef}
        onMouseDown={handleClick} 
      >
        {!start && <h1 className='text-white text-[5rem] text-center w-full'>
          Click to start
        </h1>}

      </div>
      <div className="score text-7xl font-bold flex gap-20 text-white">
        <div className="red text-red-300">4</div>
        <div className="blue text-blue-300">2</div>
      </div>
      <Board start={start} />
    </div>
  )
}

export default App
