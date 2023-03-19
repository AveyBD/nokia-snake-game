import React from "react";

const CELL_SIZE = 20;

const Food = ({ food }) => {
  return (
    <div
      className="absolute bg-red-500"
      style={{ left: food.x, top: food.y, width: CELL_SIZE, height: CELL_SIZE }}
    />
  );
};

export default Food;
