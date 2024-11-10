import React, { useEffect, useRef, useState } from 'react'
import Ball from './Ball'

const Movables = ({ boardOffset, start }) => {
    const [rendered, setRendered] = useState(false);
    const p1 = useRef()
    const p2 = useRef()
    const [p1Offset, setP1Offset] = useState({})
    const [p2Offset, setP2Offset] = useState({})

    useEffect(() => {
        let temp = {
            top: p1.current.offsetTop,
            right: p1.current.offsetLeft + p1.current.offsetWidth,
            bottom: p1.current.offsetTop + p1.current.offsetTop,
            left: p1.current.offsetLeft,
            height: p1.current.offsetHeight,
            width: p1.current.offsetWidth,
        }
        setP1Offset(temp)
        temp = {
            top: p2.current.offsetTop,
            right: p2.current.offsetLeft + p2.current.offsetWidth,
            bottom: p2.current.offsetTop + p2.current.offsetTop,
            left: p2.current.offsetLeft,
            height: p2.current.offsetHeight,
            width: p2.current.offsetWidth,
        }
        setP2Offset(temp)
        console.log("p1: ", p1Offset, p2Offset)
        setRendered(true);
    }, [])
    return (
        <div className='h-full flex flex-row justify-between items-center'>
            {rendered && <Ball boardOffset={boardOffset} start={start} p1Offset={p1Offset} p2Offset={p2Offset} />}

            <div id='p1' className='h-20 w-3 ml-3 bg-red-500' ref={p2}>

            </div>
            <div className="divide h-[100%] w-3 bg-gray-400">

            </div>
            <div id='p2' className='h-20 w-3 mr-3 bg-blue-500' ref={p1}>

            </div>
        </div>
    )
}

export default Movables