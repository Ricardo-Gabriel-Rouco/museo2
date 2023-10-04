// firebaseSearch.js
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Asegúrate de importar tu instancia de Firebase Firestore desde el archivo adecuado

export const searchCases = async (criteria) => {
  try {
    // Construye una consulta inicial para la colección "casos"
    let queryRef = collection(db, 'casos');

    // Aplica los filtros según los criterios de búsqueda no vacíos
    if (criteria.year !== '') {
      queryRef = query(queryRef, where('year', '==', parseInt(criteria.year)));
    }
    if (criteria.crime !== '') {
      queryRef = query(queryRef, where('crime', '==', criteria.crime));
    }
    if (criteria.boxNumber !== '') {
      queryRef = query(queryRef, where('box', '==', parseInt(criteria.boxNumber)));
    }
    if (criteria.title !== '') {
      queryRef = query(queryRef, where('title', '==', criteria.title));
    }
    if (criteria.fileNumber !== '') {
      queryRef = query(queryRef, where('expedient', '==', parseInt(criteria.fileNumber)));
    }

    // Ejecuta la consulta y obtén los resultados
    console.log(queryRef)
    const querySnapshot = await getDocs(queryRef);

    // Convierte los resultados en un arreglo de objetos que incluyen el ID
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });

    return results;
  } catch (error) {
    console.error('Error al realizar la búsqueda:', error);
    throw error; // Puedes lanzar el error para que el componente lo maneje si es necesario
  }
};
