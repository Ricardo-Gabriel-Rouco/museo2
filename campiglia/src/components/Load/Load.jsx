import React, { useState } from 'react';
import { addRegister } from '../../firebase/firestore/postData';

export default function Load() {
  const initialValues = {
    year: '',
    crime: '',
    fileNumber: '',
    title: '',
    boxNumber: '',
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos antes de enviar
    if (!formValues.year || !formValues.crime || !formValues.fileNumber || !formValues.title || !formValues.boxNumber) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    // Limpia el error si los campos son válidos
    setError(null);

    // Handle form submission here
    addRegister(formValues)
      .then(() => {
        setSuccess(true);
        // Reset the form to its initial values
        setFormValues(initialValues);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      })
      .catch((error) => {
        console.error('Error al subir el registro:', error);
        setError('Hubo un error al subir el registro. Por favor, inténtalo de nuevo.');
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <form onSubmit={handleSubmit} className="w-50">
        <div className="mb-3">
          <label htmlFor="year" className="form-label fs-3 text-start">Año</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formValues.year}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Año"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="crime" className="form-label fs-3 text-start">Delito</label>
          <input
            type="text"
            id="crime"
            name="crime"
            value={formValues.crime}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Delito"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fileNumber" className="form-label fs-3 text-start">Expediente</label>
          <input
            type="number"
            id="fileNumber"
            name="fileNumber"
            value={formValues.fileNumber}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Expediente"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label fs-3 text-start">Carátula</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Carátula"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="boxNumber" className="form-label fs-3 text-start">Número de Caja</label>
          <input
            type="number"
            id="boxNumber"
            name="boxNumber"
            value={formValues.boxNumber}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Número de Caja"
          />
        </div>
        {error && <div className="text-danger mb-3">{error}</div>}
        {success && <div className="alert alert-success mb-3">Subida con éxito</div>}
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  );
}
