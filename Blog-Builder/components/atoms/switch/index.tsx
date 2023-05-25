import React from 'react';

interface ISwitch extends React.InputHTMLAttributes<HTMLInputElement> {}

const Switch: React.FC<ISwitch> = ({ ...props }) => {
  return (
    <input
      className="h-6 w-12 appearance-none relative rounded-full bg-neutral-300 before:pointer-events-none after:absolute after:z-[2] after:ml-[2px] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-600 after:top-1/2 after:-translate-y-1/2 after:transition-all checked:bg-default-notification-background after:content-[''] checked:after:absolute checked:after:z-[2] checked:after:bg-white checked:after:top-1/2 checked:after:-translate-y-1/2 checked:after:right-[2px] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none cursor-pointer"
      type="checkbox"
      role="switch"
      {...props}
    />
  );
};

export default Switch;
