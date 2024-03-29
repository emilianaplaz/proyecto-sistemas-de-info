import React, { useEffect, useState } from 'react';
import { ArrayAgrupaciones, ArrayUsuarios } from '../../firebase';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Agrupacion.css';

//para cuando hagamos confirmacion de usuario 

import { onAuthStateChanged } from "firebase/auth";

const Agrupacion = () => {

    const reloadPage = () => {
      window.location.reload();
    };
  
    const [AgrupacionesData, setAgrupaciones] = useState([]);
    const [UsuariosData, setUsuarios] = useState([]);

    const [AgrupacionNombre, setAgrupacionNombre] = useState('');
    const [Agrupacioncalificación, setAgrupacioncalificación] = useState([]);
    const [Agrupacioncategorias, setAgrupacioncategorias] = useState([]);
    const [Agrupacioncontacto, setAgrupacioncontacto] = useState('');
    const [Agrupacioncreacion, setAgrupacioncreacion] = useState('');
    const [Agrupacionencargado, setAgrupacionencargado] = useState('');
    const [Agrupacionvisión, setAgrupacionvisión] = useState('');
    const [Agrupacionfacultad, setAgrupacionfacultad] = useState('');
    const [Agrupacionmision, setAgrupacionmision] = useState('');
       

   
    const { id } = useParams();
    console.log(id);
    
  
    useEffect(() => {
        const fetchData = async () => {
          const data = await ArrayAgrupaciones();
          setAgrupaciones(data);
          const currentAgrupacion = data.find(agrupacion => agrupacion.nombre === id);
          if (currentAgrupacion) {
            setAgrupacionNombre(currentAgrupacion.nombre);
            setAgrupacioncalificación(currentAgrupacion.calificación);
            setAgrupacioncategorias(currentAgrupacion.categorias);
            setAgrupacioncontacto(currentAgrupacion.contacto);
            setAgrupacioncreacion(currentAgrupacion.creacion);
            setAgrupacionencargado(currentAgrupacion.encargado);
            setAgrupacionvisión(currentAgrupacion.visión);
            setAgrupacionfacultad(currentAgrupacion.facultad);
            setAgrupacionmision(currentAgrupacion.mision);
          }
        };
        fetchData();
      }, [id]);
    
      useEffect(() => {
        const fetchData = async () => {
          const data = await ArrayUsuarios();
          setUsuarios(data);
        };
        fetchData();
      }, []);
  

  
    return (
      <div className="Clubpage">
        <div className="Agrupacion-container">
        <div className="Agrupacion-name">
            <strong>Nombre:</strong>
            <span>{AgrupacionNombre}</span>
          </div>
          <div className="Agrupacion-calification">
            <strong>Calificación:</strong>
            {Agrupacioncalificación.map((calification, index) => (
              <span key={index}>{calification} </span>
            ))}
          </div>
          <div className="Agrupacion-categorias">
            <strong>Categorias:</strong>
            <span>{Agrupacioncategorias.join(', ')}</span>
          </div>
          <div className="Agrupacion-contacto">
            <strong>Contacto:</strong>
            <span>{Agrupacioncontacto}</span>
          </div>
          <div className="Agrupacion-creacion">
            <strong>creacion:</strong>
            <span>{Agrupacioncreacion}</span>
          </div>
          <div className="Agrupacion-visión">
            <strong>visión:</strong>
            <span>{Agrupacionvisión}</span>
          </div>
          <div className="Agrupacion-facultad">
            <strong>facultad:</strong>
            <span>{Agrupacionfacultad}</span>
          </div>
          <div className="Agrupacion-mision">
            <strong>mision:</strong>
            <span>{Agrupacionmision}</span>
          </div>
          <div className="Agrupacion-encargado">
            <strong>encargado:</strong>
            <span>{Agrupacionencargado}</span>
          </div>

        </div>
     
       
        
       
  
       
      </div>
    );
  };
  
  export default Agrupacion;