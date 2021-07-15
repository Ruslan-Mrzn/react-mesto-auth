import logo from '../images/header__logo.svg'
function Header({email, onLogout}) {
    return (
      <header className="page__header header">
        <img className="header__logo" src={logo} alt="логотип место" />
        <span className="header__email">{email}</span>
        <button type="button" onClick={onLogout} className="header__logout-button" value="выход из профиля">Выйти</button>
      </header>
    );
  }

export default Header;
