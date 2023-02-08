import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style/Header.css';

class Header extends Component {
  handleTotalField = (expenses) => {
    let quotation = 0;
    expenses.forEach(({ value, exchangeRates, currency }) => {
      quotation += value * exchangeRates[currency].ask;
    });
    return quotation.toFixed(2);
  };

  render() {
    const { email, expenses } = this.props;
    return (
      <section className="sectionHeader">
        <p className="email-field" data-testid="email-field">{ email }</p>
        Total de despesas:
        <p className="total-field" data-testid="total-field">{ this.handleTotalField(expenses) }
        BRL
        </p>
      </section>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
