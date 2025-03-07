import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    window.location.reload();
  };

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (email) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">StayHealthy</Link>
      </div>
      <div>
        <Link to="/instant-consultation" className="nav-link">
          Instant Booking
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search/doctors">Appointments</Link>
        </li>
        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
