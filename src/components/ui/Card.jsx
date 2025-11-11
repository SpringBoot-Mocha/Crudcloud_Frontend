import React from 'react';

const Card = ({ children, className = '', onClick = null, hoverable = false }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md p-6 transition-all ${
        hoverable ? 'hover:shadow-lg hover:scale-105 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
