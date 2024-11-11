import React, { useEffect, useRef, useState } from 'react'

const Ball = ({ start, boardOffset, p1Offset, p2Offset }) => {
    const startPosition = {
        x: ((boardOffset.left * 2) + boardOffset.width - 12) / 2,
        y: ((boardOffset.top * 2) + boardOffset.height - 12) / 2
    };

    const [position, setPosition] = useState(startPosition)
    const ballRef = useRef();

    let time = 15; //12.5 == 80FPS
    let speed = 8;
    let direction = { x: 1, y: 0.5 };

    useEffect(() => {
        // move ball
        let intervalId;
        if (start) {
            intervalId = continueGame();
        }
        console.log("rendered ", start)


        return () => stopGame(intervalId);
    }, [])

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
            if ((ballPosition.bottom > p1Offset.top && ballPosition.top < p1Offset.bottom)) {
                console.log("p1 hit the ball")
                direction.x = direction.x * -1;
            } else {
                console.log("p1 missed")
                stopGame(intervalId)
            }
        }

        // p2 hit the ball
        if (ballPosition.left <= p2Offset.right) {
            if ((ballPosition.bottom > p2Offset.top && ballPosition.top < p2Offset.bottom)) {
                console.log("p2 hit the ball")
                direction.x = direction.x * -1;

            } else {
                console.log("p2 missed")
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