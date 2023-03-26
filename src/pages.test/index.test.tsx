import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import IndexPage from '@/pages/index';
// @ts-ignore
import { mockSession } from '@/../__mocks__/mockSession';

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('Index page', () => {
  describe('Render method', () => {
    it('should have search', () => {
      render(<IndexPage stringifiedMonsters="[]"/>);

      const search = screen.getByRole('search');

      expect(search).toBeInTheDocument();
    });
  });
});
