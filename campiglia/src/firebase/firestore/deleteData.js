import { db } from "../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteRegisterById = async (registerId) => {
  try {
    const registerRef = doc(db, "casos", registerId);
    await deleteDoc(registerRef);
    console.log("Registro eliminado con éxito");
  } catch (error) {
    console.error("Error al eliminar el registro:", error);
    throw error; // Puedes lanzar el error para que el componente lo maneje si es necesario
  }
};
