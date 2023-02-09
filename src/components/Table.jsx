import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpenses, editExpenses } from '../redux/actions';
import '../style/Table.css';
import editSVG from '../imgs/Vector (1).svg'
import deleteSVG from '../imgs/Vector (2).svg'

class Table extends Component {
  deleteExpense = (idExpense) => {
    const { dispatch } = this.props;
    dispatch(deleteExpenses(idExpense));
  };

  editExpense = (expense) => {
    const { dispatch } = this.props;
    dispatch(editExpenses(expense));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th className="th1">Descrição</th>
            <th className="th">Tag</th>
            <th className="th">Método de pagamento</th>
            <th className="th">Valor</th>
            <th className="th">Moeda</th>
            <th className="th">Câmbio utilizado</th>
            <th className="th">Valor convertido</th>
            <th className="th">Moeda de conversão</th>
            <th className="th">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => (
              <tr key={ expense.id }>
                <td className="td">{ expense.description }</td>
                <td className="td">{ expense.tag }</td>
                <td className="td">{ expense.method }</td>
                <td className="td">{ Number(expense.value).toFixed(2) }</td>
                <td className="td">{ expense.exchangeRates[expense.currency].name.split('/')[0] }</td>
                <td className="td">
                  {Number(expense.exchangeRates[expense.currency]
                    .ask).toFixed(2)}
                </td>
                <td className="td">
                  {Number(expense.exchangeRates[expense.currency]
                    .ask * expense.value).toFixed(2)}
                </td>
                <td className="td">Real</td>
                <td className="td">
                  <button
                    className="SVG"
                    data-testid="edit-btn"
                    onClick={ () => this.editExpense(expense) }
                  >
                    <img src={ editSVG } alt="" />
                  </button>
                  <button
                    className="SVG"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteExpense(expense.id) }
                  >
                    <img src={ deleteSVG } alt="" />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
