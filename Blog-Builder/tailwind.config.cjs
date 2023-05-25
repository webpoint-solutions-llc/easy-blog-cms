/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,tsx,jsx}'],
  theme: {
    extend: {
      colors: {
        'primary-00': '#FCF8E1',
        'primary-10': '#F9EBB4',
        'primary-20': '#F5DE83',
        'primary-30': '#F2D352',
        'primary-40': '#F0C82F',
        'primary-50': '#EFBE18',
        'primary-60': '#EFB10F',
        'primary-70': '#EF9F08',
        'primary-80': '#EF8F03',
        'primary-90': '#EE7100',
        'secondary-00': '#EAE9F1',
        'secondary-10': '#CAC8DD',
        'secondary-20': '#A8A5C6',
        'secondary-30': '#8883AE',
        'secondary-40': '#71689C',
        'secondary-50': '#5D4D8C',
        'secondary-60': '#564683',
        'secondary-70': '#4E3C78',
        'secondary-80': '#46336B',
        'secondary-90': '#372354',
        disabled: '#C2C2C2',
        'disabled-text': '#808080',
        'normal-input': '#CDCBCB',
        inactive: '#675F75',
        'neutral-50': '#FBFBFB',
        'neutral-51': '#6B6766',
        'neutral-52': '#524E4E',
        'neutral-100': '#F6F6F6',
        'neutral-200': '#F1F1F1',
        'neutral-300': '#E5E5E5',
        'neutral-400': '#A5A5A5',
        'neutral-500': '#A5A5A5',
        'neutral-600': '#7B7B7B',
        'neutral-700': '#5C5C5C',
        'neutral-800': '#484848',
        'neutral-900': '#262626',
        'side-bar-active': '#3D3D3D',
        'side-bar-hover': '#2B2B2B',
        'background-image': '#E8E8E8',
        bullet: '#A9A5A5',
        'border-faq': '#D5CBE5',
        pink: '#AA9CF6',
        'button-active': '#D69F0D',
        link: '#2C70F3',
        'background-color': '#FAFAFA',
        'dash-line': '#BEB5CC',
        'hero-text': '#CDCBCB',
        openedBG: '#F7E3E4',
        closedBG: '#E0F6EF',
        openedBorder: '#E97E82',
        pendingBG: '#FBF9E9',
        'badge-rgba': 'rgba(70, 215, 172, 0.1)',
        'card-rgba': 'rgba(255, 255, 255, 0.05)',
        error: '#DB1920',
        'default-notification-background': '#4CE0B3',
        'dot-color': '#D9D9D9',
        'dash-color': '#EEEEEE',
        progress: '#F4F4F5',
        'danger-container': 'rgba(219, 25, 32, 0.1)',
        'sub-role': '#25705A80',
        'main-role': '#FCF8E1B2',
        'chip-border': 'rgba(24, 119, 242, 0.4)',
        'role-bg': '#4CE0B326',
        'skill-border': 'rgba(24, 119, 242, 0.4)',
        'skill-background': 'rgba(24, 119, 242, 0.05)',
        'status-active-border': 'rgba(37, 112, 90, 0.5)',
        'status-active-background': 'rgba(76, 224, 179, 0.15)',
        'green-highlight': '#25705A',
        'candidate-name': '#191D23',
        scrim: 'rgba(38, 38, 38, 0.5)',
        'pending-background': 'rgba(252, 248, 225, 0.7)',
        'pending-border': 'rgba(38, 38, 38, 0.5)',
        'rejected-background': 'rgba(219, 25, 32, 0.1)',
        'rejected-border': 'rgba(219, 25, 32, 0.5)',
        'content-bg': '#FAFCFF',
        'pencil-bg': 'rgba(24, 119, 242, 0.1)',
        gray500: '#71717A',
      },
      boxShadow: {
        signupPage: '0px 4px 10px rgba(59, 59, 66, 0.04)',
        notificationContainer: '0px 10px 20px rgba(32, 29, 82, 0.2)',
        card: '0px 4px 10px rgba(59, 59, 66, 0.04)',
        selector: '0px 4px 20px rgba(59, 59, 66, 0.05)',
        newsLetter: '0px 4px 20px rgba(59, 59, 66, 0.1)',
      },
      backgroundImage: {
        'placeholder-hero-gradient': 'linear-gradient(97.32deg, #498ADE -19.63%, #232323 115.3%)',
        'cta-placeholder': 'linear-gradient(264.8deg, rgba(0, 0, 0, 0.6) 26.66%, rgba(0, 0, 0, 0) 536.82%)',
        'image-placeholder': 'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))',
        'infographics-placeholder': 'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
      },
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
        gilroy: ['Gilroy', 'sans-serif'],
        inter: [`'Inter'`, 'sans-serif'],
      },
      fontSize: {
        h1: ['48px', { lineHeight: '52px', fontWeight: '700' }],
        h2: ['36px', { lineHeight: '44px', fontWeight: '700' }],
        h3: ['32px', { lineHeight: '40px', fontWeight: '700' }],
        h4: ['24px', { lineHeight: '30px', fontWeight: '700' }],
        h4v2: ['20px', { lineHeight: '30px', fontWeight: '500' }],
        h5: ['18px', { lineHeight: '24px', fontWeight: '700' }],
        h6: ['1.5rem', { lineHeight: '2.295rem', fontWeight: '' }],
        smh1: ['32px', { lineHeight: '36px', fontWeight: '700' }],
        smh2: ['24px', { lineHeight: '32.4px', fontWeight: '' }],
        smh3: ['20px', { lineHeight: '', fontWeight: '' }],
        smh4: ['18px', { lineHeight: '', fontWeight: '' }],
        smh5: ['16px', { lineHeight: '21.6px', fontWeight: '' }],
        body1: ['18px', { lineHeight: '29.7px', fontWeight: '500' }],
        body2: ['16x', { lineHeight: '26px', fontWeight: '500' }],
        body3: ['14px', { lineHeight: '20px', fontWeight: '500' }],
        bodysmall: ['14px', { lineHeight: '23px', fontWeight: '500', letterSpacing: '0' }],
        button: ['15x', { lineHeight: '20.25px', fontWeight: '500', letterSpacing: '0' }],
        excerpt: ['20px', { lineHeight: '32px', fontWeight: '400' }],
        subtitle: ['18px', { lineHeight: '27px', fontWeight: '400', letterSpacing: '0' }],
        caption: ['13px', { lineHeight: '17.55px', fontWeight: '500' }],
        captionBold: ['13px', { lineHeight: '17.55px', fontWeight: '700' }],
        captionSpc: ['13px', { lineHeight: '21px', fontWeight: 500 }],
        captionSpcBold: ['13px', { lineHeight: '21px', fontWeight: 700 }],
        excerpt2: ['13px', { lineHeight: '22px', fontWeight: 400 }],
        excerpt2Bold: ['13px', { lineHeight: '22px', fontWeight: 700 }],
        listDetail: ['13px', { lineHeight: '20px', fontWeight: 700 }],
        tableHead: ['12px', { lineHeight: '16.2px', fontWeight: 700 }],
        roleFont: ['12px', { lineHeight: '16.2px', fontWeight: 500 }],
        tableTitle: ['14px', { lineHeight: '20px', fontWeight: 700 }],
        caption2: ['11px', { lineHeight: '14.85px', fontWeight: 700 }],
        navText: ['15px', { lineHeight: '20px', fontWeight: 500 }],
        embed: ['16px', { lineHeight: '24px', fontWeight: 500 }],
        tableContentHead: ['16px', { lineHeight: '20px', fontWeight: 700 }],
      },
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '1.5rem',
      },
      container: {
        sm: '100%',
        md: '1000px',
        lg: '1000px',
        xl: '1000px',
        '2xl': '1400px',
      },
    },
  },
  plugins: [],
};
