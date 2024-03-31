
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth, findDataInCollection } from '/firebase'; 
import { addUser } from '../../firebase';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider} from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import './Signup.css'
const Signup = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, SetPhone] = useState('');
    const [name, setName] = useState('');
    const [lastname, SetLastname] = useState('');
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider;
    
    const navigate = useNavigate();
    const [background, setBackground] = useState("");

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            
            if(await findDataInCollection('Usuarios', 'correo', email) != null){
                alert("Ya existe una cuenta registrada con este correo");
            } else{
                await createUserWithEmailAndPassword(auth, email, password);
                const userdata = {
                    nombre: name,
                    apellido: lastname,
                    afiliaciones:  [],
                    correo: email,
                    teléfono: phone,
                    tipo: false,
    
                }
                addUser(userdata);
                navigate('/');
            }
        } catch (error){
            console.log('error')

        }

    }
    
    const handleFacebook = async (e) => {
        e.preventDefault();
        const result = await signInWithPopup(auth, facebookProvider);

        if (await findDataInCollection('Usuarios', 'correo', result.user.email) != null){
            alert("Ya existe una cuenta registrada con este correo");
        }else{
            console.log(result.user.email);
            navigate('/Signup02')
        }
        
        
        

    }

    const handleGoogle = async (e) => {
        e.preventDefault();
        const result = await signInWithPopup(auth, googleProvider);

        if (await findDataInCollection('Usuarios', 'correo', result.user.email) != null){
            alert("Ya existe una cuenta registrada con este correo");
        }else{
            console.log(result.user.email);
            navigate('/Signup02')
        }
        
            }
    
        
    const handleLogin= async (e) => {
        e.preventDefault();
    
        navigate("/login")
    
    
    
        }
            
    


    //pendiente CSS y validaciones del input del formulario y posicion del navbar   
    return(
        <div>
    <div className="image-container" style={{backgroundImage: `url(${background})`}}>
      </div>
        <div className="registrarcuadrito">
            </div>
            <div className ="text-regis">Regístrate</div>
        <form id="estilcuadrito" onSubmit={handleSubmit}>
            
            <div className="text-content">
                <label className="text-title" htmlFor="name">Nombre:</label>
                <input className="input-content" value={name} onChange={(e) => setName(e.target.value)} type = "name" placeholder="Nombre"/>
            </div>
            
            <div className='text-content'>
                <label className="text-title" htmlFor="lastname">Apellido:</label>
                <input className="input-content" value={lastname} onChange={(e) => SetLastname(e.target.value)} type = "lastname" placeholder="Apellido"/>
            </div>

            <div className="correo">
                <label className='text-titlecorreo' htmlFor="email">Correo:</label>
                <div id="buscaemail">
                <input className='input-contentcorreo' value={email} onChange={(e) => setEmail(e.target.value)} type = "email" placeholder="example@correo.unimet.ve"/>
                </div>
            </div>

            <div className='contra'>
                <label className='contratext' htmlFor="password">Contraseña:</label>
                <input className='contrainput' value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="contraseña"/>
            </div>
            <div className='contra'>
                <label className='contratext' htmlFor="password">Verificar:</label>
                <input className='contrainput' value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="contraseña"/>
            </div>
            <div className='text-contents'>
                <label className='text-title' htmlFor="phone">Telefono:</label>
                <input className='input-content' value={phone} onChange={(e) => SetPhone(e.target.value)} type="integer"placeholder="Número de teléfono"/>
            </div >
            <div id="tienescuenta">
            <button className='sigbotons' onClick={handleLogin}>Ya tienes cuenta?</button>
            </div>
            <div className="siguiente">
            <button className="sigboton" type="submit">Siguiente</button>
            </div>
            </form>
           
            <div>
                <button id="facebook" onClick={handleFacebook}>Registrate con Facebook</button>
                <button id="google" onClick={handleGoogle}>Registrate con Google</button>
                </div>
        
        </div>
     
     
    );



}



export default Signup