import { PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
  // block(props) {
  //   // console.log(props);
  //   switch (props.node?.style) {
  //     case "h2":
  //       return <h2>{props.children}</h2>;
  //     case "text-lg":
  //       return <p className='text-lg'>{props.children}</p>;
  //     case "text-xl":
  //       return <p className='text-xl'>{props.children}</p>;
  //     default:
  //       return <p>{props.children}</p>;
  //   }
  // },

  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a href={value.href} rel={rel}>
          {children}
        </a>
      );
    },
  },
};

export default components;
