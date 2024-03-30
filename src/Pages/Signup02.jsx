import react from 'react';
import { useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '/firebase'; 
import { addUser } from '../../firebase';
import { useNavigate } from 'react-router-dom'; 

const Signup02 = () => {

    const [phone, SetPhone] = useState('');
    const [name, setName] = useState('');
    const [lastname, SetLastname] = useState('');

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{

            const currentUser = auth.currentUser;
            const userdata = {
                nombre: name,
                apellido: lastname,
                afiliaciones:  [],
                correo: currentUser.email,
                teléfono: phone,
                tipo: "estudiante",

            }
            addUser(userdata);
            navigate('/');

           

        } catch (error){
            console.log('error creando usuario')
            navigate('/Signup')

        }

    }

    //pendiente CSS y validaciones del input del formulario y la posicion del navbar
    return(
        <form onSubmit={handleSubmit}>
            
            <div>
                <h1>Datos Faltantes:</h1>
            </div>
            
            <div>
                <label  htmlFor="name">Nombre:</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type = "name"/>
            </div>
            
            <div>
                <label  htmlFor="lastname">Apellido:</label>
                <input value={lastname} onChange={(e) => SetLastname(e.target.value)} type = "lastname"/>
            </div>

            <div>
                <label  htmlFor="phone">Telefono:</label>
                <input value={phone} onChange={(e) => SetPhone(e.target.value)} type="phone"/>
            </div>

        
            <button type="submit">enviar</button>

        </form>
    );


}


export default Signup02;