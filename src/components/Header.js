import { Link, useLocation } from 'react-router-dom';
import logo from '../images/header__logo.svg'
function Header({email, onLogout, isLoggedIn}) {

  const location = useLocation();

    return (
      <header className="page__header header">
        <img className="header__logo" src={logo} alt="логотип место" />
        {isLoggedIn && (
          <span className="header__email">{email}</span>
        )}
        {isLoggedIn && (
          <button type="button" onClick={onLogout} className="header__logout-button" value="выход из профиля">Выйти</button>
        )}

        {!isLoggedIn && location.pathname === '/signup' && (
          <Link to="signin" className="header__link">Войти</Link>
        )}

        {!isLoggedIn && location.pathname === '/signin' && (
          <Link to="signup" className="header__link">Регистрация</Link>
        )}
      </header>
    );
  }

export default Header;
