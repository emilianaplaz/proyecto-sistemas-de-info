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

      alert("No dejes ninguna informacion en blanco.");
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
        console.log(user)
        setCurrentUserEmail(currentUser.email);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <div>
      <Navbar user={currentUser} />
      <div className="perfil">
        
        <div className="Perfil-container">
          <div className="nombre">
            <strong>Nombre:</strong>
            {isEditing ? (
              <input type="text" value={usernombre} onChange={(e) => setusernombre(e.target.value)} />
            ) : (
              <span>{usernombre}</span>
            )}
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
              {currentUserEmail} 
          </div>
          <div className="teléfono">
            <strong>Telefono:</strong>
            {isEditing ? (
              <input type="text" value={usertelefono} onChange={(e) => setusertelefono(e.target.value)} />
            ) : (
              <span>{usertelefono}</span>
            )}
          </div>
        </div>
      </div> 
      <button onClick={handleLogout}>Logout</button>
      {!isEditing && <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>}
      {isEditing && <button onClick={saveChanges}>Save Changes</button>}
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