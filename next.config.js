/* eslint-disable import/no-extraneous-dependencies */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
	webpack(config, options) {
		// Render SVGs through SVGR
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
		
		// Compile CSS with static name, so that it can be used for AMP as CSS modules are not supported for Nextjs/AMP right now - https://github.com/vercel/next.js/issues/10549
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '../public/global.css',
      })
    );

    return config
  },
});
