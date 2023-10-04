import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRegisterById } from "../../firebase/firestore/getData";
import { updateRegister } from "../../firebase/firestore/updateData";
import { deleteRegisterById } from "../../firebase/firestore/deleteData";
import EditForm from "../EditForm/EditForm";

function Details() {
  const navigate = useNavigate();
  const { idRegister } = useParams();
  const [details, setDetails] = useState({
    box: "",
    crime: "",
    expedient: "",
    title: "",
    year: "",
  });

  const [editing, setEditing] = useState(false);
  const [detailsLoaded, setDetailsLoaded] = useState(false);

  // Estado para controlar el cuadro de diálogo de confirmación
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (!detailsLoaded) {
      getRegisterById(idRegister)
        .then((data) => {
          if (data && Object.keys(data).length > 0) {
            setDetails(data);
            setDetailsLoaded(true);
          } else {
            // No se encontraron detalles, puedes manejarlo según tus necesidades
          }
        })
        .catch((error) => {
          console.error("Error al obtener detalles:", error);
        });
    }
  }, [idRegister, detailsLoaded]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async (editedDetails) => {
    try {
      await updateRegister(idRegister, editedDetails);
      setDetails(editedDetails);
      setEditing(false);
    } catch (error) {
      console.error("Error al actualizar el registro:", error);
    }
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  // Función para abrir el cuadro de diálogo de confirmación
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  // Función para confirmar la eliminación del registro
  const confirmDelete = () => {
    deleteRegisterById(idRegister)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error al eliminar el registro:", error);
      });
  };

  // Función para cancelar la eliminación
  const cancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <div className="d-flex flex-column justify-content-between mt-5" style={{ minHeight: '100vh' }}>
      {editing ? (
        <EditForm
          details={details}
          onSave={handleSaveClick}
          onCancel={handleCancelClick}
        />
      ) : (
        <div className="text-center">
          <p className="fs-5 fw-bold">Caja: {details.box}</p>
          <p className="fs-5 fw-bold">Crimen: {details.crime}</p>
          <p className="fs-5 fw-bold">Expediente: {details.expedient}</p>
          <p className="fs-5 fw-bold">Carátula: {details.title}</p>
          <p className="fs-5 fw-bold">Año: {details.year}</p>
          <div>
            <button onClick={handleEditClick} className="btn btn-primary me-2">
              Editar
            </button>
            <button onClick={handleDeleteClick} className="btn btn-danger me-2">
              Eliminar
            </button>
            <button onClick={() => navigate(-1)} className="btn btn-warning">
              Volver
            </button>
          </div>
        </div>
      )}
      {isDeleteDialogOpen && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Eliminación</h5>
                <button type="button" className="btn-close" onClick={cancelDelete}></button>
              </div>
              <div className="modal-body">
                ¿Estás seguro de que deseas eliminar este registro?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
