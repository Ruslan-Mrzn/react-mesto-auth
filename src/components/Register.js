import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';
import logo from '../images/header__logo.svg'
function Register() {

  const history = useHistory();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isFail, setIsFail] = React.useState(false);

  const closePopup = () => {
    if(isSuccess) {
      setIsSuccess(false);
      history.push({
        pathname: '/signin'
      })
    } else if (isFail) {
      setIsFail(false)
    }
  }

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value)
  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    auth.register(password, email)
      .then((res) => {
        if(res) {
          setIsSuccess(true);

        } else {
          setIsFail(true)
        }
      })
  }



  return (
    <>
      <header className="page__header header">
        <img className="header__logo" src={logo} alt="логотип место" />
        <Link to="signin" className="header__link">Войти</Link>
      </header>

      <main className="page__content content">
        <section className="page__register register">
          <form className="form form_type_register" name={`register-form`} onSubmit={handleSubmit} noValidate={false}>
            <h2 className="form__title form__title_type_register">Регистрация</h2>
            <input autoComplete="on" type="email" onChange={handleEmailChange} value={email || ''} className={`form__text-input form__text-input_type_register`} name="email" placeholder="Email" required />
            <span className={`form__error`}></span>
            <input autoComplete="off" type="password" onChange={handlePasswordChange} value={password || ''} className={`form__text-input form__text-input_type_register`} name="password" placeholder="Пароль" required />
            <span className={`form__error`}></span>
            <button type="submit" className={`form__submit-button form__submit-button_type_register`} value="Зарегистрироваться">Зарегистрироваться</button>
            <p className="form__is-registered">
              Уже зарегистрированы?&nbsp;
              <Link to="signin" className="form__link">Войти</Link>
            </p>
          </form>
        </section>
      </main>

      <InfoTooltip isSuccessOpened={isSuccess} isFailOpened={isFail} onClose={closePopup} />
    </>
  )
}

export default Register;
