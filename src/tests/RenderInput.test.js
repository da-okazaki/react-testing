import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RenderInput from '../RenderInput';

afterEach(() => cleanup());

describe('Rendering', () => {
  test('Should render all the elements correctly', () => {
    render(<RenderInput />);
    expect(screen.getByRole('button')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter')).toBeTruthy();
  });
});

describe('Input form onChange event', () => {
  test('Should update input value correctly', () => {
    render(<RenderInput />);
    const inputValue = screen.getByPlaceholderText('Enter');
    userEvent.type(inputValue, 'test');
    expect(inputValue.value).toBe('test');
  });
});

describe('Console button conditionally triggred', () => {
  test('Should not trigger output function', () => {
    const outputConsole = jest.fn();
    render(<RenderInput outputConsole={outputConsole} />);
    userEvent.click(screen.getByRole('button'));
    expect(outputConsole).not.toHaveBeenCalled();
  });

  test('Should trigger output function', () => {
    const outputConsole = jest.fn();
    render(<RenderInput outputConsole={outputConsole} />);
    const inputValue = screen.getByPlaceholderText('Enter');
    userEvent.type(inputValue, 'test');
    userEvent.click(screen.getByRole('button'));
    expect(outputConsole).toHaveBeenCalledTimes(1);
  });
});
