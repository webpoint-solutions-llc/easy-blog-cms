import { FC } from 'react';
import { EButtonType } from './button.types';

interface ILoadingIcon {
  btnType: string;
  width?: string;
  height?: string;
}

/**
 * Loading Icon which can be used as a component
 *
 * @props btnType - Get the type of button so that the color of loading can be changed according to type of button
 * @props width - Get the width of the icon. Defaukt - 25
 * @props height - Get the height of the icon. Default - 24
 *
 * @returns Loading Icon in JSX format
 */
const LoadingIcon: FC<ILoadingIcon> = ({ btnType, width = 25, height = 24 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      className="animate-spin"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.2"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 19C16.366 19 19.5 15.866 19.5 12C19.5 8.13401 16.366 5 12.5 5C8.63401 5 5.5 8.13401 5.5 12C5.5 15.866 8.63401 19 12.5 19ZM12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z"
        fill={btnType === 'o' ? '#FF564D' : 'white'}
      />
      <path
        d="M2.5 12C2.5 6.47715 6.97715 2 12.5 2V5C8.63401 5 5.5 8.13401 5.5 12H2.5Z"
        fill={btnType === EButtonType.outline ? '#FF564D' : 'white'}
      />
    </svg>
  );
};

export default LoadingIcon;
