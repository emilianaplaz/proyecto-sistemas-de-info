const Integrante = ({ nombre, foto = [] }) => {
  return (
    <div id={`nombre-${nombre}`} className="Integrante">
      <div className="contenido-integrante">
        <div className="foto-integrante">
          {Array.isArray(foto) && foto.length > 0 ? (
            <img src={foto[0]} alt={`${nombre}'s photo`} />
          ) : (
            <div className="no-photo-placeholder">No photo available</div>
          )}
        </div>
        <h2>{nombre}</h2>
      </div>
    </div>
  );
};
export default Integrante;