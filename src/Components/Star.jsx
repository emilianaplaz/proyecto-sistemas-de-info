import React from 'react';
import { FaStar } from 'react-icons/fa';

const Star = ({ selected = false, onClick = () => {} }) => {
  return (
    <FaStar
      size={40}
      color={selected ? 'gold' : 'gray'}
      onClick={onClick}
      style={{
        margin: '0 3px',
        cursor: 'pointer',
      }}
    />
  );
};

export default Star;