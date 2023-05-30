export const storyButtonArgs = {
  onClick: {
    name: 'buttonClick',
    action: 'Clicked',
    table: {
      type: {
        summary: 'this is the button to call',
      },
    },
  },
  btnType: {
    name: 'Button',
    type: { name: 'string' },
    defaultValue: 'p',
    table: {
      type: {
        summary: 'This is a button',
        detail: 'This button can be used to generate both primary and secondary buttons',
      },
      defaultValue: { summary: 'primary' },
    },
    options: ['p', 's', 'o'],
    control: { type: 'select' },
  },
  size: {
    name: 'Button Size',
    type: { name: 'string' },
    defaultValue: 'md',
    table: {
      type: {
        summary: 'This is a button size',
        detail: 'This gives button size which can be sm | md | lg',
      },
      defaultValue: { summary: 'Medium' },
    },
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  iconPlace: {
    name: 'check icon',
    type: { name: 'string' },
    defaultValue: null,
    table: {
      type: {
        summary: 'This adds the icon in button',
        detail: 'This adds icons in left or right side of the button',
      },
      defaultValue: { summary: 'No Icon' },
    },
    options: [null, 'left', 'right'],
    control: { type: 'select' },
  },
  loading: {
    name: 'Loading',
    type: { name: 'boolean' },
    defaultValue: false,
    table: {
      type: {
        summary: 'Loading button',
      },
      defaultValue: { summary: 'Not loading' },
    },
    options: [false, true],
    control: { type: 'select' },
  },
  width: {
    name: 'width',
    type: { name: 'string' },
    defaultValue: '0px',
    table: {
      type: {
        summary: 'Width of the button',
      },
      defaultValue: { summary: 'No width' },
    },
  },
  maxWidth: {
    name: 'Max Width',
    type: { name: 'string' },
    defaultValue: undefined,
    table: {
      type: {
        summary: 'Max Width',
      },
      defaultValue: { summary: 'No max width' },
    },
  },
  disabled: {
    name: 'Disabled Status',
    type: { name: 'boolean' },
    defaultValue: false,
    table: {
      type: {
        summary: 'This disables the button',
        detail: 'Disabling the functions of the button',
      },
      defaultValue: { summary: 'Button Enabled' },
    },
    options: [false, true],
    control: { type: 'select' },
  },
  children: {
    name: 'children',
    type: { name: 'string' },
    defaultValue: 'Click Me!',
    table: {
      type: {
        summary: 'This is the value to be displayed in Button',
      },
      defaultValue: { summary: 'Click Me!' },
    },
    control: {
      type: 'text',
    },
  },
};
