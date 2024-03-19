import React from 'react';
import './Home.css';

const Home = () => {
    return (
      <div>
        <div className='container'>
          <div className="main-title-container">
            <h1 className="title">MetroGroup</h1>
            <p className='description'>Descubre el mundo de las agrupaciones en la Unimet y únete a la que más te apasione. Hay opciones para todos los intereses. ¡No te pierdas la oportunidad de formar parte de algo increíble!</p>
            <div className="home-btns">
              <button className="quienes-somos-btn">Quienes somos?</button>
              <button className="descubre-mas-btn">Descubre más</button>
            </div>
          </div>
        </div>
  
        <div className="scnd-homepage-container" >
          <h2 className="second-description"> Descubre tu pasión y marca la diferencia en nuestra comunidad universitaria. Conoce más sobre las agrupaciones estudiantiles AQUÍ</h2>
        </div>
      </div>
    );
  }

export default Home

