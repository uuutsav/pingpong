import React, { useEffect, useRef, useState } from 'react'
import Movables from './Movables'
import Ball from './Ball'

const Board = () => {
    const pos = useRef();
    const [boardOffset, setBoardOffset] = useState({})

    useEffect(() => {
        if (Object.keys(boardOffset).length == 0) {
            setBoardOffset({
                top: pos.current.offsetTop,
                right: pos.current.offsetLeft + pos.current.offsetWidth,
                bottom: pos.current.offsetTop + pos.current.offsetTop,
                left: pos.current.offsetLeft,
                height: pos.current.offsetHeight,
                width: pos.current.offsetWidth,
            })
        }
    }, [boardOffset])

    return (
        <div className='h-[500px] w-[900px] bg-black flex flex-col justify-between' ref={pos}>
            <div className="wall h-[11px] w-full bg-white">            </div>

            <Movables />
            {Object.keys(boardOffset).length > 0 && <Ball boardOffset={boardOffset} />}

            <div className="wall h-[11px] w-full mt-full bg-white">            </div>
        </div>
    )
}

export default Board