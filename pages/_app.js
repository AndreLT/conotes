import '../styles/globals.css'
import { ProvideAuth } from '../lib/auth';
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <ThemeProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </ProvideAuth>
  );
}

export default MyApp
