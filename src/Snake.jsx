import React from "react";

const CELL_SIZE = 20;

const Snake = ({ snake }) => {
  return (
    <>
      {snake.map((cell, index) => (
        <div
          key={index}
          className="absolute bg-green-500"
          style={{
            left: cell.x,
            top: cell.y,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
        />
      ))}
    </>
  );
};

export default Snake;
