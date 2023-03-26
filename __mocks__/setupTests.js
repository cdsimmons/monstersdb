import { configure } from '@testing-library/react';
import { useSession } from './mockSession';

configure({ testIdAttribute: 'data-testid' });

jest.mock('next-auth/react', () => ({
  __esModule: true,
  useSession,
}));