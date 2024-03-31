import React, { useEffect, useState } from "react";
import Star from "../Components/Star";
import { getAgrupacionesNames } from "../../firebase";

const Feedback = () => {
  const [agrupacionNames, setAgrupacionNames] = useState([]);
  const [selectedAgrupacion, setSelectedAgrupacion] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbackData, setFeedbackData] = useState({ rating: 0, comment: "" });
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const agrupacionNames = await getAgrupacionesNames();
        setAgrupacionNames(agrupacionNames);
        setIsFetching(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedAgrupacion) {
      setComment("");
    } else {
      setComment("");
    }
  }, [selectedAgrupacion]);

  useEffect(() => {
    setFeedbackData({ rating, comment });
  }, [rating, comment]);

  const handleSubmit = async () => {
    if (selectedAgrupacion && feedbackData.rating) {
      // Proceed with your logic here
      window.location.href = "/buscador";
    }
  };

  if (isFetching) {
    return <h2>Loading...</h2>;
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
        {agrupacionNames.map((agrupacionName, index) => (
          <option key={index} value={agrupacionName}>
            {agrupacionName}
          </option>
        ))}
      </select>
      <br />

      <div style={{ display: "flex", justifyContent: "center" }}>
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
};

export default Feedback;