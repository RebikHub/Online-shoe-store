import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/orders';
import { useAppDispatch } from '../store/hooks';

export default function StatusOrder(): ReactElement {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function orderComplete() {
    dispatch(clearCart());
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className='status'>
      <p className='status-text'>Заказ оформлен!</p>
      <button className='status-btn' type='button' onClick={orderComplete}>ОК</button>
    </div>
  );
};
