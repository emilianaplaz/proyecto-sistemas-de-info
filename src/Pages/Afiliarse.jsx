import React, { useEffect, useState } from 'react';
import { ArrayAgrupaciones, ArrayUsuarios, findUserByEmail } from '../../firebase';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { addIntegrantToAgrupacion, addAfiliacionByEmail } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import './Afiliarse.css';


const Afiliarse = () => {
  const { id } = useParams();
  console.log(id);

  const [currentUser, setCurrentUser] = useState(null);
  const [EmailUser, setCurrentUserEmail] = useState("");
  const [integrantData, setIntegrantData] = useState({
    email: '',
    indexAcademico: '',
    trimestre: '',
    contactNumber: '',
    reason: '',
  });

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUserEmail(user.email);
        const userem = user.email;
        
        setIntegrantData({ ...integrantData, email: userem});
   
      } else {
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addIntegrantToAgrupacion(id, integrantData);
    addAfiliacionByEmail(EmailUser, id);
   
  };

  return (
    <div className="bg-afil">
      <div className='afiliarse-container'>
        <h1>Afiliarse</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Índice Académico:
            <input
              type="text"
              value={integrantData.indexAcademico}
              onChange={(e) => setIntegrantData({ ...integrantData, indexAcademico: e.target.value })}
            />
          </label>
          <br />
          <label>
            Trimestre:
            <input
              type="text"
              value={integrantData.trimestre}
              onChange={(e) => setIntegrantData({ ...integrantData, trimestre: e.target.value })}
            />
          </label>
          <br />
          <label>
            Número de Contacto:
            <input
              type="text"
              value={integrantData.contactNumber}
              onChange={(e) => setIntegrantData({ ...integrantData, contactNumber: e.target.value })}
            />
          </label>
          <br />
          <label>
            Razón de Afiliación:
            <textarea
              value={integrantData.reason}
              onChange={(e) => setIntegrantData({ ...integrantData, reason: e.target.value })}
            />
          </label>
  <br />
          <button className='afiliarse-btn' type="submit">Afiliarse</button>
        </form>
        <Link to={`/agrupacion/${id}`}>Volver a la página anterior</Link>
      </div>
    </div>
  );
}

export default Afiliarse