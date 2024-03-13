import React, { useEffect, useState } from 'react';

const MyGrid = ({row, col, size}) => {
  const selectedCell = {col: col-1, row: row-1}
  
  console.log(size);
  
  return (
    <div className="flex flex-col gap-2 flex-nowrap w-[90%] mx-auto my-5">
      {Array.from({ length: `${size}` }).map((_, rowIndex) => (
        <div className="flex gap-2 flex-wrap" key={rowIndex}>
          {Array.from({ length: `${size}` }).map((_, colIndex) => (
            <div
              className={`cell p-2 border border-[#ccc] cursor-pointer ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                  ? 'bg-primary'
                  : 'bg-[#c2c2c2]'
                } w-[40px] h-[20px] mx-auto`}
              key={colIndex}              
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyGrid;
