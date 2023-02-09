import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions/index';
import imgLogo from '../imgs/Group 1.png'
import '../style/Login.css'

class Login extends React.Component {
  state = {
    isDisable: true,
    email: '',
    password: '',
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  handleChange = (key, value) => {
    this.setState({
      [key]: value,
    }, () => this.validation());
  };

  validation = () => {
    const maxCharacter = 6;
    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const { email, password } = this.state;
    const validateEmail = regexEmail.test(email);
    const validatePassword = password.length >= maxCharacter;
    const valid = !(validateEmail && validatePassword);
    this.setState({
      isDisable: valid,
    });
  };

  render() {
    const { isDisable, email, password } = this.state;
    return (
      <section className="container">
        <div className="divLogin">
          <img className="imgLogo" src={ imgLogo } alt="" />
          <input
            type="email"
            id={ email }
            className="inputLogin"
            placeholder="Email"
            data-testid="email-input"
            onChange={ ({ target }) => this.handleChange('email', target.value) }
          />
          <input
            type="password"
            className="inputLogin"
            placeholder="Senha"
            data-testid="password-input"
            id={ password }
            onChange={ ({ target }) => this.handleChange('password', target.value) }
          />
        <button
          className='buttonLogin'
          type="text"
          disabled={ isDisable }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
        </div>

      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
