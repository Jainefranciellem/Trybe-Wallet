import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style/Header.css';
import coin from '../imgs/Moedas.svg'
import profile from '../imgs/Vector.svg'
import imgLogo from '../imgs/Group 1.png'

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
        <img src={imgLogo} alt="" />
        <p className="total-field" data-testid="total-field">
          <img src={ coin } alt="" />
        Total de despesas:
        {' '}
        { this.handleTotalField(expenses) }
        {' '}
        BRL
        </p>
        <p className="email-field" data-testid="email-field">
          <img src={ profile } alt="" />
          { email }
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
