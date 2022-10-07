import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function HeaderCart() {
  const [amount, setAmount] = useState(null);
  const {orders} = useSelector((state) => state.cartSlice);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (orders.length !== 0) {
      setAmount(orders.length);
    } else {
      setAmount(null);
    };
  }, [orders.length]);

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
