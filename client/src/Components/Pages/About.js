import React from 'react';
import { Link } from 'react-router-dom';

function About({ user, onLogout }) {
  return (
    <div>
      <h2>Welcome, {user?.name}</h2>

      <div className="menu">
        <ul className="menu-bar">
          <li>
            <Link to="/">
              <i className="bx bx-home"></i>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/about" className="active">
              <i className="bx bxs-user-circle"></i>
              <span>About Me</span>
            </Link>
          </li>
          <li>
            <Link onClick={onLogout}>
              <i className="bx bx-log-out-circle"></i>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default About;
