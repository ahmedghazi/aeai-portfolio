"use client";
import React, { useEffect, useState } from "react";
import { Tag } from "../types/schema";
import { usePageContext } from "../context/PageContext";
import clsx from "clsx";

type Props = {
  input: Tag;
};

const TagButton = ({ input }: Props) => {
  const { tag, setTag } = usePageContext();
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    setTag(active ? input._id : "");
  }, [active]);

  const _onClick = () => {
    setActive(!active);
  };
  return (
    <button
      onClick={_onClick}
      // className={tag === input._id ? "is-active" : ""}
      className={clsx(
        "tag",
        "whitespace-pre-line",
        input.title?.replace(" ", "-").toLocaleLowerCase()
      )}
      style={{
        color: input.color,
      }}>
      {input.title} [{tag === input._id ? "X" : ""}]
    </button>
  );
};

export default TagButton;
