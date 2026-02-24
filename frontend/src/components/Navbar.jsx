import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h2 className="logo">My App</h2>
      <ul className="nav-items">
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
