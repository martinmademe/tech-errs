import { AppProps } from 'next/app';
import { AppProvider } from '../store';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => (
  <AppProvider>
    <Component {...pageProps} />
  </AppProvider>
);

export default App;