import clsx from 'clsx';
import React from 'react';

import { EHeadingSize, IHeading } from './heading.types';

import { Link } from 'react-router-dom';

/**
 * Custom Heading component
 *
 * @props size <EHeadingSize> - is an Enum of EHeadingSize to determine the type of heading(h1,h2,h3,h4,h5,h6). Tag is also determined by this. Defaults to H1 Tag
 * @props color <string> - Color code of the text in heading. Defaults to #262626 (neutral-900)
 * @props anchorLink <string> - Optional. Link to be associated with heading
 * @props children <string|JSX.Element> - Optional. Content to be placed inside heading tag.
 * @props className <string> - Optional. Style classes to be places for heading styles
 *
 * @returns Heading tag as JSX.Element
 */
const Heading: React.FC<IHeading> = ({
  size = EHeadingSize.h1,
  color = '#262626',
  anchorLink,
  children,
  className,
}) => {
  const styles = {
    color: color,
  };

  const HeadingTag = `h${size}` as keyof JSX.IntrinsicElements;

  const headingClassGroup = clsx();
  // size === EHeadingSize.h1 && 'text-h1',
  // size === EHeadingSize.h2 && 'text-h2',
  // size === EHeadingSize.h3 && 'text-h3',
  // size === EHeadingSize.h4 && 'text-h4',
  // size === EHeadingSize.h5 && 'text-h5',
  // size === EHeadingSize.h6 && 'text-h6',

  if (anchorLink) {
    return (
      <Link to={anchorLink}>
        <a>
          <HeadingTag className={clsx(headingClassGroup, className)} style={styles}>
            {children}
          </HeadingTag>
        </a>
      </Link>
    );
  }

  return (
    <HeadingTag className={clsx(headingClassGroup, className)} style={styles}>
      {children}
    </HeadingTag>
  );
};

export default Heading;
