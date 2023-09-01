"use client";
import clsx from "clsx";
import { subscribe, unsubscribe } from "pubsub-js";
import React, { useEffect, useRef, useState } from "react";

type Props = {};

const ModalHover = (props: Props) => {
  const [url, setUrl] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [transform, setTransform] = useState<any>({ x: 0, y: 0 });
  const [canTransform, setCanTransform] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement>(null);
  const width = 360,
    height = 740;

  useEffect(() => {
    const token = subscribe("PROJECT_IFRAME", (e, d) => {
      setUrl(d);
    });

    const container = ref.current;
    if (container) {
      container.addEventListener("mouseenter", _onEnter);
      container.addEventListener("mouseleave", _onLeave);
    }
    return () => {
      unsubscribe(token);
      if (container) {
        container.removeEventListener("mouseenter", _onEnter);
        container.removeEventListener("mouseleave", _onLeave);
      }
    };
  }, []);

  useEffect(() => {
    // if(url)
    setShow(url !== "");
    if (url) {
      // console.log(url);
      document.body.addEventListener("mousemove", _update);
    } else {
      document.body.removeEventListener("mousemove", _update);
    }
  }, [url]);

  const _update = (e: MouseEvent) => {
    if (url) return;
    setTransform({
      x: e.clientX - 5,
      y: e.clientY - 5,
    });
  };

  const _onEnter = () => {
    setTimeout(() => {
      // setCanTransform(false);
    }, 250);
  };
  const _onLeave = () => {
    // setShow(false);
    setTimeout(() => {
      // setCanTransform(true);
    }, 250);
  };

  const _sanitizeUrl = (u: string) => {
    let clean = u;
    clean = clean.replace("http://", "");
    clean = clean.replace("https://", "");
    if (clean[clean.length - 1] == "/")
      clean = clean.substr(0, clean.length - 1);
    console.log(u, clean);
    return clean;
  };

  return (
    <div
      ref={ref}
      className={clsx(
        "modal-hover fixed bottom-0 right-xl -translate-x-1/2)- scale-50- pointer-events-none-  will-change-transform transition-opacity- transition-all-  hidden-sm z-50 bg-bg"
      )}
      style={{
        // transform: !url
        //   ? `translate(${transform.x}px, ${transform.y}px) scale(0.5)`
        //   : "scale(0.5)",
        // transform: `translate(${transform.x}px, ${transform.y}px) scale(0.5)`,
        opacity: show ? 1 : 0,
        width: `${width}px`,
        height: `${height}px`,
        pointerEvents: show ? "all" : "none",
      }}>
      <div className='header absolute  flex justify-between items-center'>
        {url && (
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='url ellipsis'>
            {_sanitizeUrl(url)}
          </a>
        )}

        <button className='close ' onClick={() => setShow(false)}>
          ×
        </button>
      </div>
      {url && (
        <iframe
          src={url}
          // frameBorder='0'
          // scrolling='no'
          width={width}
          height={height}></iframe>
      )}
    </div>
  );
};

export default ModalHover;
