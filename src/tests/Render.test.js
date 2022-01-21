import React from 'react';
import { render, screen } from '@testing-library/react';

import Render from '../Render';

// test suites
describe('Rendering', () => {
  // test block
  test('Should render all the elements correctry', () => {
    render(<Render />);
    // screen.debug(screen.getByRole('heading'));

    // judge - 判定
    // toBeTruthy - 存在する
    expect(screen.getByRole('heading')).toBeTruthy();
    expect(screen.getByRole('textbox')).toBeTruthy();

    // 複数エレメントが存在する場合は「getAllByRole」を利用する
    expect(screen.getAllByRole('button')[0]).toBeTruthy();
    expect(screen.getAllByRole('button')[1]).toBeTruthy();
    expect(screen.getByText('Udemy')).toBeTruthy();
    expect(screen.getByText('@React'));
  });
});
