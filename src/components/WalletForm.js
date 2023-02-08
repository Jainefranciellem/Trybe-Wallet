import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { thunkCurrency, thunkQuotation, sendExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    method: 'Dinheiro',
    currency: 'USD',
    tag: 'Alimentação',
    id: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(thunkCurrency());
  }

  saveEditExpense = () => {
    const { dispatch } = this.props;
    dispatch(sendExpenses(this.state));
    this.setState({ value: '', description: '' });
  };

  handleChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(thunkQuotation({ ...this.state }));

    this.setState({
      value: '',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      currency: 'USD',
    });
  };

  render() {
    const { value, description, method, tag, currency } = this.state;
    const { currencies, editor } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="Number"
            id={ value }
            value={ value }
            data-testid="value-input"
            onChange={ ({ target }) => this.handleChange('value', target.value) }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            id={ description }
            value={ description }
            data-testid="description-input"
            onChange={ ({ target }) => this.handleChange('description', target.value) }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            id={ currency }
            value={ currency }
            data-testid="currency-input"
            onChange={ ({ target }) => this.handleChange('currency', target.value) }
          >
            {
              currencies.length
                ? currencies.map((coin) => (
                  <option key={ coin }>{coin}</option>
                ))
                : null
            }
          </select>
        </label>
        <label htmlFor="method-input">
          Método de Pagamento:
          <select
            id={ method }
            value={ method }
            data-testid="method-input"
            onChange={ ({ target }) => this.handleChange('method', target.value) }
          >
            <option value="Dinheiro">
              Dinheiro
            </option>
            <option value="Cartão de crédito">
              Cartão de crédito
            </option>
            <option value="Cartão de débito">
              Cartão de débito
            </option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select
            id={ tag }
            value={ tag }
            data-testid="tag-input"
            onChange={ ({ target }) => this.handleChange('tag', target.value) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Saúde">Saúde</option>
            <option value="Lazer">Lazer</option>
            <option value="Transporte">Transporte</option>
          </select>
        </label>
        <button
          type="button"
          data-testid="save-btn"
          onClick={ editor ? this.saveEditExpense : this.handleClick }
        >
          { editor ? 'Editar despesa' : 'Adicionar despesa' }
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  exchangeRates: state.wallet.exchangeRates,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
