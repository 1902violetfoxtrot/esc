import React from 'react';

const Trip = props => {
  const destination = 'DESTINATION HERE (PASS DOWN)';
  const price = 'PRICE (PASS DOWN)';
  return (
    <div className='trip'>
      <h1>{destination}</h1>
      <h3>${price} for round trip</h3>
    </div>
  );
};

export default Trip;
