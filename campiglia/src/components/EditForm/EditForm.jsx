import React, { useState } from "react";

function EditForm({ details, onSave, onCancel }) {
  const [editedDetails, setEditedDetails] = useState({ ...details });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({
      ...editedDetails,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    onSave(editedDetails); // Llama a la función onSave con los detalles editados
  };

  const handleCancelClick = () => {
    onCancel(); // Llama a la función onCancel para cancelar la edición
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h2 >Editar Detalles</h2>
      <label className="fs-5">
        Caja:
        <input type="text" name="box" value={editedDetails.box} onChange={handleInputChange} className="form-control fs-5" />
      </label>
      <label className="fs-5">
        Crímen:
        <input type="text" name="crime" value={editedDetails.crime} onChange={handleInputChange} className="form-control fs-5" />
      </label>
      <label className="fs-5">
        Expediente:
        <input type="text" name="expedient" value={editedDetails.expedient} onChange={handleInputChange} className="form-control fs-5" />
      </label>
      <label className="fs-5">
        Carátula:
        <input type="text" name="title" value={editedDetails.title} onChange={handleInputChange} className="form-control fs-5" />
      </label>
      <label className="fs-5">
        Año:
        <input type="text" name="year" value={editedDetails.year} onChange={handleInputChange} className="form-control fs-5" />
      </label>
      <div className="d-flex mt-3">
        <button onClick={handleCancelClick} className="btn btn-secondary me-2">
          Cancelar
        </button>
        <button onClick={handleSaveClick} className="btn btn-primary ">
          Guardar
        </button>
      </div>
    </div>
  );
}

export default EditForm;
