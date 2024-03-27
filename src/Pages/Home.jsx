import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home1-container">
      <div className='container'>
        <div className="main-title-container">
          <h1 className="title">MetroGroup</h1>
          <p className='description'>Descubre el mundo de las agrupaciones en la Unimet y únete a la que más te apasione. Hay opciones para todos los intereses. ¡No te pierdas la oportunidad de formar parte de algo increíble!</p>
          <div className="home-btns">
            <button className="quienes-somos-btn">¿Quiénes somos?</button>
            <button className="descubre-mas-btn">Descubre más</button>
          </div>
        </div>
      </div>

      <div className="scnd-homepage-container">
        <h2 className="second-description"> Descubre tu pasión y marca la diferencia en nuestra comunidad universitaria. Conoce más sobre las agrupaciones estudiantiles AQUÍ</h2>
        <div className="descubre-mas-container">
          <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQUUWZUdfqmhqtfqejPkB1drM6F8zo_G9_scZLI1vanyV9t8NgP" className="circular-image" alt="Imagen Circular"/>
          <div className="text-btn-container">
            <p className="descubre-mas-desc">Regístrate ahora y forma parte de una agrupación!</p>
            <button className="registrarse-btn">Registrarse</button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Home

