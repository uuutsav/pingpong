import React, { useEffect, useRef, useState } from 'react'

const Ball = ({ start, boardOffset, p1Offset, p2Offset, p1Position, p2Position }) => {
    const startPosition = {
        x: ((boardOffset.left * 2) + boardOffset.width - 12) / 2,
        y: ((boardOffset.top * 2) + boardOffset.height - 12) / 2
    };

    const [position, setPosition] = useState(startPosition)
    const ballRef = useRef();

    let time = 15; //12.5 == 80FPS
    let speed = 5;
    let direction = { x: -0.5, y: 0.5 };

    useEffect(() => {
        // move ball
        let intervalId;
        if (start) {
            intervalId = continueGame();
        }

        return () => stopGame(intervalId);
    }, [])

    useEffect(() => {
        localStorage.setItem('p1Pos', p1Position) // Workaround to get updated value inside the setInterval block
        localStorage.setItem('p2Pos', p2Position)
    }, [p1Position, p2Position])

    const continueGame = () => {
        const intervalId = setInterval(() => {
            setPosition(prev => ({
                x: prev.x + (speed * direction.x),
                y: prev.y + (speed * direction.y),
            }));

            const ballPosition = {
                top: ballRef.current.offsetTop,
                right: ballRef.current.offsetLeft + ballRef.current.offsetWidth,
                bottom: ballRef.current.offsetTop + ballRef.current.offsetHeight,
                left: ballRef.current.offsetLeft,
            }

            checkCollision(ballPosition, intervalId);
        }, time)

        return intervalId;
    }

    const stopGame = (intervalId) => {
        clearInterval(intervalId)
        setPosition(startPosition);
    }

    const checkCollision = (ballPosition, intervalId) => {
        // red loss - ball touches left border of the board
        if (ballPosition.left <= boardOffset.left) {
            stopGame(intervalId);
        }
        // blue loss - ball touches right border of the board
        if (ballPosition.right >= boardOffset.right) {
            stopGame(intervalId);
        }

        // p1 hit the ball
        if (ballPosition.right >= p1Offset.left) {

            const player = parseInt(localStorage.getItem('p1Pos')) + boardOffset.top;
            if ((ballPosition.bottom > player && ballPosition.top < (player + p1Offset.height +15))) {
                // console.log("p1 hit the ball ", ballPosition, player)
                direction.x = direction.x * -1;
            } else {
                // console.log("p1 missed")
                stopGame(intervalId)
            }
        }

        // p2 hit the ball
        if (ballPosition.left <= p2Offset.right) {

            const player = parseInt(localStorage.getItem('p2Pos')) + boardOffset.top;
            if ((ballPosition.bottom > player && ballPosition.top < (player + p2Offset.height +15))) {
                // console.log("p2 hit the ball", ballPosition, player)
                direction.x = direction.x * -1;

            } else {
                // console.log("p2 missed", ballPosition, player)
                stopGame(intervalId)
            }
        }

        // ball hit board boundary
        if (ballPosition.bottom >= boardOffset.bottom){
            direction.y = direction.y * -1;
        }
        if (ballPosition.top <= boardOffset.top) {
            direction.y = direction.y * -1;
        }
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