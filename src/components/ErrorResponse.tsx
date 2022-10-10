import React, { ReactElement } from 'react';

type Props = {
  error: string,
  handleError: () => void
}

export default function ErrorResponse({error, handleError}: Props): ReactElement {
  return (
    <div className='error'>
      <p className='error-text'>{error}</p>
      <button type='button' className='error-btn' onClick={handleError}>Обновить</button>
    </div>
  );
};
