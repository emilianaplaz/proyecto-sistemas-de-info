import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrayAgrupaciones, addAgrupacion } from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
const CrearAg = () => {
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState([]);
  const [creacion, setCreacion] = useState('');
  const [encargado, setEncargado] = useState('');
  const [vision, setVision] = useState('');
  const [facultad, setFacultad] = useState('');
  const [mision, setMision] = useState('');
  const [instagram, setInstagram] = useState('');
  const [telefono, setTelefono] = useState('');
  const [imagen, setImage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const storage = getStorage();
    const storageRef = ref(storage, `AgrupacionesImages/${imagen.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imagen);

  
    uploadTask.on(
      (error) => {
        console.log("Error uploading image:", error);
      },
      () => {
    
        getDownloadURL(storageRef).then((downloadURL) => {
          addAgrupacion({
            nombre,
            calificación: [],
            categorias: [],
            contacto: [instagram, telefono],
            creacion,
            encargado,
            visión: vision,
            facultad,
            mision,
            integrantes: [],
            imagen: imagen.name
          });
        });
      }
    );
  };
  const isFormDisabled =
    !nombre ||
    !contacto ||
    !creacion ||
    !encargado ||
    !vision ||
    !facultad ||
    !mision ||
    !instagram ||
    !telefono;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </label>
      <label>
        Instagram:
        <input
          type="text"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
      </label>
      <label>
        Teléfono:
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </label>
      <label>
        Creación:
        <input
          type="text"
          value={creacion}
          onChange={(e) => setCreacion(e.target.value)}
        />
      </label>
      <label>
        Encargado:
        <input
          type="text"
          value={encargado}
          onChange={(e) => setEncargado(e.target.value)}
        />
      </label>
      <label>
        Visión:
        <input
          type="text"
          value={vision}
          onChange={(e) => setVision(e.target.value)}
        />
      </label>
      <label>
        Facultad:
        <input
          type="text"
          value={facultad}
          onChange={(e) => setFacultad(e.target.value)}
        />
      </label>
      <label>
        Misión:
        <input
          type="text"
          value={mision}
          onChange={(e) => setMision(e.target.value)}
        />
      </label>
      <label>
        Imagen:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>
      <button type="submit" disabled={isFormDisabled}>
        Submit
      </button>
    </form>
  );
};

export default CrearAg;