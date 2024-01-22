import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import { useAppSelector } from 'hooks/useAppSelector';
import { appSelector } from 'redux/slice/app.slice';
import Snackbar from 'components/Snackbar';
import { Navigations } from 'navigations';
import Locales from 'components/Locales';
import { THEMES } from 'configs';
import themes from 'themes';

const App: React.FC = () => {
  const { modeTheme } = useAppSelector(appSelector);

  return (
    <ThemeProvider theme={themes(modeTheme === THEMES.LIGHT ? 0 : 1)}>
      <Locales>
        <BrowserRouter>
          <Snackbar />
          <Navigations />
        </BrowserRouter>
      </Locales>
    </ThemeProvider>
  );
};

export default App;
