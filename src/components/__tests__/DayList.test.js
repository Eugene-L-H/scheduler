import React from 'react';

import { render, cleanup } from '@testing-library/react';

import DayList from 'components/DayList';

afterEach(cleanup);

describe('DayList', () => {
  it('renders without crashing', () => {
    render(<DayList />);
  });
});
