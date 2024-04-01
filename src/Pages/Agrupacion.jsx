import React, { useEffect, useState } from 'react';
import Star from '../Components/Star2';

import { ArrayAgrupaciones, ArrayUsuarios, findUserByEmail, ArrayCategorias } from '../../firebase';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Agrupacion.css';
import Integrante from '../Components/Integrantes';
import { auth } from '../../firebase';
import { deleteAffiliationByEmail, removeIntegrantFromAgrupacion, updateAgrupacionByName, getIntegrantesEmailsByAgrupacion} from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Agrupacion = () => { 
  const reloadPage = () => {
    window.location.reload();
  };

  const [AgrupacionesData, setAgrupaciones] = useState([]);
  const [UsuariosData, setUsuarios] = useState([]);
  const [CategoriasData, setcategorias] = useState([]);


  const [AgrupacionNombre, setAgrupacionNombre] = useState('');
  const [Agrupacioncalificación, setAgrupacioncalificación] = useState([]);
  const [Agrupacioncategorias, setAgrupacioncategorias] = useState([]);
  const [Agrupacioncontacto, setAgrupacioncontacto] = useState('');
  const [Agrupacioncreacion, setAgrupacioncreacion] = useState('');
  const [Agrupacionencargado, setAgrupacionencargado] = useState('');
  const [Agrupacionvisión, setAgrupacionvisión] = useState('');
  const [Agrupacionfacultad, setAgrupacionfacultad] = useState('');
  const [Agrupacionmision, setAgrupacionmision] = useState('');
  const [Agrupacionintegrantes, setAgrupacionintegrantes] = useState([]);
  const [Integrantes, setIntegrantes] = useState([" "]);

  const { id } = useParams();
  console.log(id);

  const [emailuser, setCurrentUserEmail] = useState(null);
  const [isCurrentUserAnIntegrante, setIsCurrentUserAnIntegrante] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [puntaje, setpuntaje] = useState(0);
  const [comentarios, setcomentarios] = useState([]);
 
  const [ratings, setratings] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

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
  
      const cat = await ArrayCategorias();
  
      setUsuarios(data);
      setAgrupaciones(agrupacionData);
      setcategorias(cat);
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
        setAgrupacionintegrantes(currentAgrupacion.integrantes);
        const integ = [];
        for (let i = 0; i < currentAgrupacion.integrantes.length; i++) {
          const email = currentAgrupacion.integrantes[i].email;
          for (let j = 0; j < data.length; j++) {

            if (data[j].correo === email) {
              integ.push(data[j]);
            }
          }
        }
        setAgrupacionintegrantes(integ);
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

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = async () => {
    if ( !Agrupacioncategorias || !Agrupacioncontacto || !Agrupacionencargado || !Agrupacionmision || !Agrupacionvisión) {

      alert("No dejes ninguna informacion en blanco.");
      return;
    }

    await updateAgrupacionByName(AgrupacionNombre, {
      visión: Agrupacionvisión,
      mision: Agrupacionmision,
      contacto: Agrupacioncontacto,
      categorias: Agrupacioncategorias,
      encargado: Agrupacionencargado,
    });

    setIsEditing(false);
  };

  const handleLeaveButtonClick = async () => {
    if (isCurrentUserAnIntegrante && emailuser) {
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
      if (!isCurrentUserAnIntegrante && Integrantes.length < 15 && emailuser) {
        const path = `/afiliarse/${id}`;
        window.location.assign(path);
      } else {
        alert('No se puede unir al grupo');
      }
    }
  };
 
  useEffect(() => {
    if (shouldRedirect) {
      reloadPage();
    }
  }, [shouldRedirect]);

  return (
<div className='Background'>
    <div className="Clubpage"> 
        {!isEditing && <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>}
       {isEditing && <button onClick={saveChanges}>Guardar cambios</button>}
      <div className="Agrupacion-container">
        <div className="Agrupacion-name">
          <strong>Nombre:</strong>
          <span>{AgrupacionNombre}</span>
        </div>

        {isEditing && (
        <div className="Agrupacion-categorias">
          <strong>Categorías:</strong>
          <div>
            {CategoriasData.map((categoria) => (
              <label key={categoria.id}>
                <input
                  type="checkbox"
                  value={categoria.categoria}
                  checked={Agrupacioncategorias.includes(categoria.categoria)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setAgrupacioncategorias([...Agrupacioncategorias, categoria.categoria]);
                    } else {
                      setAgrupacioncategorias(
                        Agrupacioncategorias.filter(
                          (cat) => cat !== categoria.categoria
                        )
                      );
                    }
                  }}
                />
                {categoria.categoria}
              </label>
            ))}
          </div>
        </div>
      )}
       {!isEditing && (
          <div className="Agrupacion-categorias">
            <strong>Categorías:</strong>
            <span>{Agrupacioncategorias.join(', ')}</span>
          </div>
        )}



        <div className="Agrupacion-contacto">
        <strong>Contacto:</strong>
        {isEditing ? (
          <>
            <input
              type="text"
              value={Agrupacioncontacto[0]}
              onChange={(e) =>
                setAgrupacioncontacto([e.target.value, Agrupacioncontacto[1]])
              }
            />
            <input
              type="text"
              value={Agrupacioncontacto[1]}
              onChange={(e) =>
                setAgrupacioncontacto([Agrupacioncontacto[0], e.target.value])
              }
            />
          </>
        ) : (
          <span>{Agrupacioncontacto[0] + ", " + Agrupacioncontacto[1]}</span>
        )}
      </div>
        <div className="Agrupacion-creacion">
          <strong>Creación:</strong>
          <span>{Agrupacioncreacion}</span>
        </div>
  
        <div className="Agrupacion-mision">
            <strong>Misión:</strong>
            {isEditing ? (
              <input type="text" value={Agrupacionmision} onChange={(e) => setAgrupacionmision(e.target.value)} />
            ) : (
              <span>{Agrupacionmision}</span>)}
        </div>
        <div className="Agrupacion-visión">
            <strong>Visión:</strong>
            {isEditing ? (
              <input type="text" value={Agrupacionvisión} onChange={(e) => setAgrupacionvisión(e.target.value)} />
            ) : (
              <span>{Agrupacionvisión}</span>)}
        </div>
        <div className="Agrupacion-facultad">
          <strong>Facultad:</strong>
          <span>{Agrupacionfacultad}</span>
        </div>
        <div className="Agrupacion-encargado">
          <strong>Encargado:</strong>
          {isEditing ? (
            <input type="text" value={Agrupacionencargado} onChange={(e) => setAgrupacionencargado(e.target.value)} />
          ) : (
            <span>{Agrupacionencargado}</span>
          )}
        </div>
      </div>
      <div className="Integrantes-container">
      {Integrantes !== null && (
        <>
          <h2>Integrantes:</h2>
          <div className="Integrantes-list">
            {Agrupacionintegrantes.length > 0 &&
              Agrupacionintegrantes.map((integrante, index) => (
                <Integrante
                  key={index}
                  nombre={integrante.nombre}
                  foto={integrante.photoURL}
                />
              ))}
            {Integrantes.length === 0 && <p>No integrantes found.</p>}
          </div>
        </>
      )}
    </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Star valor={puntaje} />
       
      </div>
      {emailuser && (
  <>
    <div className="join-button-container">
      <button
        className="join-button"
        onClick={handleLeaveButtonClick}
        style={
          isCurrentUserAnIntegrante
            ? { backgroundColor: "red" }
            : Integrantes.length >= 15
            ? { backgroundColor: "gray" }
            : { backgroundColor: "green" }
        }
      >
        {isCurrentUserAnIntegrante ? "Leave" : Integrantes.length >= 15 ? "Sin disponibilidad" : "Join"}
      </button>
    </div>
    <Link
      to="/feedback"
      className="Feedback-button"
      style={{ backgroundColor: "orange" }}
    >
      Feedback
    </Link>
  </>
)}

<div className="comments-container">
     Comentarios
        {comentarios.length > 0 ? (
          comentarios.map((comentario, index) => (
            <p key={index}>{comentario}</p>
          ))
        ) : (
          <p>No hay comentarios para esta agrupación.</p>
        )}
      </div>

    </div>
    </div>
  );
};

export default Agrupacion;