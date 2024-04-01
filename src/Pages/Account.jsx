import './Account.css'
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from "react-router-dom";
import Navbar from '../Components/Navbar';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, GoogleAuthProvider, signOut } from "firebase/auth";
import { findUserByEmail } from '../../firebase';
import { query, getDocs, collection, where, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [usuario, setusuario] = useState(null);
  const [usernombre, setusernombre] = useState("");
  const [userapellido, setuserapellido] = useState("");
  const [usertelefono, setusertelefono] = useState("");
  const [Usertipo, setUsertipo] = useState(null);
  const [userafiliaciones, setuserafiliaciones] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [updateMessage, setUpdateMessage] = useState("");

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = async () => {
    if (!usernombre || !userapellido || !usertelefono) {

      alert("No dejes ninguna información en blanco.");
      return;
    }

    setusuario({
      nombre: usernombre,
      apellido: userapellido,
      teléfono: usertelefono,
    });

    await updateUserByEmail(currentUserEmail, {
      nombre: usernombre,
      apellido: userapellido,
      teléfono: usertelefono,
    });

    setIsEditing(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await findUserByEmail(user.email);
        setusuario(userData);
        setusernombre(userData.nombre);
        setuserapellido(userData.apellido);
        setusertelefono(userData.teléfono);
        setUsertipo(userData.tipo);
        setuserafiliaciones(userData.afiliaciones);
        setCurrentUser(user);
        setCurrentUserEmail(user.email);
        setIsFetching(false);
      } else {
        setCurrentUser(null);
        setIsFetching(false);
      }
    });
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className='Background'>
      <div className='Cuadrito'>
      <div className="text">
        Cuenta
      </div>
        <Navbar user={currentUser} />
        <div className="perfil">
        
        <div className="Perfil-container">
          <div className="nombre">
            <strong>Nombre:</strong>
            {isEditing ? (
              <input type="text" value={usernombre} onChange={(e) => setusernombre(e.target.value)} />
            ) : (
              <span>{usernombre}</span>)}
          </div>
          <div className="apellido">
            <strong>Apellido:</strong>
            {isEditing ? (
              <input type="text" value={userapellido} onChange={(e) => setuserapellido(e.target.value)} />
            ) : (
              <span>{userapellido}</span>)}
          </div>
          <div className="correo">
            <strong>Correo:</strong>
            {currentUserEmail && currentUserEmail} 
          </div>
          <div className="teléfono">
            <strong>Teléfono:</strong>
            {isEditing ? (
              <input type="text" value={usertelefono} onChange={(e) => setusertelefono(e.target.value)} />
            ) : (
              <span>{usertelefono}</span>
            )}
          </div>
        </div>
      </div> 
      <button className='Boton' onClick={handleLogout}>Logout</button>
      {!isEditing && <button className='Boton' onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>}
      {isEditing && <button  className='Boton' onClick={saveChanges}>Save Changes</button>}
      </div>
    </div>

  );
};

export default Account;

export async function updateUserByEmail(email, updatedUserData) {
    const collectionRef = collection(db, 'Usuarios');
    try {
      const q = query(collectionRef, where('correo', '==', email));
      const querySnapshot = await getDocs(q);
      let docToUpdate;
      querySnapshot.forEach((doc) => {
        docToUpdate = doc.ref;
        console.log("logrado")
      });
      if (docToUpdate) {
        await updateDoc(docToUpdate, updatedUserData);
      } else {
        console.log('User not found'); 
      }
      console.log('User data updated'); 
    } catch (error) {
      console.log('Error updating user: ', error);
    }
  }