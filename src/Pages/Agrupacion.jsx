import React, { useEffect, useState } from 'react';
import Star from '../Components/Star';

import { ArrayAgrupaciones, ArrayUsuarios, findUserByEmail } from '../../firebase';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Agrupacion.css';
import Integrante from '../Components/Integrantes';
import { auth } from '../../firebase';
import { deleteAffiliationByEmail, removeIntegrantFromAgrupacion } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

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
  const [Integrantes, setIntegrantes] = useState([]);

  const { id } = useParams();
  console.log(id);

  const [emailuser, setCurrentUserEmail] = useState(null);
  const [isCurrentUserAnIntegrante, setIsCurrentUserAnIntegrante] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [puntaje, setpuntaje] = useState(0);
  const [comentarios, setcomentarios] = useState([]);
 
  const [ratings, setratings] = useState([]);

  useEffect(() => {
    if (Agrupacioncalificación.length > 0) {
      let tempComentarios = [];
      let tempRatings = [];
  
      for (let i = 0; i < Agrupacioncalificación.length; i++) {
        const { comentario, rating } = Agrupacioncalificación[i];
        if (comentario !== '') {
          tempComentarios.push(comentario);
        }
        tempRatings.push(rating);
      }
  
      setcomentarios(tempComentarios);
      setratings(tempRatings);
  
      const sum = tempRatings.reduce((a, b) => a + b, 0);
      const avg = sum / tempRatings.length;
      setpuntaje(avg);
    }
  }, [Agrupacioncalificación]);


  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUserEmail(user.email);
      } else {
        setCurrentUserEmail(null);
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const agrupacionData = await ArrayAgrupaciones();
      const data = await ArrayUsuarios();
      setUsuarios(data);
      setAgrupaciones(agrupacionData);
      const currentAgrupacion = agrupacionData.find(
        (agrupacion) => agrupacion.nombre === id
      );
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
        setIntegrantes(currentAgrupacion.integrantes);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
 
    const checkIfUserIsAnIntegrante = async () => {
      if (emailuser) {
        const userDoc = await findUserByEmail(emailuser);
        setIsCurrentUserAnIntegrante(userDoc.afiliaciones.includes(id));
      }
    };

    checkIfUserIsAnIntegrante();
  }, [emailuser, id]);

  const handleLeaveButtonClick = async () => {
    if (isCurrentUserAnIntegrante) {
      setIsLeaving(true);
      try {
        await removeIntegrantFromAgrupacion(AgrupacionNombre, emailuser);
        await deleteAffiliationByEmail(emailuser, AgrupacionNombre);
        setShouldRedirect(true);
      } catch (error) {
        console.error('Error while leaving the agrupacion: ', error);
        alert('An error occurred while leaving the agrupacion. Please try again later.');
      }
    } else {
      if (!isCurrentUserAnIntegrante && Integrantes.length < 15) {
        const path = `/afiliarse/${id}`;
        window.location.assign(path);
      } else {
        alert('No se puede salir de la agrupación porque ya has alcanzado el límite de 15 integrantes.');
      }
    }
  };
 
  useEffect(() => {
    if (shouldRedirect) {
      reloadPage();
    }
  }, [shouldRedirect]);

  console.log(ratings)
  console.log(comentarios)
  return (
    <div className="Clubpage">
      <div className="Agrupacion-container">
        <div className="Agrupacion-name">
          <strong>Nombre:</strong>
          <span>{AgrupacionNombre}</span>
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
      <div className="Integrantes-container">
        <h2>Integrantes:</h2>
        <div className="Integrantes-list">
          {Integrantes.map((integrante, index) => (
            <Integrante
              key={index}
              nombre={integrante.email}
              foto={integrante.photoURL}
            />
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
   
          />
        ))}
      </div>
      <div className="join-button-container">
  <button
    className="join-button"
    onClick={handleLeaveButtonClick}
    style={
      isCurrentUserAnIntegrante
        ? { backgroundColor: 'red' }
        : Integrantes.length >= 15
        ? { backgroundColor: 'gray' }
        : { backgroundColor: 'green' }
    }
  >
    {isCurrentUserAnIntegrante
      ? 'Leave'
      : Integrantes.length >= 15
      ? 'Sin disponibilidad'
      : 'Join'}
  </button>
</div>
<Link
  to="/feedback"
  className="Feedback-button"
  style={{ backgroundColor: "orange" }}
>
  Feedback
</Link>

    </div>
  );
};

export default Agrupacion;