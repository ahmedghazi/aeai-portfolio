import React from "react";
import Grid from "./Grid";
import Icon from "./Icon";
import { getAllTags, getSettings } from "../utils/sanity-utils";
import { Tag } from "../types/schema";
import TagButton from "./TagButton";

type Props = {};

const Header = async (props: Props) => {
  const settings = await getSettings();
  const tags = await getAllTags();

  return (
    <header className='text-left'>
      <Grid length={13} color='rgba(20,20,20,1)' />
      <div className='inner px-lg md:px-xl'>
        <div className='md:whitespace-pre _row sitename'>
          <Icon />
          {"      "}
          {settings.siteName}
        </div>
        <div className='md:grid grid-cols-3 contacts md:px-lg'>
          {settings.headerItems &&
            settings.headerItems.map((item, i) => (
              <a
                key={i}
                className='flex _row'
                href={item.url}
                target='_blank'
                rel='noopener noreferrer'>
                <span className='accr pr-md'>{item.accr}:</span>
                <span className='label'>{item.label}</span>
              </a>
            ))}
          <a
            className='flex _row'
            href='https://www.websitecarbon.com/website/ahmedghazi-com/'
            target='_blank'
            rel='noopener noreferrer'>
            <span className='accr pr-md' title='Score'>
              _S:
            </span>
            <span
              className='label'
              title='0.04g of CO2/view. Cleaner than 96% of pages tested'>
              WebsiteCarbon A+
            </span>
          </a>
        </div>
        <div className='md:px-lg skills'>
          <div className=' _row flex '>
            <div className='accr pr-md'>_s:</div>
            <div className='tags flex flex-wrap- flex-nowrap hide-sb'>
              {tags.map((item: Tag, i) => (
                <div key={i} className='pr-md _row'>
                  <TagButton input={item} key={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='_row'></div>
      </div>
    </header>
  );
};

export default Header;
