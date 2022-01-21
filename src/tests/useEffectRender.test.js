import React from 'react';
import { render, screen } from '@testing-library/react';
import EffectRender from '../useEffectRender';

describe('useEffect rendering', () => {
  test('Should render only after async function', async () => {
    render(<EffectRender />);
    // 非同期前は画面に「I am」が表示されない
    expect(screen.queryByText(/I am/)).toBeNull();
    // 非同期後は画面に「I am」が表示されない
    expect(await screen.findByText(/I am/)).toBeInTheDocument();
  });
});
