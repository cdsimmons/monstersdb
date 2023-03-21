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
	css?: string;
};

const MyApp = ({ Component, pageProps, css }: MyAppProps) => {
	const isAmp = useAmp();

	return (
		<>
			{isAmp && css && <style jsx global>{css}</style>}
			<Component {...pageProps} />
		</>
	)
};

// Might compare performance between AMP and regular NextJS later, however have to do a workaround - https://github.com/vercel/next.js/issues/10549
// MyApp.getServerSideProps = async () => {
//   const res = await fetch('http://localhost:3000/global.css');
// 	const css = await res.text();
//   return { css }
// }

export default MyApp;
