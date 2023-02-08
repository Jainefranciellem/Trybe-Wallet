import React from 'react';
import { screen } from '@testing-library/react';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import rootReducer from '../redux/reducers';

const initialState = {
  user: { email: 'teste@teste.com' },
  wallet: {
    currencies: [],
    expenses: [
      {
        value: '',
        description: '',
        method: 'Dinheiro',
        currency: 'USD',
        tag: 'Alimentação',
        id: 0,
        exchangeRates: mockData,
      },
    ],
    editor: false,
    idToEdit: 0,
  },
};

describe('testa a página Wallet', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue(
      { json: () => mockData },
    );
  });
  it('testa se é possível preencher os campos corretamente ', async () => {
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    await act(() => renderWithRouterAndRedux(<Wallet />, { store }));
    const valueInput = screen.getByTestId('value-input');
    userEvent.type(valueInput, '100');
    expect(valueInput).toHaveValue(100);

    const descriptionInput = screen.getByTestId('description-input');
    userEvent.type(descriptionInput, 'calça');
    expect(descriptionInput).toHaveValue('calça');

    const currencyInput = screen.getByTestId('currency-input');
    const arrayCoins = [];
    currencyInput.childNodes.forEach((coin) => arrayCoins.push(coin.innerHTML));
    expect(arrayCoins).toEqual(Object.keys(mockData).filter((coin) => coin !== 'USDT'));
    userEvent.selectOptions(currencyInput, 'USD');
    expect(currencyInput).toHaveValue('USD');

    const methodInput = screen.getByTestId('method-input');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    expect(methodInput).toHaveValue('Dinheiro');

    const tagInput = screen.getByTestId('tag-input');
    userEvent.selectOptions(tagInput, 'Trabalho');
    expect(tagInput).toHaveValue('Trabalho');

    expect(store.getState().wallet.expenses).toHaveLength(1);
    await act(() => userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i })));
    expect(store.getState().wallet.expenses).toHaveLength(2);
  });

  it('testa se é possível editar os campos corretamente', async () => {
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    await act(() => renderWithRouterAndRedux(<Wallet />, { store }));

    const descriptionInput = screen.getByTestId('description-input');
    userEvent.type(descriptionInput, 'calça');
    expect(descriptionInput).toHaveValue('calça');
    await act(() => userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i })));

    const editButton = screen.getAllByRole('button', { name: /editar/i });
    await act(() => userEvent.click(editButton[0]));
    userEvent.type(descriptionInput, 'short');
    expect(descriptionInput).toHaveValue('short');

    const savedEditbtn = screen.getByRole('button', { name: /editar despesa/i });
    await act(() => userEvent.click(savedEditbtn));
    expect(savedEditbtn).toBeInTheDocument();
  });
});
