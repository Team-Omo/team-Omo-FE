import React, { useEffect } from 'react';
import Routers from './shared/Routers';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { LightTheme, DarkTheme } from './styles/theme.ts';
import useThemeStore from './store/theme/themeStore.js';
import useApiError from './hooks/reactQuery/useApiError.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

const App = () => {
  const { themeMode } = useThemeStore();

  const { handleError } = useApiError();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
      mutations: {
        onError: handleError,
      },
    },
  });

  useEffect(() => {
    console.log(`
      OOOOOOOOO     MMMMMMMM               MMMMMMMM     OOOOOOOOO     
    OO:::::::::OO   M:::::::M             M:::::::M   OO:::::::::OO   
  OO:::::::::::::OO M::::::::M           M::::::::M OO:::::::::::::OO 
 O:::::::OOO:::::::OM:::::::::M         M:::::::::MO:::::::OOO:::::::O
 O::::::O   O::::::OM::::::::::M       M::::::::::MO::::::O   O::::::O
 O:::::O     O:::::OM:::::::::::M     M:::::::::::MO:::::O     O:::::O
 O:::::O     O:::::OM:::::::M::::M   M::::M:::::::MO:::::O     O:::::O
 O:::::O     O:::::OM::::::M M::::M M::::M M::::::MO:::::O     O:::::O
 O:::::O     O:::::OM::::::M  M::::M::::M  M::::::MO:::::O     O:::::O
 O:::::O     O:::::OM::::::M   M:::::::M   M::::::MO:::::O     O:::::O
 O:::::O     O:::::OM::::::M    M:::::M    M::::::MO:::::O     O:::::O
 O::::::O   O::::::OM::::::M     MMMMM     M::::::MO::::::O   O::::::O
 O:::::::OOO:::::::OM::::::M               M::::::MO:::::::OOO:::::::O
  OO:::::::::::::OO M::::::M               M::::::M OO:::::::::::::OO 
    OO:::::::::OO   M::::::M               M::::::M   OO:::::::::OO   
      OOOOOOOOO     MMMMMMMM               MMMMMMMM     OOOOOOOOO     
    `);
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider theme={themeMode === 'LightMode' ? LightTheme : DarkTheme}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routers />
            <Toaster
              toastOptions={{
                success: {
                  style: {
                    background: '#C6F6D5',
                    fontSize: '16px',
                    borderRadius: '5px',
                  },
                },
                loading: {
                  style: {
                    fontSize: '16px',
                    borderRadius: '5px',
                  },
                },
                error: {
                  style: {
                    background: '#FED7D7',
                    fontSize: '16px',
                    borderRadius: '5px',
                  },
                },
              }}
            />
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
