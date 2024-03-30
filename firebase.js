// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, query, where, getDocs, collection, addDoc, updateDoc, getDoc, doc } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL } from "firebase/storage";
import { getStorage,ref } from "firebase/storage";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk1aX38ws5Jn1ZgVCGIu-4vdNvYUVaLVA",
  authDomain: "proyecto-sistemas-de-inf-fbd86.firebaseapp.com",
  projectId: "proyecto-sistemas-de-inf-fbd86",
  storageBucket: "proyecto-sistemas-de-inf-fbd86.appspot.com",
  messagingSenderId: "186817619885",
  appId: "1:186817619885:web:6cd5fe6f600f150688e324",
  measurementId: "G-NPSPHP0E0E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();


export async function ArrayAgrupaciones() {
    let AgrupacionesData = [];
  
    try {
      const querySnapshot = await getDocs(collection(db, "Agrupaciones"));
      querySnapshot.forEach(async(doc) => {
        const imageRef = ref(storage, `AgrupacionesImages/${doc.data().imagen}`);
        const imageUrl = await getDownloadURL(imageRef);
        AgrupacionesData.push({
          nombre: doc.data().nombre,
          calificación: doc.data().calificación,
          categorias: doc.data().categorias,
          contacto: doc.data().contacto,
          creacion: doc.data().creacion,
          encargado: doc.data().encargado,
          visión: doc.data().visión,
          facultad: doc.data().facultad,
          integrantes: doc.data().integrantes,
          mision: doc.data().mision,
          imageUrl: imageUrl
        });
      });
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  
    return AgrupacionesData; 
  }

export async function deleteAgrupacionByName(agrupacionName) {
    const collectionRef = collection(db, 'Agrupaciones');
    const querySnapshot = await getDocs(collectionRef);
    let docToDelete;
  
    querySnapshot.forEach((doc) => {
      if (doc.data().nombre === agrupacionName) {
        docToDelete = doc.ref;
      }
    });
  
    if (docToDelete) {
      try {
        await deleteDoc(docToDelete);
      } catch (error) {
        console.log('Error deleting document: ', error);
      }
    } else {
      console.log('Agrupacion not found');
    }
  }

  export async function getIntegrantesEmailsByAgrupacion(agrupacion) {
    const { integrantes } = agrupacion;
    const integrantesEmails = [];
  
    if (!integrantes || !integrantes.length) {
      return integrantesEmails;
    }
  
    try {
      for (const integrante of integrantes) {
        const docSnapshot = await getDoc(doc(db, "Integrantes", integrante));
        if (docSnapshot.exists()) {
          integrantesEmails.push(docSnapshot.data().email);
        }
      }
    } catch (error) {
      console.log("Error getting integrantes: ", error);
    }
  
    return integrantesEmails;
  }

  
  export async function addAgrupacion(agrupacionData) {
    const collectionRef = collection(db, 'Agrupaciones');
  
    const querySnapshot = await getDocs(collectionRef);
    let agrupacionExists = false;
    querySnapshot.forEach((doc) => {
      if (doc.data().nombre === agrupacionData.nombre) {
        agrupacionExists = true;
      }
    });
  
    if (!agrupacionExists) {
      try {
        const newDocRef = await addDoc(collectionRef, {
          nombre: agrupacionData.nombre,
          calificación: agrupacionData.calificación,
          categorias: agrupacionData.categorias,
          contacto: agrupacionData.contacto,
          creacion: agrupacionData.creacion,
          encargado: agrupacionData.encargado,
          visión: agrupacionData.visión,
          facultad: agrupacionData.facultad,
          mision: agrupacionData.mision,
          integrantes: agrupacionData.integrantes
        });
        console.log('Agrupacion added with ID: ', newDocRef.id);
      } catch (error) {
        console.log('Error adding agrupacion: ', error);
      }
    } else {
      console.log('Agrupacion with the same name already exists.');
    }
  }

export async function updateAgrupacionByName(agrupacionName, updatedAgrupacionData) {
    const collectionRef = collection(db, 'Agrupaciones');
    const q = query(collectionRef, where('nombre', '==', agrupacionName));
    const querySnapshot = await getDocs(q);
    let docToUpdate;
  
    querySnapshot.forEach((doc) => {
      docToUpdate = doc.ref;
    });
  
    if (docToUpdate) {
      try {
        await updateDoc(docToUpdate, updatedAgrupacionData);
        console.log('Agrupacion data updated');
      } catch (error) {
        console.log('Error updating agrupacion: ', error);
      }
    } else {
      console.log('Agrupacion not found');
    }
  }

  export async function addRatingToAgrupacionByName(agrupacionName, rating) {
    const collectionRef = collection(db, 'Agrupaciones');
    const querySnapshot = await getDocs(collectionRef);
    let docToUpdate;
  
    querySnapshot.forEach((doc) => {
      if (doc.data().nombre === agrupacionName) {
        docToUpdate = doc.ref;
      }
    });
  
    if (docToUpdate) {
      try {
   
        const agrupacionDoc = await getDoc(docToUpdate);
        const currentCalificaciones = agrupacionDoc.data().calificación;
  

        const updatedCalificaciones = [...currentCalificaciones, rating];

        await updateDoc(docToUpdate, {
          calificación: updatedCalificaciones,
        });
  
        console.log('Rating added to Agrupacion: ', agrupacionName);
      } catch (error) {
        console.log('Error adding rating to agrupacion: ', error);
      }
    } else {
      console.log('Agrupacion not found');
    }
  }

  export async function addIntegrantToAgrupacion(agrupacionName, integrantData) {
    const collectionRef = collection(db, 'Agrupaciones');
    const q = query(collectionRef, where('nombre', '==', agrupacionName));
    const querySnapshot = await getDocs(q);
    let docToUpdate;
  
    querySnapshot.forEach((doc) => {
      docToUpdate = doc.ref;
    });
  
    if (docToUpdate) {
      try {
        const agrupacionDoc = await getDoc(docToUpdate);
        const currentIntegrantes = agrupacionDoc.data().integrantes || [];
  
        const updatedIntegrantes = [
          ...currentIntegrantes,
          {
            email: integrantData.email,
            indexAcademico: integrantData.indexAcademico,
            trimestre: integrantData.trimestre,
            contactNumber: integrantData.contactNumber,
            reason: integrantData.reason,
          },
        ];
  
        await updateDoc(docToUpdate, { integrantes: updatedIntegrantes });
        console.log('Integrant added to agrupacion');
      } catch (error) {
        console.log('Error adding integrant to agrupacion: ', error);
      }
    } else {
      console.log('Agrupacion not found');
    }
  }

  export async function removeIntegrantFromAgrupacion(agrupacionName, integrantEmail) {
    const collectionRef = collection(db, 'Agrupaciones');
    const q = query(collectionRef, where('nombre', '==', agrupacionName));
    const querySnapshot = await getDocs(q);
    let docToUpdate;
  
    querySnapshot.forEach((doc) => {
      docToUpdate = doc.ref;
    });
  
    if (docToUpdate) {
      try {
        const agrupacionDoc = await getDoc(docToUpdate);
        const currentIntegrantes = agrupacionDoc.data().integrantes || [];
  
        const updatedIntegrantes = currentIntegrantes.filter((integrant) => integrant.email !== integrantEmail);
  
        await updateDoc(docToUpdate, { integrantes: updatedIntegrantes });
        console.log('Integrant removed from agrupacion');
      } catch (error) {
        console.log('Error removing integrant from agrupacion: ', error);
      }
    } else {
      console.log('Agrupacion not found');
    }
  }
  


export async function ArrayCategorias() {
    let Categorias = [];

    try {
        const querySnapshot = await getDocs(collection(db, "Categorias"));
        querySnapshot.forEach((doc) => {
            Categorias.push({
                categoria: doc.data().categoria,
        });
        });
    } catch (error) {
        console.log("Error getting documents: ", error);
    }

    return Categorias; 
    }

export async function deleteCategoria(categoriaName) {
    const collectionRef = collection(db, 'Categorias');
    const querySnapshot = await getDocs(collectionRef);
    let docToDelete;
    
  
    querySnapshot.forEach((doc) => {
        if (doc.data().categoria === categoriaName) {
        docToDelete = doc.ref;
        }
    });
    
    if (docToDelete) {
        try {
        await deleteDoc(docToDelete);
        } catch (error) {
        console.log('Error deleting document: ', error);
        }
    } else {
        console.log('Categoria not found');
    }
}
      
export async function addCategory(categoria) {
  const collectionRef = collection(db, "Categorias");
  const lowerCaseCategoria = categoria.toLowerCase();
  const querySnapshot = await getDocs(collectionRef);
  let isCategoryExists = false;

  querySnapshot.forEach((doc) => {
    if (doc.data().categoria.toLowerCase() === lowerCaseCategoria) {
      isCategoryExists = true;
    }
  });

  if (!isCategoryExists) {
    try {
      await addDoc(collectionRef, {
        categoria: categoria,
      });
      console.log("Category added with ID: ");
    } catch (error) {
      console.log("Error adding category: ", error);
    }
  } else {
    console.log("Category already exists: ", categoria);
  }
}


export async function ArrayUsuarios() {
        let UsuariosData = [];
      
        try {
          const querySnapshot = await getDocs(collection(db, "Usuarios"));
          querySnapshot.forEach((doc) => {
            UsuariosData.push({
              nombre: doc.data().nombre,
              apellido: doc.data().apellido,
              afiliaciones: doc.data().afiliaciones,
              correo: doc.data().correo,
              teléfono : doc.data().teléfono ,
              tipo: doc.data().tipo,
  
            });
          });
        } catch (error) {
          console.log("Error getting documents: ", error);
        }
      
        return UsuariosData; 
}

export async function addUser(userData) {
    const collectionRef = collection(db, 'Usuarios');
    try {
        const newDocRef = await addDoc(collectionRef, {
        nombre: userData.nombre,
        apellido: userData.apellido,
        afiliaciones: userData.afiliaciones,
        correo: userData.correo,
        teléfono: userData.teléfono,
        tipo: userData.tipo,
        });
        console.log('User added with ID: ', newDocRef.id);
    } catch (error) {
        console.log('Error adding user: ', error);
    }
}

export async function updateUserByEmail(email, updatedUserData) {
    const collectionRef = collection(db, 'Usuarios');
    try {
      const q = query(collectionRef, where('correo', '==', email));
      const querySnapshot = await getDocs(q);
      let docToUpdate;
      querySnapshot.forEach((doc) => {
        docToUpdate = doc.ref;
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

  export async function findUserByEmail(email) {
    const db = getFirestore();
    const q = query(collection(db, 'Usuarios'), where('correo', '==', email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log('User not found');
      return null;
    }
    const userData = querySnapshot.docs[0].data();
    return userData;
  }

  export async function addAfiliacionByEmail(email, afiliacion) {
    try {
      const q = query(collection(db, "Usuarios"), where("correo", "==", email));
      const querySnapshot = await getDocs(q);
      const doc = querySnapshot.docs.find((doc) => doc.data().correo === email);
  
      if (doc) {
        const currentAfiliaciones = doc.data().afiliaciones || [];
  
        if (currentAfiliaciones.includes(afiliacion)) {
          console.log("Afiliacion already exists");
          return false;
        }
  
   
        const updatedAfiliaciones = [...currentAfiliaciones, afiliacion];
        await updateDoc(doc.ref, { afiliaciones: updatedAfiliaciones });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error adding afiliacion: ", error);
      return false;
    }
  }

  export async function deleteAffiliationByEmail(email, affiliation) {
    try {
        const db = getFirestore();
        const q = query(collection(db, 'Usuarios'), where('correo', '==', email));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            console.log('User not found');
            return false;
        }
        
        const doc = querySnapshot.docs[0];
        const currentAffiliations = doc.data().afiliaciones || [];
        const updatedAffiliations = currentAffiliations.filter((member) => member !== affiliation);
        
        await updateDoc(doc.ref, { afiliaciones: updatedAffiliations });
        return true;
    } catch (error) {
        console.log("Error deleting affiliation: ", error);
        return false;
    }
}


export async function getUserAffiliations(email) {
    try {
      const userDoc = await getDoc(collection(db, "Usuarios").where("correo", "==", email).get());
      if (!userDoc.exists) {
        throw new Error("User not found");
      }
  
      const user = userDoc.data();
      const affiliations = user.afiliaciones || [];
      return affiliations;
    } catch (error) {
      console.log("Error getting user affiliations: ", error);
      return [];
    }
  }

  export async function findDataInCollection(collectionName, field, value) {
    try {
      const collectionRef = collection(db, collectionName); 
      const q = query(collectionRef, where(field, '==', value));  
      const querySnapshot = await getDocs(q);
      const foundData = [];

      querySnapshot.forEach((doc) => {
        foundData.push(doc.data());
      });

      return foundData.length > 0 ? foundData : null;
    } catch (error) {
      console.error('Error fetching data:', error.message);
      return null; 
    }
  }