import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, FacebookAuthProvider, sendPasswordResetEmail} from 'firebase/auth';
import { auth, findDataInCollection } from '/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



const Recuperation = () => {
    
    const [email, setEmail] = useState('');


    const sendPasswordReset = async (e) => {
        e.preventDefault();
        console.log(await findDataInCollection('Usuarios', 'correo', email));

        if (await findDataInCollection('Usuarios', 'correo', email) == null){
            console.log("No se encontró el correo")
        } else{
            sendPasswordResetEmail(auth, email)
            .then(() => {
            console.log('Password reset email sent successfully!');
          })
          .catch((error) => {
            console.error('Error sending password reset email:', error);
            
          });

    }
    }
    return (
        <div>
          <h1>Recuperación de contraseña:</h1>
          <form>
            <label htmlFor="email">Correo:</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}/>
          </form>
          <button onClick={sendPasswordReset}>Enviar</button>
          <br/>
          <li><a href="login">Volver</a></li>
         
        </div>
      );
    };


export default Recuperation