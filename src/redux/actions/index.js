// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const SEND_EXPENSES = 'SEND_EXPENSES';

export const addEmail = (payload) => (
  { type: ADD_EMAIL, payload }
);

export const searchSuccess = (payload) => (
  { type: SEARCH_SUCCESS, payload }
);

export const addExpenses = (payload) => (
  { type: ADD_EXPENSES, payload }
);

export const deleteExpenses = (payload) => (
  { type: DELETE_EXPENSES, payload }
);

export const editExpenses = (payload) => (
  { type: EDIT_EXPENSES, payload }
);

export const sendExpenses = (payload) => (
  { type: SEND_EXPENSES, payload }
);

export function thunkCurrency() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => dispatch(searchSuccess(data)));
  };
}

export function thunkQuotation(prevExpenses) {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const ratesExpenses = { ...prevExpenses, exchangeRates: data };
    dispatch(addExpenses(ratesExpenses));
  };
}
