import React from 'react';

export default function ErrorResponse({error, handleError}) {
  return (
    <div className='error'>
      <p className='error-text'>{error}</p>
      <button type='button' className='error-btn' onClick={handleError}>Обновить</button>
    </div>
  );
};
