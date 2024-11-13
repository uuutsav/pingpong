import React, { useCallback, useEffect, useRef, useState } from 'react'
import Ball from './Ball'

const Movables = ({ boardOffset, start }) => {
    const p1 = useRef()
    const p2 = useRef()
    const [p1Position, setP1Position] = useState(0);
    const [p2Position, setP2Position] = useState(0);
    const [p1Offset, setP1Offset] = useState({})
    const [p2Offset, setP2Offset] = useState({})
    const [rendered, setRendered] = useState(false);
    let movement = 30;

    const fnKeypress = useCallback((key) => {
        if (key.key == "ArrowUp") {
            if (p1Position > 0) {
                setP1Position(prev => prev - movement)
            }
        }
        else if (key.key == "ArrowDown") {
            if ((p1Position + p1Offset.height + 15) < boardOffset.height) {
                setP1Position(prev => prev + movement)
            }
        }
        else if (key.key == "w") {
            if (p2Position > 0) {
                setP2Position(prev => prev - movement)
            }
        }
        else if (key.key == "s") {
            if ((p2Position + p2Offset.height) < boardOffset.height) {
                setP2Position(prev => prev + movement)
            }
        }
    }, [p1Position, p2Position])

    useEffect(() => {
        setP1Offset(p1.current.getBoundingClientRect())
        setP2Offset(p2.current.getBoundingClientRect())

        setP1Position(boardOffset.height / 2 - (p1.current.offsetHeight / 2));
        setP2Position(boardOffset.height / 2 - (p2.current.offsetHeight / 2));
        setRendered(true)
    }, [])

    useEffect(() => {
        // make players movable
        window.addEventListener("keydown", fnKeypress)

        return () => {
            window.removeEventListener("keydown", fnKeypress);
        }
    }, [fnKeypress])

    return (
        <div className='h-full flex justify-between'>
            {rendered && <Ball boardOffset={boardOffset} start={start} p1Offset={p1Offset} p2Offset={p2Offset} p1Position={p1Position} p2Position={p2Position} />}

            <div id='p2' className={`h-24 w-3 ml-3 bg-red-500`} ref={p2}
                style={{
                    position: 'relative',
                    top: p2Position,
                }}
            ></div>

            <div className="divide h-[100%] w-3 bg-gray-400"></div>

            <div id='p1' className={`h-24 w-3 mr-3 bg-blue-500`} ref={p1}
                style={{
                    position: 'relative',
                    top: p1Position,
                }}
            ></div>
        </div>
    )
}

export default Movables