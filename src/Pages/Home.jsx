import React from 'react';
import './Home.css';

const Home = () => {
    return (
      <div className='container'>
          <div className="main-title-container">
              <h1 className="title">MetroGroup</h1>
              <p className='description'>Descubre el mundo de las agrupaciones en la Unimet y únete a la que más te apasione. Hay opciones para todos los intereses. ¡No te pierdas la oportunidad de formar parte de algo increíble!</p>
              <div className="main-btns">
                <button className="quienes-somos">Quienes somos?</button>
                <button className="descubre-mas">Descubre más</button>
              </div>
          </div>
      </div>
    )
  }

export default Home

