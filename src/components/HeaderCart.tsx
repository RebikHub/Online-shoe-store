import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

export default function HeaderCart(): ReactElement {
  const [amount, setAmount] = useState<null | number>(null);
  const {orders} = useAppSelector((state) => state.cartSlice);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (orders) {
      setAmount(orders.length);
    } else {
      setAmount(null);
    };
  }, [orders]);

  return (
    <div className="header-controls-pic header-controls-cart" onClick={() => navigate('/cart')}>
      {amount !== null ?
      <div>
        <div className="header-controls-cart-full">{amount}</div>
        <div className="header-controls-cart-menu"></div>
      </div> : null}
    </div>
  );
};
