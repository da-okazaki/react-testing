import { useCounter } from '../hooks/useCounter';
import { act, renderHook } from '@testing-library/react-hooks';
import { cleanup } from '@testing-library/react';

afterEach(() => cleanup());
describe('useCounter custom Hooks', () => {
  it('Should increment by 1', () => {
    const { result } = renderHook(() => useCounter(3));
    expect(result.current.count).toBe(3);
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(4);
  });
  it('Should decrement by 1', () => {
    const { result } = renderHook(() => useCounter(2));
    expect(result.current.count).toBe(2);
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(1);
  });
  it('Should double the counter value', () => {
    const { result } = renderHook(() => useCounter(3));
    expect(result.current.count).toBe(3);
    act(() => {
      result.current.double();
    });
    expect(result.current.count).toBe(6);
  });
  it('Should tripple the counter value', () => {
    const { result } = renderHook(() => useCounter(2));
    expect(result.current.count).toBe(2);
    act(() => {
      result.current.triple();
    });
    expect(result.current.count).toBe(6);
  });
  it('Should reset by 0', () => {
    const { result } = renderHook(() => useCounter(3));
    expect(result.current.count).toBe(3);
    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(0);
  });
});
