import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, FacebookAuthProvider} from 'firebase/auth';
import { auth, findDataInCollection } from '/firebase';
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import './Login.css'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [background, setBackground] = useState("");
  const [background1, setBackground1] = useState("");
  useEffect(() => {
    const storage = getStorage();
    const storageRef = ref(storage, "/fondos/metropolitana.jpg");
    getDownloadURL(storageRef)
      .then((url) => {
        setBackground(url);
      })
      .catch((error) => {
        console.log("Error getting image URL:", error);
      });
  }, []);
  useEffect(() => {
    const storage = getStorage();
    const storageRef = ref(storage, "/fondos/google-removebg-preview.png");
    getDownloadURL(storageRef)
      .then((url) => {
        setBackground1(url);
      })
      .catch((error) => {
        console.log("Error getting image URL:", error);
      });
  }, []);

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

  const handleRegistrar= async (e) => {
    e.preventDefault();

    navigate("/signup")



  }


  
  
  //el formulario HTML pendiente CSS y arreglar posicion navbar y validaciones del input del usuario
  return (
    <div>
      <div className="image-container" style={{backgroundImage: `url(${background})`}}>
      </div>
      <div className="logincuadrito">
            </div>
      <div className="text-login">
      Inicio de sesión
      </div>
      
      <div className='user'>Usuario/Administrador</div>
      
  
      <div className="estilcuadrito-container">
      <form id='estilcuadrito' onSubmit={handleSubmit}>
      <div className ='info'>
        <div className='text-content'>
          
            <label className="text-title" htmlFor="email">Correo:</label>
            
            <input className="input-content" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='example@correo.unimet.edu.ve'/>
            
          </div>
          <div >
            <div className='text-content'>
            <label className='text-title'id='titles1'htmlFor="password">Contraseña:</label>
            
            <input className="input-content" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Contraseña'/>
            
            </div>
        </div>
        <div id='olvcontraseña'>
      <button className= 'boton_transparente'id='contraseñabot' onClick={handleRecuperacion}>Olvidaste tu contraseña</button>
      </div>

      <div id="siguiente">
      <button className= 'boton' id="sigboton" type="submit">Siguiente</button>
      </div>
      </div>

      <div className='ingreso'>
      <button style={{backgroundImage: `url(${background1})`}} onClick={handleGoogle}>Iniciar Sesion con Google</button>
      <button onClick={handleFacebook}>Iniciar Sesion con Facebook</button>
      </div>
      <button onClick={handleRegistrar}>Registrate</button>
      
      </form>
      
      </div>
      
    </div>
  );
};

export default Login
