
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import MonsterPage from '@/pages/monsters/[key]';
import { APIMonster } from '@/types/monster';

describe('Index page', () => {
  describe('Render method', () => {
    it('should have search', () => {
			const testMonster: APIMonster = {
				_id: '',
				imageUrl: '',
				key: 'test-monster',
				name: 'Test Monster',
				type: 'Unknown',
				size: 'Unknown',
				alignment: 'Neutral',
				description: 'This is a test monster for testing.',
				environments: ['Plains', 'Desert'],
				source: 'scrape',
				approved: true
			};

      render(<MonsterPage stringifiedMonster={JSON.stringify(testMonster)}/>);

			const main = screen.getByTestId('main');

      expect(main).toHaveTextContent(testMonster.description);
    });
  });
});