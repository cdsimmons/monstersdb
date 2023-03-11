
import type { ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';
import ImgLogo from '../assets/svg/logo-light.svg'

type MainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: MainProps) => (
  <div className="w-full antialiased">
    {props.meta}

		<header role="site-header" className="w-full mx-auto bg-gray-800 text-white shadow">
			<div className="container px-6 justify-between h-16 flex items-center lg:items-stretch mx-auto">
				<div className="h-full flex items-center">
					<div aria-label="Home" role="logo" className="mr-10 flex items-center">
						<ImgLogo height="40" />
						<h3 className="text-base font-bold tracking-normal leading-tight ml-5 hidden lg:block">Monster DB</h3>
					</div>
				</div>
				<div className="h-full xl:flex items-center justify-end hidden">
					Login
				</div>
			</div>
		</header>

		<div>
      <main className="content text-xl text-gray-800">{props.children}</main>

      <footer role="site-footer" className="bg-gray-800 text-white py-8 text-center text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}.
      </footer>
    </div>
  </div>
);

export default Main;
