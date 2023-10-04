import React, { useState, useEffect } from "react";
import { searchCases } from "../../firebase/firestore/searchData";
import { getAllRegisters } from "../../firebase/firestore/getData";
import exportToExcel from '../../firebase/otherFunctions/downloadExcel'
import AllResults from "../AllResults/AllResults";
import { Link } from "react-router-dom";
import styles from "./Search.module.css";
function Search() {
  const [searchCriteria, setSearchCriteria] = useState({
    year: "",
    crime: "",
    boxNumber: "",
    title: "",
    fileNumber: "",
  });

  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const registers = await getAllRegisters();
        setResults(registers);
      } catch (err) {
        console.log(err);
      }
    };
    fetchResults();
  }, []);

  const handleSearch = async () => {
    try {
      const results = await searchCases(searchCriteria);
      setSearchResults(results);

      if (results.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  const handleClearFilters = () => {
    setSearchCriteria({
      year: "",
      crime: "",
      boxNumber: "",
      title: "",
      fileNumber: "",
    });
    setSearchResults([]);
    setNoResults(false);
  };

  return (
    <div className="d-flex justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="text-center">
        <h2>Búsqueda</h2>
        <div className="d-flex justify-content-center">
          <div className="me-2">
            <label htmlFor="year">Año:</label>
            <input
              type="number"
              id="year"
              name="year"
              value={searchCriteria.year}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          {/* ... Otros campos de entrada ... */}
        </div>
        <button onClick={handleSearch} className="btn btn-primary mt-3">
          Buscar
        </button>
        <button
          onClick={handleClearFilters}
          className="btn btn-secondary mt-3 ms-3"
        >
          Limpiar Filtros
        </button>
        {noResults ? (
          <div>
            <p>No se encontraron resultados.</p>
          </div>
        ) : searchResults.length ? (
          <div>
            <h3>Resultados de la Búsqueda</h3>
            {searchResults.map((result, index) => (
              <div key={index} className={`${styles.customli} fs-3`}>
                <Link to={`/details/${result.id}`}>{result.title}</Link>
              </div>
            ))}
            
            {/* Botón para descargar resultados en Excel */}
            <button onClick={() =>exportToExcel(searchResults)} className="btn btn-success mt-3">
              Descargar Resultados en Excel
            </button>
          </div>
        ) : (
          <div>
            <AllResults results={results} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
