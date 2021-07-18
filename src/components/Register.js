import React from 'react';
import { Link } from 'react-router-dom';
function Register({onRegister}) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value)
  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onRegister(password, email)
  }

  return (
    <>
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
    </>
  )
}

export default Register;
