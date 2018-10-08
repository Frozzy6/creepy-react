import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.loginRef = React.createRef();
    this.state = {
      login: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleChange(event) {
    const {
      name: key,
      value,
    } = event.target;
    this.setState({ [key]: value });
    event.preventDefault();
  }

  handleSubmitForm(event) {
    const {
      target,
    } = event;
    const {
      login,
      password,
    } = this.state;
    const { handleAuthClick } = this.props;

    event.preventDefault();

    if (login.length === 0) {
      target.querySelector('[name=login]').focus();
      return false;
    }

    if (password.length === 0) {
      target.querySelector('[name=password]').focus();
      return false;
    }

    handleAuthClick(login, password);
  }

  componentDidMount() {
    if (this.props.forceFocus) {
      this.loginRef.current.focus();
    }
  }

  render() {
    const {
      authState,
      handleRegisterClick,
    } = this.props;

    const wrongAuthHtml = (authState.get('fail') ? (
      <div className="controls-block">
        <div className="auth-bad">Ошибка. Неверные данные авторизации</div>
      </div>
    ) : null);

    const loadingHTML = (authState.get('loading') ? (
        <div className="loading auth-loading">
          <img src="/images/spinner.svg"/>
        </div>
    ) : null);

    this.exitCallback = (e) => {
      e.preventDefault();
    };
    return (
      <form className="auth-form" onSubmit={this.handleSubmitForm}>
        <div className="controls-block">
          <input
            ref={this.loginRef}
            placeholder="Логин"
            name="login"
            type="text"
            autoComplete="off"
            maxLength="50"
            value={this.state.login}
            onChange={this.handleChange}
          />
          <input
            placeholder="Пароль"
            name="password"
            type="password"
            autoComplete="off"
            maxLength="50"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <div className="controls-block">
          <button
            className="signup-btn"
            type="submit"
          >
            Войти
          </button>
          <div className="wanna-register">
            <p>Нет аккаунта?</p>
            <a onClick={handleRegisterClick}>
              Регистрация
            </a>
          </div>
        </div>
        { wrongAuthHtml }
        { loadingHTML }
      </form>
    );
  }
}

AuthForm.propTypes = {
  handleAuthClick: PropTypes.func.isRequired,
  handleRegisterClick: PropTypes.func.isRequired,
  forceFocus: PropTypes.bool.isRequired,
  authState: PropTypes.shape({}).isRequired,
};

export default AuthForm;
