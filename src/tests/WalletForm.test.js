import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import WalletForm from '../components/WalletForm';
import mockData from './helpers/mockData';

describe('testa a página wallet', () => {
  afterEach(() => { jest.restoreAllMocks(); });
  it('testa se a página wallet é renderizada na rota "/carteira" ', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });
    screen.getByRole('button', { name: /adicionar despesa/i });
  });

  it('testa se todos os campos são renderizados na tela', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });
    screen.getByTestId('value-input');
    screen.getByTestId('description-input');
    screen.getByTestId('currency-input');
    screen.getByTestId('method-input');
    screen.getByTestId('tag-input');
  });

  it('testa se o button chama o fetch da API', async () => {
    jest.spyOn(global, 'fetch');
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
  });

  const initialState = {
    wallet: {
      currencies: Object.keys(mockData).filter((curr) => curr !== 'USDT'),
      expenses: [],
      editor: false,
      idToEdit: 0,
    },
  };

  it('testa se o estado global é um array com as moedas retornadas pela API, sem a opção "USDT"', async () => {
    const { store } = renderWithRouterAndRedux(<WalletForm />, {
      initialState,
    });
    const { currencies } = store.getState().wallet;
    expect(Array.isArray(currencies)).toBeTruthy();
    expect(currencies.includes('USDT')).toBeFalsy();
  });
});
