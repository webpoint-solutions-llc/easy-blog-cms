import React from 'react';

import clsx from 'clsx';

import ChipCSS from '@particles/css/chip.module.css';

const Chip: React.FC<{ text: string; primary?: boolean }> = ({ text, primary = true }) => {
  return (
    <div
      className={clsx(ChipCSS.chipContainer, primary ? ChipCSS.primaryChipContainer : ChipCSS.secondaryChipContainer)}
    >
      {text}
    </div>
  );
};

export default Chip;
