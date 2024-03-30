import React, { useEffect, useState } from 'react';
import { ArrayAgrupaciones, addRatingToAgrupacionByName } from "../../firebase";
import Star from '../Components/Star';

const Feedback = () => {
  const [Nombresagrupaciones, setNombresagrupaciones] = useState([]);
  const [selectedAgrupacion, setSelectedAgrupacion] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [feedbackData, setFeedbackData] = useState({ rating: 0, comentario: '' });

  useEffect(() => {
    const fetchData = async () => {
      const agrupacionData = await ArrayAgrupaciones();

      setNombresagrupaciones(agrupacionData.map(agrupacion => agrupacion.nombre));
    };

    fetchData().catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  useEffect(() => {
    if (selectedAgrupacion) {
      setComment('');
    } else {
      setComment('');
    }
  }, [selectedAgrupacion]);

  useEffect(() => {
    setFeedbackData({ rating, comentario: comment });
  }, [rating, comment]);

  const handleSubmit = async () => {
    if (selectedAgrupacion && rating) {
      await addRatingToAgrupacionByName(selectedAgrupacion, feedbackData);
      window.location.href = '/buscador';
    }
  }

  return (
    <div>
      <label htmlFor="agrupacion-select">Selecciona una agrupacion:</label>
      <select
        id="agrupacion-select"
        value={selectedAgrupacion}
        onChange={(e) => setSelectedAgrupacion(e.target.value)}
      >
        <option value="">Selecciona...</option>
        {Nombresagrupaciones.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>
      <br />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            selected={rating > index}
            onClick={() => setRating(index + 1)}
          />
        ))}
      </div>

      <br />

      <label htmlFor="comment">Comentario:</label>
      <input
        type="text"
        id="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleSubmit}>Publicar feedback</button>
    </div>
  );
}

export default Feedback;
