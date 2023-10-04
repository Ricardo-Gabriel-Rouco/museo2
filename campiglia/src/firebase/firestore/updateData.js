import { db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export const updateRegister = async (registerId, updatedData) => {
  try {
    const registerRef = doc(db, "casos", registerId);

    // Filtra los campos que no son undefined
    const updatedFields = Object.entries(updatedData).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});

    await updateDoc(registerRef, updatedFields);

    console.log("Registro actualizado con éxito");
  } catch (error) {
    console.error("Error al actualizar el registro:", error);
    throw error; // Puedes lanzar el error para que el componente lo maneje si es necesario
  }
};
