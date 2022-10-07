import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';

export default function StatusOrder() {
  const dispatch = useDispatch();
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
