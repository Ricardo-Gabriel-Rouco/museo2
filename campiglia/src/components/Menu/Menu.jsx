import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <ul className="nav justify-content-around pt-4"> {/* Agregando pt-4 para el padding top */}
      <li className="nav-item">
        <Link className="nav-link fs-4" to={'/'}>
          Inicio
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link fs-4" to={'/load'}>
          Cargar
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link fs-4" to={'/search'}>
          Buscar
        </Link>
      </li>
    </ul>
  );
}
