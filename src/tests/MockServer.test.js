import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import MockServer from '../MockServer';
import userEvent from '@testing-library/user-event';

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/users/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: 'Bred dummy' }));
  })
);

beforeAll(() => server.listen());

afterEach(() => {
  server.restoreHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('Mocking API', () => {
  it('[Fetch success] Should display fetched data correctly and button disable', async () => {
    render(<MockServer />);
    userEvent.click(screen.getByRole('button'));
    // APIのレスポンス結果確認
    expect(await screen.findByText('Bred dummy')).toBeInTheDocument();
    // 押下後にボタンがdisabledになっていることを確認
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  it('[Fetch failure] Should display error msg, no render heading and button abled', async () => {
    server.use(
      rest.get('https://jsonplaceholder.typicode.com/users/1', (req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ username: 'Bred dummy' }));
      })
    );
    render(<MockServer />);
    userEvent.click(screen.getByRole('button'));
    // エラーメッセージが表示されていること
    expect(await screen.findByTestId('error')).toHaveTextContent('Fetching Failed !');
    // ボタンが有効化されていること
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
    // UserNameが表示されていないこと
    expect(screen.queryByRole('heading')).toBeNull();
  });
});
