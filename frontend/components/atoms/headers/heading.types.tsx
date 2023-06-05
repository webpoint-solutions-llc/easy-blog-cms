export enum EHeadingSize {
  'h1' = 1,
  'h2' = 2,
  'h3' = 3,
  'h4' = 4,
  'h5' = 5,
  'h6' = 6,
}

export interface IHeading {
  size?: EHeadingSize;
  color?: string;
  anchorLink?: string | undefined;
  children?: string | JSX.Element;
  className?: string;
}
