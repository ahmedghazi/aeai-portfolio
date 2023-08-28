// "use client"
import React from "react";
import { getProjects } from "../utils/sanity-utils";

type Props = {};

const DotMatrix = async (props: Props) => {
  const projects = await getProjects();
  const length = projects.length + 12;
  const dots = [...Array(length).keys()];
  return (
    <div className='dot-matrix'>
      <div className='left'>
        {dots.map((item, i) => (
          <div className='item' key={i}>
            <div className='dot'></div>
          </div>
        ))}
      </div>
      <div className='right'>
        {dots.map((item, i) => (
          <div className='item' key={i}>
            <div className='dot'></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DotMatrix;
