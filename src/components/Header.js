import logo from '../images/header__logo.svg'
function Header() {
    return (
      <header className="page__header header">
        <img className="header__logo" src={logo} alt="логотип место" />
      </header>
    );
  }

export default Header;
