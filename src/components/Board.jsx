import React from 'react'
import Movables from './Movables'
import Ball from './Ball'

const Board = () => {
    return (
        <div className='h-[500px] w-[900px] bg-black flex flex-col justify-between'>
            <div className="wall h-[11px] w-full bg-white">

            </div>
            <Movables />
            <Ball />
            <div className="wall h-[11px] w-full mt-full bg-white">

            </div>
        </div>
    )
}

export default Board