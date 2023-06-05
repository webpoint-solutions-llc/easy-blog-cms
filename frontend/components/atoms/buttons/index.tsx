import React from 'react';

import clsx from 'clsx';
import btnStyles from '@particles/css/buttons.module.css';

import LoadingIcon from './LoadingIcon';
import { EBIconPlacing, EIconSize, EButtonType, Ibutton } from './button.types';

/**
 * Custom Button component which can be used as an Component
 *
 * @props btnType <EButtonType> - enum of EButtonType containing type of button (primary, secondary, outline, outlineSecondary and none). Defaults to primary
 * @props iconSize <EIconSize> - enum of EIconSize containing the size of the icons in the button. (small, medium, large, none). Defaults to medium.
 * @props iconPlace <EBIconPlacing> - enum of EBIconPlacing containing the placing of the icon in the button. (Left, Right and No Icon). Defaults to no Icon.
 * @props loading <boolean> - shows loading status in the button. Can be used while submitting form.
 * @props width <string|undefined> - contains the width of the button
 * @props maxWidth <string|undefined> - contains the maxWidth of the button
 * @props transparent <boolean> - Have a transparent background in button
 * @props transparentTB <string> - Set style to button when transparent props is set to true
 * @props Icon <IconFunctionType> - JSX.Element of Icon with props to be passed of IconFunctionType to be displayed in the button
 * @props disabled <boolean> - Set Button to disabled status. Defaults to false.
 * @props children <ReactNode> - Get the children to be kept inside of button
 * @props ...props - Includes all of the default props to be passed which is included in default button tags
 *
 * @returns JSX.Element of button with given parameters
 */
const Button: React.FC<Ibutton> = ({
  btnType = EButtonType.primary,
  iconSize = EIconSize.medium,
  iconPlace = EBIconPlacing['no-icon'],
  loading = false,
  width,
  maxWidth,
  transparent,
  transparentTB,
  Icon,
  disabled = false,
  children,
  ...props
}) => {
  const styles = {
    width,
    maxWidth,
  };
  /**
   * Genereting Class for button
   */

  let typeClass = clsx(
    btnType === EButtonType.primary && btnStyles.primaryBtn,
    btnType === EButtonType.secondary && btnStyles.secondaryBtn,
    btnType === EButtonType.outline && btnStyles.outlineBtn,
    btnType === EButtonType.outlineBtnSecondary && btnStyles.outlineBtnSecondary,
  );

  if (disabled) {
    typeClass = btnStyles.disabled;
  }

  const styleClass = clsx(
    btnStyles.btn,
    typeClass,
    loading && 'relative',
    transparent && btnStyles.opacity,
    transparent && transparentTB,
  );

  /**
   * Generating class for Icons
   */

  const iconsClass = clsx(
    iconSize === EIconSize.small && btnStyles.smallIcon,
    iconSize === EIconSize.medium && btnStyles.midIcon,
    iconSize === EIconSize.large && btnStyles.largeIcon,
    loading && 'text-transparent',
  );

  /* This is a className which is used to position the loading icon in the center of the button. */
  const loadingClass = clsx('absolute', !loading && 'hidden');

  return (
    <button
      {...props}
      style={styles}
      className={clsx(styleClass, props.className ? props.className : 'text-neutral-900 font-medium px-6 py-3')}
      disabled={disabled || loading}
    >
      <span className={loadingClass}>
        <LoadingIcon btnType={btnType} />
      </span>
      {iconPlace === 'left' && Icon && <Icon className={iconsClass} />}
      {children && <span className={loading ? 'text-transparent' : ''}>{children}</span>}
      {iconPlace === 'right' && Icon && <Icon className={iconsClass} />}
    </button>
  );
};

export default Button;
