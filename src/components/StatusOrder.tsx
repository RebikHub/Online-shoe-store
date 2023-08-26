import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/orders';

export default function StatusOrder(): ReactElement {
  const { clearCart } = useCartStore()
  const navigate = useNavigate();

  function orderComplete() {
    clearCart()
    navigate('/');
  }

  return (
    <div className='status'>
      <p className='status-text'>Заказ оформлен!</p>
      <button className='status-btn' type='button' onClick={orderComplete}>ОК</button>
    </div>
  );
}
