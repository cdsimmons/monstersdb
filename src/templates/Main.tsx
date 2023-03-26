
import type { ReactNode } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { AppConfig } from '@/utils/AppConfig';
import ImgLogo from '../assets/svg/logo-light.svg'

type MainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: MainProps) => {
	const { data: session } = useSession();

	return (
		<div className="w-full antialiased bg-white">
			{props.meta}
			

			<header role="site-header" className="w-full mx-auto bg-gray-800 text-white shadow">
				<div className="container px-6 justify-between h-16 flex items-center items-stretch mx-auto">
					<div className="h-full flex items-center">
						<Link href="/" aria-label="Home" role="logo" className="mr-10 flex items-center text-white">
							<ImgLogo height="40" />
							<h3 className="text-base font-bold tracking-normal leading-tight ml-5 hidden lg:block">{AppConfig.title}</h3>
						</Link>
					</div>
					<div className="h-full flex items-center justify-end">
						{session ? (
							<button onClick={() => signOut()} className="text-white">
								Logout
							</button>
						) : (
							<button onClick={() => signIn()} className="text-white">
								Login
							</button>
						)}
					</div>
				</div>
			</header>

			<div>
				<main className="content text-xl text-gray-800" data-testid="main">{props.children}</main>

				<footer role="site-footer" className="bg-gray-800 text-white py-8 text-center text-sm">
					© Copyright {new Date().getFullYear()} {AppConfig.title}.
				</footer>
			</div>
		</div>
	)
};

export default Main;
