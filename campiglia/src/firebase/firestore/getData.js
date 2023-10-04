import { db } from "../firebaseConfig";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

//obtener todos los datos
export const getAllRegisters = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "casos"));
    const registers = [];
    
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        // Agrega los datos del documento al array de registros
        registers.push({
          id: doc.id, // ID del documento
          ...doc.data(), // Datos del documento
        });
      }
    });
    
    return registers;
  } catch (error) {
    console.error("Error al obtener registros:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};

//obtener un solo id
export const getRegisterById = async (registerId) => {
  try {
    const docRef = doc(db, "casos", registerId);
    const docSnapshot = await getDoc(docRef);
    console.log('estoy aca')

    if (docSnapshot.exists()) {
      // Devuelve los datos del registro si existe
      return {
        id: docSnapshot.id, // ID del documento
        ...docSnapshot.data(), // Datos del documento
      };
    } else {
      // Si el registro no existe, puedes manejarlo de la manera que desees
      throw new Error("Registro no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el registro:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};