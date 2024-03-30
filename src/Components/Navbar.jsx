import React, { useState, useEffect } from 'react';
import { FaUsers } from 'react-icons/fa';
import './Navbar.css';
import { onAuthStateChanged } from 'firebase/auth';
import { findUserByEmail } from '../../firebase';
import { auth } from '../../firebase';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await findUserByEmail(user.email);
        setCurrentUser(userData);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <nav className='navbar'>
      <ul className='navbar-list'>
        <li><a href="/">Inicio</a></li>
        <li><a href="/buscador">Agrupaciones</a></li>
        {currentUser && (
          <>
            <li>
              <a href="/paypal">
                 Donaciones
              </a>
            </li>
            <li>
              <a href="/account">
                <FaUsers /> {currentUser.nombre}
              </a>
            </li>
          </>
        )}
        {!currentUser && (
          <li><a href="/login"><FaUsers /> </a></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;