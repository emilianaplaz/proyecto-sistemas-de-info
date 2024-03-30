import React from 'react';
import { FaStar } from 'react-icons/fa';

const Star = ({ valor = 0 }) => {
  const estrellas = Array.from({ length: 5 }, (_, index) => (
    <FaStar
      key={index}
      size={40}
      color={index < valor ? 'gold' : 'gray'}
      style={{
        margin: '0 3px',
      }}
    />
  ));

  return <>{estrellas}</>;
};

export default Star;
