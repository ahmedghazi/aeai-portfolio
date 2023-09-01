"use client";
import clsx from "clsx";
import { subscribe, unsubscribe } from "pubsub-js";
import React, { useEffect, useRef, useState } from "react";

type Props = {};

const ModalHover = (props: Props) => {
  const [url, setUrl] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [transform, setTransform] = useState<any>({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const width = 360,
    height = 740;

  useEffect(() => {
    const token = subscribe("PROJECT_IFRAME", (e, d) => {
      setUrl(d);
    });

    return () => {
      unsubscribe(token);
    };
  }, []);

  useEffect(() => {
    // if(url)
    setShow(url !== "");
    if (url) {
      document.body.addEventListener("mousemove", _update);
    } else {
      document.body.removeEventListener("mousemove", _update);
    }
  }, [url]);

  const _update = (e: MouseEvent) => {
    console.log(e);
    setTransform({
      // x: e.offsetX - width / 2,
      // y: e.offsetY - height / 2,
      x: e.clientX,
      y: e.clientY - height / 2,
    });
  };

  return (
    <div
      ref={ref}
      className={clsx(
        "fixed left-0 top-0 pointer-events-none  will-change-transform transition-opacity- transition-all-  hidden-sm z-50 bg-bg"
      )}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        opacity: show ? 1 : 0,
        width: `${width}px`,
        height: `${height}px`,
      }}>
      {url && (
        <iframe
          src={url}
          frameBorder='0'
          scrolling='no'
          width={width}
          height={height}></iframe>
      )}
      {/* <img src={image.url} width={width} height={height} alt={alt} /> */}
    </div>
  );
};

export default ModalHover;
