import React from 'react';

function Login({handleLogin}) {

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
    handleLogin(password, email);
  }


  return (
    <>
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
    </>
  );
}

export default Login;
