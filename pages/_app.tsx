import { AppProps } from 'next/app';
import HeadTags from '../components/HeadTags';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <HeadTags {...pageProps} />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
