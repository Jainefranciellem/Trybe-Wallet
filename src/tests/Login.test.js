import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('testa a página de login', () => {
  it('testa se a página login é renderizada na rota "/" ', () => {
    renderWithRouterAndRedux(<App />);
    screen.getByRole('button', { name: /entrar/i });
  });

  it('testa se o campo de email senha e o botão é renderizado na tela', () => {
    renderWithRouterAndRedux(<App />);
    screen.getByRole('textbox');
    screen.getByPlaceholderText(/senha/i);
    screen.getByRole('button', { name: /entrar/i });
  });

  it('testa se o botão está desabilitado enquanto o email e senha não forem digitados', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByText(/entrar/i)).toBeDisabled();

    userEvent.type(screen.getByTestId('email-input'), 'fran@gmail.com');
    userEvent.type(screen.getByTestId('password-input'), '123456');
    expect(screen.getByText(/entrar/i)).toBeEnabled();
  });

  it('testa se ao clicar no botão será renderizada a rota da carteira', () => {
    renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByTestId('email-input'), 'teste@gmail.com');
    userEvent.type(screen.getByTestId('password-input'), '123456');
    userEvent.click(screen.getByRole('button', { name: /entrar/i }));
    screen.getByRole('button', { name: /adicionar despesa/i });
  });

  const initialStateMock = {
    user: {
      email: 'teste@gmail.com',
    },
  };

  it('testa se o email é salvo no estado global', () => {
    renderWithRouterAndRedux(<App />, {
      initialState: initialStateMock,
      initialEntries: ['/carteira'],
    });
    screen.getByText(/teste@gmail.com/i);
  });
});
