import React from 'react';

import SideBarCSS from '@particles/css/sideBar.module.css';
import { IconFunctionType } from '@atoms/icons/iconFunctionType.interface';

import SideBarContent from './content';

export interface ISideBarContent {
  title: string;
  icon: React.FC<IconFunctionType>;
  subContent?: {
    title: string;
    link: string;
  }[];
  link: string;
}

export interface IActive {
  page: string;
  subPage?: string;
}

export interface ISideBar {
  active: IActive;
  content: ISideBarContent[];
}
/**
 * Side bar of the dashboard
 * @props content :- Object consisting of following
 * title <string>:- Title of the side bar
 * link <string>:- Link of the side bar
 * icon <React.FC<IconFunctionType>>:- React function of icon svg
 * subContent <{title:string, link:string}>:- Sub content of the main content
 * it consists of title and link of the content. It is not required.
 * @props active <{page:string, subPage?:string}>:- This is the active status of the page. It has page and subPages. Subpages are optional.
 * @returns side bar of the dashboard
 */
const SideBar: React.FC<ISideBar> = ({ active, content }) => {
  return (
    <section className={SideBarCSS.sideBarContainer}>
      {content.map((value) => (
        <SideBarContent
          key={value.title}
          title={value.title}
          icon={value.icon}
          link={value.link}
          subContent={value.subContent}
          active={active}
        />
      ))}
    </section>
  );
};

export default SideBar;
