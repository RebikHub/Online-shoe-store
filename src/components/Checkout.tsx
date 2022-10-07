import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postOrder } from '../store/middleware';
import ErrorResponse from './ErrorResponse';
import Preloader from './Preloader';
import StatusOrder from './StatusOrder';

export default function Checkout() {
  const { orders, loading, status, error } = useSelector((state) => state.cartSlice);
  const [input, setInput] = useState({
    phone: '',
    address: ''
  });
  const [errorOrder, setErrorOrder] = useState(false);
  const dispatch = useDispatch();

  function submit() {
    if (input.address !== '' && input.phone !== '' && orders.length !== 0) {
      dispatch(postOrder({
        owner: input,
        items: orders
      }));
      setInput({
        phone: '',
        address: ''
      });
    } else {
      setErrorOrder(true);
    }
  }

  useEffect(() => {
    if (errorOrder) {
      setTimeout(() => setErrorOrder(false), 3 * 1000);
    }
  }, [errorOrder])

  if (error || errorOrder) {
    return <ErrorResponse
      error={error ? error : orders.length === 0 ? 'Добавьте товар в карзину!' : 'Заполните все поля!'}
      handleError={submit}/>
  };

  if (status) {
    return <StatusOrder/>
  };

  if (loading) {
    return <Preloader/>
  };

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{maxWidth: '30rem', margin: '0 auto'}}>
        <form className="card-body">
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input className="form-control" placeholder="Ваш телефон"
              value={input.phone}
              onChange={(ev) => setInput((prev) => ({...prev, phone: ev.target.value}))}/>
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input className="form-control" id="address" placeholder="Адрес доставки"
            value={input.address}
            onChange={(ev) => setInput((prev) => ({...prev, address: ev.target.value}))}/>
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="agreement"/>
            <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
          </div>
          <button type="submit" className="btn btn-outline-secondary"
          onClick={submit}>Оформить</button>
        </form>
      </div>
    </section>
  );
};
