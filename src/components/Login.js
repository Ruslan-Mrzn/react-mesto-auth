import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';
import logo from '../images/header__logo.svg'
function Login({handleLogin}) {

  const history = useHistory();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isFail, setIsFail] = React.useState(false);

  const closePopup = () => {
    setIsFail(false)
  }

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value)
  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    auth.authorize(password, email)
      .then((data) => {
        if(data.token) {
          handleLogin();
          history.push({
            pathname: '/'
          })
        }
      })
      .catch((err) => {
        console.error(err);
        setIsFail(true)
      })
  }


  return (
    <>
      <header className="page__header header">
        <img className="header__logo" src={logo} alt="логотип место" />
        <Link to="signup" className="header__link">Регистрация</Link>
      </header>

      <main className="page__content content">
        <section className="page__register register">
          <form className="form form_type_register" name={`login-form`} noValidate={false} onSubmit={handleSubmit}>
            <h2 className="form__title form__title_type_register">Вход</h2>
            <input autoComplete="on" onChange={handleEmailChange} type="email" value={email || ''} className={`form__text-input form__text-input_type_register`} name="email" placeholder="Email" required />
            <span className={`form__error`}></span>
            <input autoComplete="off" onChange={handlePasswordChange} type="password" value={password || ''} className={`form__text-input form__text-input_type_register`} name="password" placeholder="Пароль" required />
            <span className={`form__error`}></span>
            <button type="submit" className={`form__submit-button form__submit-button_type_register`} value="Войти">Войти</button>
          </form>
        </section>
      </main>

      <InfoTooltip isFailOpened={isFail} onClose={closePopup} />
    </>
  );
}

export default Login;
