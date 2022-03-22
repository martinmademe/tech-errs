import { AppProps } from 'next/app';
import { AppProvider } from '../store';
import '../styles/globals.css';
import Layout from '../components/Layout';

const App = ({ Component, pageProps }: AppProps) => (
  <AppProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </AppProvider>
);

export default App;