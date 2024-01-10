import React from 'react';
import type { Preview } from '@storybook/react';

import { ThemeProvider } from 'styled-components';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import GlobalStyle from '../src/styles/GlobalStyle.tsx';
import { LightTheme, DarkTheme } from '../src/styles/theme.ts';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: LightTheme,
      dark: DarkTheme,
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles: GlobalStyle,
  }),
];

export default preview;
