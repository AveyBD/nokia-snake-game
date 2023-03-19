import React, { useState, useEffect } from "react";
import Snake from "./Snake";
import Food from "./Food";

const GameBoard = () => {
  const [snake, setSnake] = useState([{ x: 200, y: 200 }]);
  const [direction, setDirection] = useState("RIGHT");
  const getRandomPosition = () => {
    const min = 0;
    const maxCols = 40;
    const maxRows = 30;
    const randomX = Math.floor(Math.random() * (maxCols - min) + min) * 20;
    const randomY = Math.floor(Math.random() * (maxRows - min) + min) * 20;
    return { x: randomX, y: randomY };
  };

  const [food, setFood] = useState(getRandomPosition());
  //   const [food, setFood] = useState(getRandomPosition());
  const [score, setScore] = useState(0);

  const moveSnake = () => {
    const head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
      case "UP":
        head.y -= 20;
        break;
      case "DOWN":
        head.y += 20;
        break;
      case "LEFT":
        head.x -= 20;
        break;
      case "RIGHT":
        head.x += 20;
        break;
      default:
        break;
    }
    if (
      head.x < 0 ||
      head.x >= 800 ||
      head.y < 0 ||
      head.y >= 600 ||
      checkCollision(head)
    ) {
      gameOver();
      return;
    }
    const newSnake = [...snake];
    if (head.x === food.x && head.y === food.y) {
      setScore(score + 10);
      setFood(getRandomPosition());
      growSnake();
    } else {
      newSnake.pop();
    }
    newSnake.unshift(head);
    setSnake(newSnake);
  };

  const growSnake = () => {
    const newSnake = [...snake];
    newSnake.unshift({ ...newSnake[0] });
    setSnake(newSnake);
  };

  const checkCollision = (head) => {
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }
    return false;
  };

  const gameOver = () => {
    alert(`Game over! Your score is ${score}`);
    setSnake([{ x: 200, y: 200 }]);
    setDirection("RIGHT");
    setFood(getRandomPosition());
    setScore(0);
  };

  useEffect(() => {
    const timerId = setInterval(moveSnake, 100);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      clearInterval(timerId);
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowUp":
        if (direction !== "DOWN") {
          setDirection("UP");
        }
        break;
      case "ArrowDown":
        if (direction !== "UP") {
          setDirection("DOWN");
        }
        break;
      case "ArrowLeft":
        if (direction !== "RIGHT") {
          setDirection("LEFT");
        }
        break;
      case "ArrowRight":
        if (direction !== "LEFT") {
          setDirection("RIGHT");
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative h-screen bg-gray-800">
      <div className="flex items-center justify-center h-full">
        <div className="relative w-full h-full">
          <Snake snake={snake} />
          <Food food={food} />
        </div>
      </div>
      <div className="absolute top-0 right-0 m-4 text-white font-bold">
        Score: {score}
      </div>
    </div>
  );
};

export default GameBoard;
