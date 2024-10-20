import { useState } from 'react'
import './App.css'
import Board from './components/Board'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id='screen' className='w-[100vw] h-[100vh] bg-gray-500 flex flex-col justify-center items-center '>
      <div className="score text-7xl font-bold flex gap-20 text-white">
        <div className="red text-red-300">4</div>
        <div className="blue text-blue-300">2</div>
      </div>
      <Board />
    </div>
  )
}

export default App
