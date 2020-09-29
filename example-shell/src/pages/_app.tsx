import type { AppProps } from 'next/app';
import '@next-stitch/next-stitch-test-package/dist/bundle-22e3f067.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
