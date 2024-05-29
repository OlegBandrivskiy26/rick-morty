import "./Header.css";
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="navbar">
        <NavLink to="/" end className={({ isActive }) => isActive ? "active__link" : "link__hover"}>Episodes</NavLink>
        <NavLink to="/characters" className={({ isActive }) => isActive ? "active__link" : "link__hover"}>Characters</NavLink>
        <NavLink to="/locations" className={({ isActive }) => isActive ? "active__link" : "link__hover"}>Locations</NavLink>
      </div>
    </header>
  );
};

export default Header;