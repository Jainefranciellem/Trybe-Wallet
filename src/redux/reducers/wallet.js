// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SEARCH_SUCCESS, ADD_EXPENSES,
  DELETE_EXPENSES, EDIT_EXPENSES, SEND_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter(
        (curr) => curr !== 'USDT',
      ),
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.payload,
        id: state.expenses.length === 0 ? 0 : state.expenses.length }],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case SEND_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return { ...expense, ...action.payload };
        }
        return expense;
      }),
      editor: false,
    };
  default:
    return state;
  }
};

export default walletReducer;
