import React from "react";

const ColorCard = (props: { color: string, handleSelect: (selectedColor: string) => void, selectedColor: string}) => {
  return (
    <div className={`color-badge hover:bg-black ${props.selectedColor === props.color && "bg-black"}`}>
      <div
        className='absolute  w-[70%] border-[1px] border-grayish h-[70%]'
        style={{ backgroundColor: props.color }}
        onClick={() => props.handleSelect(props.color)}
      >
      </div>
    </div>
  );
};

export default ColorCard;
