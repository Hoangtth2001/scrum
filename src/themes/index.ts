import { Theme, createTheme } from '@mui/material';

import typography from './typography';
import light from './light';
import dark from './dark';

const typeTheme = [light, dark];

const themes = (type: number): Theme =>
  createTheme({
    ...typeTheme[type],
    typography,
  });

export default themes;
