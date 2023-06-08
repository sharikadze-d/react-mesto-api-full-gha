import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

export default function Header({ loggedIn, buttonText, buttonLink, userMail, onExitClick }) {
  return (
    <header className="header">
      <a href="#" className="logo opacity"><img src={logo} alt="Логотип Mesto" className="logo__image" /></a>
      <div className="header__inner">
        {loggedIn && <p className="header__email">{userMail}</p>}
        {loggedIn && <Link to="/sign-up" className="header__logout opacity" onClick={onExitClick}>Выйти</Link>}
        {!loggedIn && <Link to={buttonLink || '#'} className="header__link opacity" >{buttonText}</Link>}
      </div>
    </header>
  );
}