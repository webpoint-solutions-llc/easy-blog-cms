import React from 'react';

import SideBar, { ISideBar } from './Side-Bar';

interface IBodyLayout extends ISideBar {
  children: React.ReactNode;
}

/**
 * Dashboard body layout
 * @props children <React.ReactNode>:- Contents of side part
 * @props content :- Object consisting of following
 * title <string>:- Title of the side bar
 * link <string>:- Link of the side bar
 * icon <React.FC<IconFunctionType>>:- React function of icon svg
 * subContent <{title:string, link:string}>:- Sub content of the main content
 * it consists of title and link of the content. It is not required.
 * @props active <{page:string, subPage?:string}>:- This is the active status of the page. It has page and subPages. Subpages are optional.
 * @returns Template of Dashboard body layout
 */
const BodyLayout: React.FC<IBodyLayout> = ({ children, content, active }) => {
  return (
    <section className="flex relative">
      <SideBar content={content} active={active} />
      <div className="w-full max-h-[92vh] overflow-y-scroll">{children}</div>
    </section>
  );
};

export default BodyLayout;
