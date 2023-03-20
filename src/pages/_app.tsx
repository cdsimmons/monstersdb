import type { AppProps } from 'next/app';
import { useAmp } from 'next/amp'
import '../styles/global.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

type MyAppProps = AppProps & {
	css: string;
};

const MyApp = ({ Component, pageProps, css }: MyAppProps) => {
	const isAmp = useAmp();

	return (
		<>
			{isAmp && <style jsx global>{css}</style>}
			<Component {...pageProps} />
		</>
	)
};

MyApp.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/global.css');
	const css = await res.text();
  return { css }
}

export default MyApp;
