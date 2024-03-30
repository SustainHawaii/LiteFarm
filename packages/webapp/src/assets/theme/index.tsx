import { createTheme, ThemeProvider } from '@material-ui/core';
import React, { FC, ReactNode } from 'react';

export const colors = {
  // teal900: '#085d50',
  // teal700: '#028577',
  // teal600: '#3ea992',
  // teal500: '#89d1c7',
  // teal100: '#f1fbf9',
  // green700: '#78c99e',
  // green400: '#a8e6bd',
  // green200: '#c7efd3',
  // green100: '#e3f8ec',
  // yellow700: '#ffb800',
  // yellow400: '#fed450',
  // yellow300: '#fce38d',
  // grey900: '#282b36',
  // grey600: '#66738a',
  // grey500: '#9faabe',
  // grey400: '#d4dae3',
  // grey200: '#f3f6fb',
  // grey100: '#fafafd',
  // overlay: 'rgba(36, 39, 48, 0.5)',
  red700: '#D02620',
  // red400: '#f58282',
  // orange700: '#ffa73f',
  // orange400: '#ffc888',
  // purple700: '#8f26f0',
  // purple400: '#ffe55b',
  // brightGreen700: '#037A0F',
  // brightGreen400: '#a6f7ae',
  // cyan700: '#03a6ca',
  // cayn400: '#4fdbfa',
  // blue200: '#e9f3ff',
  // blue700: '#0669E1',
  // grey1: '#333333',
  // brown700: '#AA5F04',
  // brown900: '#7E4C0E',
  '--phoenix-gray-soft': '#f5f7fa',
  '--phoenix-gray-100': '#eff2f6',
  '--phoenix-gray-200': '#e3e6ed',
  '--phoenix-gray-300': '#cbd0dd',
  '--phoenix-gray-400': '#9fa6bc',
  '--phoenix-gray-500': '#8a94ad',
  '--phoenix-gray-600': '#6e7891',
  '--phoenix-gray-700': '#525b75',
  '--phoenix-gray-800': '#3e465b',
  '--phoenix-gray-900': '#31374a',
  '--phoenix-gray-1000': '#222834',
  '--phoenix-gray-1100': '#141824',
  // '--phoenix-gray-soft-rgb': '245, 247, 250',
  // '--phoenix-gray-100-rgb': '239, 242, 246',
  // '--phoenix-gray-200-rgb': '227, 230, 237',
  // '--phoenix-gray-300-rgb': '203, 208, 221',
  // '--phoenix-gray-400-rgb': '159, 166, 188',
  // '--phoenix-gray-500-rgb': '138, 148, 173',
  // '--phoenix-gray-600-rgb': '110, 120, 145',
  // '--phoenix-gray-700-rgb': '82, 91, 117',
  // '--phoenix-gray-800-rgb': '62, 70, 91',
  // '--phoenix-gray-900-rgb': '49, 55, 74',
  // '--phoenix-gray-1000-rgb': '34, 40, 52',
  // '--phoenix-gray-1100-rgb': '20, 24, 36',
  '--phoenix-soft': '#f5f7fa',
  '--phoenix-100': '#eff2f6',
  '--phoenix-200': '#e3e6ed',
  '--phoenix-300': '#cbd0dd',
  '--phoenix-400': '#9fa6bc',
  '--phoenix-500': '#8a94ad',
  '--phoenix-600': '#6e7891',
  '--phoenix-700': '#525b75',
  '--phoenix-800': '#3e465b',
  '--phoenix-900': '#31374a',
  '--phoenix-1000': '#222834',
  '--phoenix-1100': '#141824',
  '--phoenix-facebook': '#3c5a99',
  '--phoenix-google-plus': '#dd4b39',
  '--phoenix-twitter': '#1da1f2',
  '--phoenix-linkedin': '#0077b5',
  '--phoenix-youtube': '#ff0001',
  '--phoenix-github': '#333333',
  '--phoenix-bootstrap': '#6f45a9',
  '--phoenix-css3': '#203ccf',
  '--phoenix-html5': '#bf4b2c',
  '--phoenix-sass': '#c55589',
  '--phoenix-gulp': '#d54049',
  '--phoenix-w3c': '#255997',
  '--phoenix-primary': '#4bb7c3',
  '--phoenix-secondary': '#31374a',
};


const theme = createTheme({
  palette: {
    primary: {
      contrastText: colors['--phoenix-200'],
      main: colors['--phoenix-200'],
    },
    secondary: {
      contrastText: colors['--phoenix-500'],
      main: '#fff',
    },
    success: {
      contrastText: colors['--phoenix-600'],
      main: colors['--phoenix-700'],
    },
    info: {
      contrastText: colors['--phoenix-200'],
      main: colors['--phoenix-400'],
    },
    warning: {
      contrastText: colors['--phoenix-300'],
      main: colors['--phoenix-gray-500'],
    },
    error: {
      contrastText: colors['--phoenix-300'],
      main: colors['--phoenix-gray-soft'],
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
    text: {
      primary: colors['--phoenix-primary'],
      disabled: colors['--phoenix-primary'],
      hint: colors['--phoenix-primary'],
    },
    action: {
      hover: colors['--phoenix-gray-800'],
      hoverOpacity: 0.5,
      active: colors['--phoenix-300'],
      selected: colors['--phoenix-gray-900'],
      focus: colors['--phoenix-soft'],
    },
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
          backgroundColor: '#fff',
          overflowX: 'hidden',
        },
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});

export default theme;
const defaultTheme = createTheme({});
export const DefaultThemeProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
);
