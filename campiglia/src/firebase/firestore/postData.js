import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export const addRegister = async (register) => {
  try {
    const result = await addDoc(collection(db, "casos"), {
      year: register.year,
      title: register.title,
      expedient: register.fileNumber,
      crime: register.crime,
      box: register.boxNumber,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
