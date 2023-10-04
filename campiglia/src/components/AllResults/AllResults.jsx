import { Link } from "react-router-dom";
import exportToExcel from '../../firebase/otherFunctions/downloadExcel.js'

function AllResults({ results }) {
  return (
    <div className="mt-4">
      <ul className="list-unstyled fs-5">
        {results.map((register) => (
          <li key={register.id}>
            <Link
              to={`/details/${register.id}`}
              className="text-decoration-none"
            >
              {register.title}
            </Link>
          </li>
        ))}
      </ul>
      <button
        onClick={() => exportToExcel(results)}
        className="btn btn-success mt-3"
      >
        Descargar Resultados en Excel
      </button>
    </div>
  );
}

export default AllResults;
