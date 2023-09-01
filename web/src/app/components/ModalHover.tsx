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
  const [iframeLoaded, setFframeLoaded] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const width = 360,
    height = 740;

  useEffect(() => {
    console.log(window.navigator.userAgent);
    const token = subscribe("PROJECT_IFRAME", (e, d) => {
      setFframeLoaded(false);
      // if (ref.current) {
      //   const iframe = ref.current.querySelector("iframe");
      //   if (iframe)
      //     setUserAgent(
      //       iframe.contentWindow,
      //       "Mozilla/5.0 (Linux; Android 7.0; SM-G950U Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36"
      //     );
      // }

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
    clean = clean.replace(/\/$/, "");

    return clean;
  };

  const _onIframeLoaded = () => {
    setFframeLoaded(true);
  };

  function setUserAgent(window, userAgent) {
    if (window.navigator.userAgent != userAgent) {
      var userAgentProp = {
        get: function () {
          return userAgent;
        },
      };
      try {
        Object.defineProperty(window.navigator, "userAgent", userAgentProp);
      } catch (e) {
        window.navigator = Object.create(navigator, {
          userAgent: userAgentProp,
        });
      }
    }
  }

  return (
    <div
      ref={ref}
      className={clsx(
        "modal-hover fixed bottom-0 right-xl -translate-x-1/2)- scale-50- pointer-events-none-  will-change-transform transition-opacity- transition-all-  hidden-sm z-50 bg-bg"
      )}
      style={{
        opacity: show ? 1 : 0,
        width: `${width}px`,
        height: `${height}px`,
        pointerEvents: show ? "all" : "none",
      }}>
      <div className='header sticky  flex justify-between items-center z-50'>
        {url && (
          <a
            href={`${url}?platform=mobile`}
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
          title='preview'
          width={width}
          height={height}
          onLoad={_onIframeLoaded}
          className={clsx(
            iframeLoaded ? "opacity-100" : "opacity-10"
          )}></iframe>
      )}
    </div>
  );
};

export default ModalHover;
