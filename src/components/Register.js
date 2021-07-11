import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/header__logo.svg'
function Register() {
    return (
      <>
        <header className="page__header header">
          <img className="header__logo" src={logo} alt="логотип место" />
          <Link to="signin" className="header__link">Войти</Link>
        </header>

        <main className="page__content content">
          <section className="page__register register">
            <form className="form form_type_register" name={`register-form`} >
              <h2 className="form__title form__title_type_register">Регистрация</h2>
              <input autoComplete="off" type="email" className={`form__text-input form__text-input_type_register`} name="email" placeholder="Email" required />
              <span className={`form__error`}></span>
              <input autoComplete="off" type="password" className={`form__text-input form__text-input_type_register`} name="password" placeholder="Пароль" required />
              <span className={`form__error`}></span>
              <button type="submit" className={`form__submit-button form__submit-button_type_register`} value="Зарегистрироваться">Зарегистрироваться</button>
              <p className="form__is-registered">
                Уже зарегистрированы?&nbsp;
                <Link to="signin" className="form__link">Войти</Link>
              </p>
            </form>
          </section>
        </main>
      </>
    );
  }

export default Register;