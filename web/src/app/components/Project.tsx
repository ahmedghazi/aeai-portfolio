"use client";
import React, { useEffect, useState } from "react";
import { Project, Tag } from "../types/schema";
import TagButton from "./TagButton";
import { usePageContext } from "../context/PageContext";
import clsx from "clsx";
import { publish } from "pubsub-js";

type Props = {
  input: Project;
};

const ProjectComponent = ({ input }: Props) => {
  const { tag } = usePageContext();
  const [hide, setHide] = useState<boolean>(false);
  useEffect(() => {
    // console.log(tag);

    if (tag !== "") {
      if (!input.tags || input.tags?.length === 0) {
        setHide(true);
        return;
      }
      const isIn = input.tags.filter((el) => el._id === tag);
      setHide(isIn.length === 0);
      if (isIn.length > 0) console.log(isIn);
    } else {
      console.log("no tag");
      setHide(false);
    }
  }, [tag]);

  const _onMouseEnter = (e: React.MouseEvent) => {
    if ("ontouchstart" in window) return;
    publish("PROJECT_IFRAME", input.url);
  };
  const _onMouseLeave = (e: React.MouseEvent) => {
    // publish("PROJECT_IFRAME", "");
  };

  return (
    <article
      className={clsx("project", hide ? "hidden" : "block")}
      onMouseEnter={_onMouseEnter}
      onMouseLeave={_onMouseLeave}>
      <a
        href={input.url}
        target='_blank'
        rel='noopener noreferrer'
        className='flex justify-between md:grid grid-cols-2 md:grid-cols-4 text-primary _row relative'>
        <h2 className='ellipsis'>{input.title}</h2>
        <div className='meta hidden-sm'>{input.year}</div>
        <div className='meta hidden-sm'>
          {input.tags &&
            input.tags?.map((item: Tag, i) => (
              <span
                key={i}
                className={clsx(
                  "pr-05 tag",
                  item.title?.replace(" ", "-").toLocaleLowerCase()
                )}
                style={{
                  color: item.color,
                }}>
                {/* <TagButton input={item} /> */}
                {item.title}
              </span>
            ))}
        </div>
        <div className='meta ellipsis hidden-sm'>{input.url}</div>
        <div className='arrow sm-only text-right'>🔗</div>
      </a>
    </article>
  );
};

export default ProjectComponent;
