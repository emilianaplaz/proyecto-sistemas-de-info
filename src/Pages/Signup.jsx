import react from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, findDataInCollection } from '/firebase'; 
import { addUser } from '../../firebase';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider} from 'firebase/auth';

const Signup = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, SetPhone] = useState('');
    const [name, setName] = useState('');
    const [lastname, SetLastname] = useState('');
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider;
    
    const navigate = useNavigate();


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
                    tipo: "estudiante",
    
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
    
        

    


    //pendiente CSS y validaciones del input del formulario y posicion del navbar   
    return(
        <form onSubmit={handleSubmit}>
            
            <div>
                <label  htmlFor="name">Nombre:</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type = "name"/>
            </div>
            
            <div>
                <label  htmlFor="lastname">Apellido:</label>
                <input value={lastname} onChange={(e) => SetLastname(e.target.value)} type = "lastname"/>
            </div>

            <div>
                <label  htmlFor="email">Correo:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type = "email"/>
            </div>

            <div>
                <label  htmlFor="password">Contraseña:</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
            </div>

            <div>
                <label  htmlFor="phone">Telefono:</label>
                <input value={phone} onChange={(e) => SetPhone(e.target.value)} type="integer"/>
            </div>

        
            <button type="submit">Siguiente</button>

            <button onClick={handleFacebook}>Registrate con Facebook</button>
            <button onClick={handleGoogle}>Registrate con Google</button>

        </form>
        
    );



}



export default Signup