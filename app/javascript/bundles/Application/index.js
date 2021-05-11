import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import ApplicationRoute from './components/ApplicationRoute';
import Home from './pages/Home';
import theme from './utils/theme';

import 'normalize.css';

export default function Application() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ApplicationRoute component={Home} path="/" />
      </BrowserRouter>
    </ThemeProvider>
  );
}
