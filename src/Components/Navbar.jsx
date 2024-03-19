import React from 'react';
import { FaUsers } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Agrupaciones</a></li>
        <li><a href="#">Donaciones</a></li>
        <li><a href="#"><FaUsers /> </a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
