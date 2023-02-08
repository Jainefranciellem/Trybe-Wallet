import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('testa o componente Header', () => {
  it('testa se todos os componentes são renderizados corretamente', () => {
    const initialState = {
      user: {
        email: 'teste@gmail.com',
      },
    };
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState,
    });
    screen.getByText(/teste@gmail.com/i);
    screen.getByText(/brl/i);
    const totalField = screen.getByTestId('total-field');
    expect(totalField).toHaveTextContent(/0.00/);
  });
});
