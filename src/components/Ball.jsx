import React, { useEffect, useRef, useState } from 'react'

const Ball = ({ start, boardOffset }) => {
    const startPosition = {
        x: ((boardOffset.left * 2) + boardOffset.width - 12) / 2,
        y: ((boardOffset.top * 2) + boardOffset.height - 12) / 2
    };

    const [position, setPosition] = useState(startPosition)
    const ballRef = useRef();

    let time = 40;
    let speed = 5;

    useEffect(() => {
        // move ball
        let intervalId;
        if (start){
            intervalId = continueGame();
        }
        console.log("rendered ", start)


        return () => stopGame(intervalId);
    }, [])

    const continueGame = () => {
        const intervalId = setInterval(() => {
            setPosition(prev => ({
                x: prev.x + speed,
                // y: prev.y + speed,
                y: prev.y,
            }));

            const ballPosition = {
                top: ballRef.current.offsetTop,
                right: ballRef.current.offsetLeft + ballRef.current.offsetWidth,
                bottom: ballRef.current.offsetTop + ballRef.current.offsetHeight,
                left: ballRef.current.offsetLeft,
            }

            // red loss - ball touches left border of the board
            if (ballPosition.left <= boardOffset.left) {
                stopGame(intervalId);
            }
            // blue loss - ball touches right border of the board
            if (ballPosition.right >= boardOffset.right) {
                stopGame(intervalId);
            }


            if (position.x > (boardOffset.left + boardOffset.width)) {
                console.log("ehe")
            }
        }, time)

        return intervalId;
    }

    const stopGame = (intervalId) => {
        clearInterval(intervalId)
        setPosition(startPosition);
    }

    return (
        <div className={`h-3 w-3 bg-green-200`}
            style={{
                position: `absolute`,
                left: position.x,
                top: position.y,
            }}
            ref={ballRef}
        >

        </div>
    )
}

export default Ball