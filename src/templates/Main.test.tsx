import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Main from './Main';
// @ts-ignore
import { mockSession } from '@/../__mocks__/mockSession';


describe('Main template', () => {
  describe('Render method', () => {
    it('should have header', () => {
      render(<Main meta={null}>{null}</Main>);

      const siteHeader = screen.getByRole('site-header');
			const logo = screen.getByRole('logo');

      expect(siteHeader).toBeInTheDocument();
      expect(siteHeader).toContainElement(logo);
    });

    it('should have footer', () => {
      render(<Main meta={null}>{null}</Main>);

      const siteFooter = screen.getByRole('site-footer');

      expect(siteFooter).toBeInTheDocument();
      expect(siteFooter).toHaveTextContent('Copyright');
    });
  });
});
