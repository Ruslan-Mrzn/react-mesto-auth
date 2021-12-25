import React from 'react';
import { Link } from 'react-router-dom';
function Register({onRegister}) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [emailIsValid, setEmailIsValid] = React.useState('true');
  const [passwordIsValid, setPasswordIsValid] = React.useState('true');
  const [formIsValid, setFormIsValid] = React.useState('false');

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value)
    setEmailError(evt.target.validationMessage)
    setEmailIsValid(evt.target.validity.valid)
  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value)
    setPasswordError(evt.target.validationMessage)
    setPasswordIsValid(evt.target.validity.valid)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onRegister(password, email)
  }

  // При открытии страницы поля должны быть пустыми, ошибки валидации скрыты, кнопка сабмита недоступна
  React.useEffect(() => {
    setFormIsValid(emailIsValid && passwordIsValid && email !== '' && password !== '');
  }, [email, password, emailIsValid, passwordIsValid]);

  return (
    <>
      <main className="page__content content">
        <section className="page__register register">
          <form className="form form_type_register" name={`register-form`} onSubmit={handleSubmit} noValidate={true}>
            <h2 className="form__title form__title_type_register">Регистрация</h2>
            <input autoComplete="on" type="email" onChange={handleEmailChange} value={email || ''} className={`form__text-input form__text-input_type_register`} name="email" placeholder="Email" required />
            <span className={`form__error ${emailIsValid ? '' : 'form__error_visible'}`}>{emailError}</span>
            <input autoComplete="off" type="password" minLength="4" onChange={handlePasswordChange} value={password || ''} className={`form__text-input form__text-input_type_register`} name="password" placeholder="Пароль" required />
            <span className={`form__error ${passwordIsValid ? '' : 'form__error_visible'}`}>{passwordError}</span>
            <button type="submit" disabled={formIsValid ? false : true} className={`form__submit-button form__submit-button_type_register`} value="Зарегистрироваться">Зарегистрироваться</button>
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
