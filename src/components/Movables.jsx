import React, { useCallback, useEffect, useRef, useState } from 'react'
import Ball from './Ball'

const Movables = ({ boardOffset, start }) => {
    const [rendered, setRendered] = useState(false); // flag, to render something only once it's dependencies are loaded completely 
    const p1 = useRef()
    const p2 = useRef()
    const [p1Position, setP1Position] = useState(0);
    const [p2Position, setP2Position] = useState(0);

    const [p1Offset, setP1Offset] = useState({})
    const [p2Offset, setP2Offset] = useState({})

    const fnKeypress = useCallback((key) => {
        if (key.key == "ArrowUp") {
            if (p1Position > boardOffset.top) {
                setP1Position(prev => prev - 15)
            }
        }
        else if (key.key == "ArrowDown") {
            if ((p1Position + p1Offset.height) < boardOffset.bottom) {
                setP1Position(prev => prev + 15)
            }
        }
        else if (key.key == "w") {
            if (p2Position > boardOffset.top) {
                setP2Position(prev => prev - 15)
            }
        }
        else if (key.key == "s") {
            if ((p2Position + p2Offset.height) < boardOffset.bottom) {
                setP2Position(prev => prev + 15)
            }
        }
    }, [p1Position, p2Position])

    useEffect(() => {
        setP1Offset({
            top: p1.current.offsetTop,
            right: p1.current.offsetLeft + p1.current.offsetWidth,
            bottom: p1.current.offsetTop + p1.current.offsetHeight,
            left: p1.current.offsetLeft,
            height: p1.current.offsetHeight,
            width: p1.current.offsetWidth,
        })
        setP2Offset({
            top: p2.current.offsetTop,
            right: p2.current.offsetLeft + p2.current.offsetWidth,
            bottom: p2.current.offsetTop + p2.current.offsetHeight,
            left: p2.current.offsetLeft,
            height: p2.current.offsetHeight,
            width: p2.current.offsetWidth,
        })

        setRendered(true);
        setP1Position(boardOffset.bottom - (boardOffset.height / 2));
        setP2Position(boardOffset.bottom - (boardOffset.height / 2));
    }, [])

    useEffect(() => {
        // make players movable
        window.addEventListener("keydown", fnKeypress)

        return () => {
            window.removeEventListener("keydown", fnKeypress);
        }
    }, [fnKeypress])

    return (
        <div className='h-full flex flex-row justify-center items-center'>
            {rendered && <Ball boardOffset={boardOffset} start={start} p1Offset={p1Offset} p2Offset={p2Offset} />}

            {boardOffset && <div id='p1' className={`h-20 w-3 ml-3 bg-red-500`} ref={p2}
                style={{
                    position: `absolute`,
                    left: boardOffset.left + (15 - 12),
                    top: p2Position,
                }}
            >

            </div>}
            <div className="divide h-[100%] w-3 bg-gray-400">

            </div>
            <div id='p2' className={`h-20 w-3 mr-3 bg-blue-500`} ref={p1}
                style={{
                    position: `absolute`,
                    left: boardOffset.right - (15 + 12),
                    top: p1Position,
                }}
            >

            </div>
        </div>
    )
}

export default Movables