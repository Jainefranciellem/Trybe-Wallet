import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Table from '../components/Table';
import mockData from './helpers/mockData';
import * as actions from '../redux/actions/index';

describe('testa o componente Table', () => {
  const initialState = {
    wallet: {
      currencies: Object.keys(mockData),
      expenses: [
        {
          id: 0,
          value: '10',
          description: 'teste',
          currency: 'USD',
          method: 'Dinheiro',
          tag: 'Alimentação',
          exchangeRates: mockData,
        },
      ],
    },
  };
  it('testa se a tabela é renderizada com sucesso', () => {
    renderWithRouterAndRedux(<Table />, { initialState });

    screen.queryByRole('columnheader', { name: /descrição/i });
    screen.queryByRole('columnheader', { name: /tag/i });
    screen.queryByRole('columnheader', { name: /método de pagamento/i });
    screen.queryByRole('columnheader', { name: /^valor$/i });
    screen.queryByRole('columnheader', { name: /^moeda$/i });
    screen.queryByRole('columnheader', { name: /câmbio utilizado/i });
    screen.queryByRole('columnheader', { name: /valor convertido/i });
    screen.queryByRole('columnheader', { name: /moeda de conversão/i });
    screen.queryByRole('columnheader', { name: /editar\/excluir/i });
  });

  it('testa se o butão de deletar está funcionando', async () => {
    const spyOnButton = jest.spyOn(actions, 'deleteExpenses');
    renderWithRouterAndRedux(<Table />, { initialState });
    const removeButton = screen.getAllByRole('button', { name: /remover/i })[0];
    userEvent.click(removeButton);
    expect(spyOnButton).toHaveBeenCalled();
  });

  it('testa se o butão de editar está funcionando', async () => {
    const spyOnButton = jest.spyOn(actions, 'editExpenses');
    renderWithRouterAndRedux(<Table />, { initialState });
    const editButton = screen.getAllByRole('button', { name: /editar/i })[0];
    userEvent.click(editButton);
    expect(spyOnButton).toHaveBeenCalled();
  });
});
