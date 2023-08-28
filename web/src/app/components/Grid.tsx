import React from "react";

type Props = {
  length: number;
  color: string;
};

const Grid = ({ length = 6, color = "yellow" }: Props) => {
  const rows = [...Array(length).keys()];
  const style = { "--color": color } as React.CSSProperties;

  return (
    <div className='grid-dbg absolute inset-0 pt-sm-' style={style}>
      {rows.map((item, i) => (
        <div className='_row b-b-' key={i}></div>
      ))}
    </div>
  );
};

export default Grid;
