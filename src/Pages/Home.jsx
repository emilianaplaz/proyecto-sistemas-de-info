import React, { useEffect, useState } from 'react';
import './Home.css';


const Home = () => {


    return (
      <div>
        <div className='home1-container'>
          <div className="main-title-container">
            <h1 className="title">MetroGroup</h1>
            <p className='description'>Descubre el mundo de las agrupaciones en la Unimet y únete a la que más te apasione. Hay opciones para todos los intereses. ¡No te pierdas la oportunidad de formar parte de algo increíble!</p>
            <div className="home-btns">
              <button className="quienes-somos-btn">¿Quiénes somos?</button>
              <button className="descubre-mas-btn">Descubre más</button>
            </div>
          </div>
        </div>

        <div className="extra-pages">
  
        <div className="home2-container" >
          <h2 className="second-description"> Descubre tu pasión y marca la diferencia en nuestra comunidad universitaria. Conoce más sobre las agrupaciones estudiantiles AQUÍ</h2>
          <div className="descubre-mas-container">
            <div className="imagen">
              <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQUUWZUdfqmhqtfqejPkB1drM6F8zo_G9_scZLI1vanyV9t8NgP" className="circular-image" alt="Imagen Circular"/>
            </div>
            <div className="info">
              <p className="descubre-mas-desc">Regístrate ahora y forma parte de una agrupación!</p>
              <button className="registrarse-btn">Registrarse</button>
            </div>
          </div>
        </div>

        <div class="home3-container">
          <div class="quienes-somos-container">
            <p>Quienes Somos?</p>
          </div>
          <div className="info-container">
            <div className="mision-vision">
              <div className="mision">
                <p>Misión</p>
                <p className='descp'>Proporcionar una plataforma virtual donde esté disponible la información sobre las agrupaciones estudiantiles de la Unimet, permita la creación de usuarios y la donación de fondos a las agrupaciones mediante el uso de PayPal.</p>
              </div>
              <div className="vision">
                <p>Visión</p>
                <p className="descp">Al analizar las distintas opciones que un estudiante de la universidad metropolitana tiene al momento de buscar e involucrarse con los distintos grupos que la universidad ofrece se presenta el problema que trata de resolver la plataforma, al existir un repertorio variado de grupos se necesita una página que englobe dichos grupos para comodidad del estudiantado acompañando éstos con descripciones y la posibilidad de una fácil inscripción.</p>
              </div>            
            </div>
            <div className="objetivo">
              <p>Objetivo</p>
              <p className="descp">Implementar un sistema que optimice la gestión de las agrupaciones estudiantiles permitiendo a los estudiantes tener acceso a información actualizada de las agrupaciones y que la universidad tenga un mejor control sobre las creaciones de nuevas agrupaciones.</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }

export default Home

