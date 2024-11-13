import React, { useEffect, useRef, useState } from 'react'
import Movables from './Movables'
import Ball from './Ball'

const Board = ({ start }) => {
    const pos = useRef();
    const [boardOffset, setBoardOffset] = useState({})
    const [boardRendered, setBoardRendered] = useState(false)

    useEffect(() => {
        setBoardOffset(pos.current.getBoundingClientRect())
        setBoardRendered(true);
    }, [])

    return (
        <div className='h-[500px] w-[900px] bg-black flex flex-col justify-between' ref={pos}>
            <div className="wall h-[11px] w-full bg-white">            </div>

            {boardRendered && start && <Movables boardOffset={boardOffset} start={start} />}

            <div className="wall h-[11px] w-full mt-full bg-white">            </div>
        </div>
    )
}

export default Board