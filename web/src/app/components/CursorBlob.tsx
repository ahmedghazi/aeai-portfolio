"use client";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import clsx from "clsx";
import { throttle } from "throttle-debounce";
// import { debounce } from "throttle-debounce";
// import { publish } from "pubsub-js";
// import { _isTouchDevice } from "utils/utils";

interface WrapperProps {
  size: number;
}

const animeRadius = keyframes`
  0%,
  100% { border-radius: 47% 53% 44% 56% / 55% 44% 56% 45%  }
  14% { border-radius: 50% 50% 48% 52% / 51% 47% 53% 49% }
  28% { border-radius: 51% 49% 52% 48% / 48% 47% 53% 52%  }
  42% { border-radius: 91% 39% 95% 95% / 91% 38% 92% 39%; }
  56% { border-radius: 47% 53% 44% 56% / 55% 44% 56% 45% }
  70% { border-radius: 50% 50% 48% 52% / 51% 47% 53% 49%  }
  84% { border-radius: 51% 49% 52% 48% / 48% 47% 53% 52% }
`;

const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  opacity: 0;
  pointer-events: none;
  will-change: transform;
  mix-blend-mode: difference;
  transition: transform 150ms ease-out;
  .dot {
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    border-radius: 100%;
    background: ${(props) => props.color};
    transition: background-color 150ms ease,
      transform 1000ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
      border-radius 1000ms ease-out;
    filter: url("#glue");
    /* animation: ${animeRadius} 10s linear infinite; */
  }
  svg {
    opacity: 0;
  }
  &.is-anchor-or-button {
    .dot {
      transform: scale(2.2);
    }
  }
  &.is-mousedown {
  }
  &.is-input {
    visibility: hidden;
  }

  display: none;
  @media (hover: hover) {
    display: block;
  }
  @media (hover: none) {
    display: none;
  }
`;

type CProps = {
  color: string;
  size: number;
};
interface Style {
  x: number;
  y: number;
  opacity: number;
  scale: number;
  borderRadius: string;
}

// type MouseMoveHandler = {
//   target: Element
// }
//https://codepen.io/Starglider/pen/LYEELVy?editors=0010
const CursorBlob = ({ color, size }: CProps) => {
  // const inertia = 0.3;
  const [css, setCss] = useState<Style>({
    x: 0,
    y: 0,
    opacity: 0,
    scale: 1,
    borderRadius: "100%",
  });
  const [isAnchorOrButton, setIsAnchorOrButton] = useState<boolean>(false);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [isInput, setIsInput] = useState<boolean>(false);
  const scaleFactor = 0.5;

  useEffect(() => {
    document.body.classList.add("has-custom-cursor");
    // console.log(document.body);
    return () => document.body.classList.remove("has-custom-cursor");
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", _onMouseMove);
    document.addEventListener("mousedown", _onMouseDown);
    document.addEventListener("mouseup", _onMouseUp);

    return () => {
      document.removeEventListener("mousemove", _onMouseMove);
      document.removeEventListener("mousedown", _onMouseDown);
      document.removeEventListener("mouseup", _onMouseUp);
    };
  }, [size]);

  const _getRandomRadius = () => {
    //51% 49% 52% 48% / 48% 47% 53% 52%
    let result = "";
    for (let i = 0; i < 3; i++) {
      result += `${45 + Math.round(Math.random() * 10)}% `;
    }
    result += " / ";
    for (let i = 0; i < 3; i++) {
      result += `${45 + Math.round(Math.random() * 10)}% `;
    }
    return result;
  };

  const _blobyFy = throttle(
    2000,
    (num) => {
      // console.log("num:", num);
      const blobBorder = _getRandomRadius();
      // console.log(blobBorder);

      setCss((css) => ({
        ...css,
        scale: css.scale + scaleFactor,
        borderRadius: blobBorder,
      }));
    },
    { noLeading: false, noTrailing: false }
  );

  const _onMouseMove = (e: MouseEvent) => {
    const isTouch = typeof window !== undefined && window.innerWidth < 1080;
    if (isTouch) return;

    const __isAnchorOrButton = _getIsAnchorOrButton(e.target as Element);
    setIsAnchorOrButton(__isAnchorOrButton);

    const __isInput = false;

    let offset = size / 2;

    setCss((css) => ({
      ...css,
      x: e.clientX - offset,
      y: e.clientY - offset,
      opacity: 1,
      // scale: css.scale + 0.01,
    }));

    _blobyFy(e.clientX);
    // if (__isAnchorOrButton || __isInput) {
    //   debounceFunc();
    // }
  };

  // const debounceFunc = debounce(
  //   30,
  //   () => {
  //     publish("LOGO.EMO", "focus");
  //   },
  //   { atBegin: true }
  // );

  // const _update = e => {}

  const _onMouseDown = () => setIsMouseDown(true);
  const _onMouseUp = () => setIsMouseDown(false);

  const _getIsAnchorOrButton = (target: Element) => {
    return (
      target.tagName.toLowerCase() === "a" ||
      target.tagName.toLowerCase() === "button" ||
      target.classList.contains("button") ||
      target.classList.contains("btn") ||
      target.classList.contains("pointer") ||
      target.classList.contains("cursor-pointer") ||
      target.role === "button"
    );
  };
  // const _getIsInput = (target: Element) => target.role === "textbox";

  // console.log(css)
  return (
    <Wrapper
      color={color}
      size={size}
      className={clsx(
        "cursor",
        isAnchorOrButton ? "is-anchor-or-button" : "",
        isMouseDown ? "is-mousedown" : "",
        isInput ? "is-input" : ""
      )}
      style={{
        transform: `translate(${css.x}px, ${css.y}px) `,
        opacity: css.opacity,
      }}>
      <div
        className='dot'
        style={{
          transform: `scale(${css.scale})`,
          borderRadius: css.borderRadius,
        }}></div>
      {/* <svg>
        <defs>
          <filter id='glue'>
            <feGaussianBlur
              in='SourceGraphic'
              stdDeviation='10'
              result='blur'
            />
            <feColorMatrix
              in='blur'
              mode='matrix'
              values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 15 -8'
              result='glue'
            />
            <feBlend in='SourceGraphic' in2='glue' />
          </filter>
        </defs>
      </svg> */}
    </Wrapper>
  );
};

export default CursorBlob;
