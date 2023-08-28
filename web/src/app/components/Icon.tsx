"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {};

const Icon = (props: Props) => {
  const [rotation, setTotation] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    document.body.addEventListener("mousemove", _handleMousemove, false);

    return () =>
      document.body.removeEventListener("mousemove", _handleMousemove, false);
  }, []);

  const _handleMousemove = (event: MouseEvent) => {
    // console.log(event);
    const { clientX, clientY } = event;
    if (!ref.current) return;

    const width = ref.current.getBoundingClientRect().width / 2;
    const height = ref.current.getBoundingClientRect().height / 2;

    const centerX = ref.current.getBoundingClientRect().x + width;
    const centerY = ref.current.getBoundingClientRect().y + height;

    const diffX = clientX - centerX;
    const diffY = clientY - centerY;

    const radians = Math.atan2(diffX, diffY);
    const degree = radians * (180 / Math.PI) * -1 + 90;

    setTotation(degree);
  };

  return (
    <span
      className='inline-block '
      ref={ref}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}>
      :\
    </span>
  );
};

export default Icon;
