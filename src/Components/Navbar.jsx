import React from 'react';
import { FaUsers } from 'react-icons/fa';
import './Navbar.css';
import { useState } from 'react';

const Navbar = () => {

  return (
    <nav className='navbar'>
      <ul className='navbar-list'>
        <li><a href="/">Inicio</a></li>
        <li><a href="buscador">Agrupaciones</a></li>
        <li><a href="paypal">Donaciones</a></li>
        <li><a href="#"><FaUsers /> </a></li>
      </ul>
    </nav>
  );
};

export default Navbar;


