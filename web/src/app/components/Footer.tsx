import React from "react";
import Grid from "./Grid";
import { getSettings } from "../utils/sanity-utils";

type Props = {};

const Footer = async (props: Props) => {
  const settings = await getSettings();
  return (
    <footer className=''>
      <Grid
        length={settings.footerItems ? settings.footerItems?.length + 2 : 6}
        color='rgba(20,20,20,1)'
      />
      <div className='inner px-lg md:px-xl'>
        <div className='_row'></div>
        <div className='flex md:px-lg'>
          <div className='accr pr-md _row'>_f:</div>
          <div className=''>
            {settings.footerItems &&
              settings.footerItems.map((item, i) => (
                <a
                  key={i}
                  className='block _row'
                  href={item.url}
                  target='_blank'
                  rel='noopener noreferrer'>
                  {item.label}
                </a>
              ))}
          </div>
        </div>

        <div className='_row text-right'>
          © AHMED GHAZI {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
