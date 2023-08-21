import { ChangeEvent, useState } from 'react';
import { ReactElement } from 'react';
import { useEffect } from 'react';
import { OrderInput } from '../types/interfaces';
// import ErrorResponse from './ErrorResponse';
// import Preloader from './Preloader';
// import StatusOrder from './StatusOrder';
import { postOrder } from '../api/httpServices';
import {
  useMutation
} from '@tanstack/react-query'

export default function Checkout(): ReactElement {
  // const { orders, loading, status, error } = useAppSelector((state) => state.cartSlice);
  const [input, setInput] = useState<OrderInput>({
    phone: '',
    address: ''
  });
  const [errorOrder, setErrorOrder] = useState<boolean>(false);
  // const dispatch = useAppDispatch();
  const orders = {
    count: 0,
    id: 0,
    price: 0,
    size: 'string',
    title: 'string'
  } // mock data
  const postOrderMut = useMutation(postOrder)

  function submit() {
    if (input.address !== '' && input.phone !== '' && orders) {
      postOrderMut.mutate(
        {
          owner: input,
          items: [orders]
        },
        {
          onError: (e) => {
            console.error(e)
          },
          onSuccess: (data) => {
            console.log('postOrder-data: ', data)
          }
        }
      )
      setInput({
        phone: '',
        address: ''
      });
    } else {
      setErrorOrder(true);
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (errorOrder) {
      timer = setTimeout(() => setErrorOrder(false), 3 * 1000);
    }
    return () => clearTimeout(timer);
  }, [errorOrder])

  // if (error || errorOrder) {
  //   return <ErrorResponse
  //     error={error ? error : orders === null ? 'Добавьте товар в карзину!' : 'Заполните все поля!'}
  //     handleError={submit} />
  // }

  // if (status) {
  //   return <StatusOrder />
  // }

  // if (loading) {
  //   return <Preloader />
  // }

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
        <form className="card-body">
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input className="form-control" placeholder="Ваш телефон"
              value={input.phone}
              onChange={(ev: ChangeEvent<HTMLInputElement>) => setInput((prev) => ({ ...prev, phone: ev.target.value }))} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input className="form-control" id="address" placeholder="Адрес доставки"
              value={input.address}
              onChange={(ev: ChangeEvent<HTMLInputElement>) => setInput((prev) => ({ ...prev, address: ev.target.value }))} />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="agreement" />
            <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
          </div>
          <button type="submit" className="btn btn-outline-secondary" onClick={submit}>Оформить</button>
        </form>
      </div>
    </section>
  );
}
