import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/orders';

export default function HeaderCart(): ReactElement {
  const { orders } = useCartStore()
  const navigate = useNavigate();


  return (
    <div className="header-controls-pic header-controls-cart" onClick={() => navigate('/cart')}>
      {orders.length > 0 ?
        <div>
          <div className="header-controls-cart-full">{orders.length}</div>
          <div className="header-controls-cart-menu"></div>
        </div> : null}
    </div>
  );
}
