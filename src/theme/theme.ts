import createTheme from '@mui/material/styles/createTheme';

export const customColors = createTheme({
    palette: {
      primary: {
        main: '#56817A',
        light: '#D5E8DC',
        dark: '#005844',
        contrastText: '#9F9E9E',
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 320,
        md: 768,
        lg: 1441,
        xl: 1536,
      },
    },
  });