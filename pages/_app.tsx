import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import { ThemeProvider, CssBaseline, Theme } from '@mui/material';
import { customTheme, darkTheme, lightTheme } from '../themes'
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

interface Props extends AppProps {
  theme: string;
}

export default function App({ Component, pageProps, theme = 'dark' }: Props) {

  const [currentTheme, setCurrentTheme] = useState(lightTheme)

  useEffect(() => {
    
    const cookieTheme = Cookies.get('theme') || 'light';
    const selectedTheme: Theme = cookieTheme === 'light'
      ? lightTheme
      : cookieTheme === 'dark'
        ? darkTheme
        : customTheme;

      setCurrentTheme( selectedTheme );
  }, [])


  return (
    <ThemeProvider theme={ currentTheme }>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}


// App.getInitialProps = async ( appContext: AppContext ) => {

//   const { theme } = appContext.ctx.req ? ( appContext.ctx.req as any).cookies : { theme: 'light' };



//   const validThemes = [ 'light', 'dark', 'custom' ];

//   return {
//     theme: validThemes.includes( theme ) ? theme : 'dark',
//   }
// }