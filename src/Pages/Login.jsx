import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, FacebookAuthProvider} from 'firebase/auth';
import { auth, findDataInCollection } from '/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  // Inicia el proveedor de Google y facebook
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider;


  
  //funcion implementada con Google Auth
  const handleGoogle = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleProvider);

      if (await findDataInCollection('Usuarios', 'correo', result.user.email) == null) {
        alert("No existe el Usuario")
      } else {
        navigate('/');
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  //Auth con Facebook
  const handleFacebook = async (e) => {
    e.preventDefault();
        try {
          const result = await signInWithPopup(auth, facebookProvider);
    
          if (await findDataInCollection('Usuarios', 'correo', result.user.email) == null) {
            console.log( "No existe usuario");
            alert("No existe el usuario")

          } else {
            navigate('/');
          }
    
        } catch (error) {
          console.log(error.message);
        }
    

  

  }

  //Auth con correo y contraseña
  const handleSubmit = async (e) => {

    e.preventDefault();
     
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Signed in with email:', user.email);
  
      // Verificar si el usuario está autenticado antes de redirigirlo a la página de inicio
      if (auth.currentUser) {
        navigate('/');
      }
    } catch (error) {
      console.log('Error signing in with email and password:', error.message);
  
      // da un mensaje si el usauario no se encuentra
      if (error.code === 'auth/invalid-email' || error.code === 'auth/invalid-credential') {
        alert('no esta bien el usuario o contraseña.');
      } else {
        alert('un error al iniciar sesion');
      }
    }
  }

  const handleRecuperacion= async (e) => {
    e.preventDefault();

    navigate("/recuperation")



  }

  
  
  //el formulario HTML pendiente CSS y arreglar posicion navbar y validaciones del input del usuario
  return (
    <div>
      <h1>Inicio de sesión</h1>
      <button onClick={handleGoogle}>Iniciar Sesion con Google</button>
      <button onClick={handleFacebook}>Iniciar Sesion con Facebook</button>
  
      
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Correo:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
      </div>

      <button type="submit">enviar</button>


      <button onClick={handleRecuperacion}>Olvidaste tu contraseña</button>

      
      </form>
      
      
    </div>
  );
};

export default Login
