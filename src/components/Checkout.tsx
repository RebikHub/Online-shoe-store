import { ChangeEvent, FormEvent, useState } from 'react';
import { ReactElement } from 'react';
import { useMemo } from 'react';
import { postOrder } from '../services/api/httpServices';
import {
  useMutation
} from '@tanstack/react-query'
import { useCartStore } from '../store/orders';
import Preloader from './Preloader';
import StatusOrder from './StatusOrder';
import ErrorResponse from './ErrorResponse';
import { validatePhoneNumber } from '../utils/validatePhoneNumber';
import { OrderInput } from '../types/types';

export default function Checkout(): ReactElement {
  const [input, setInput] = useState<OrderInput>({
    phone: '',
    address: '',
    checkbox: false
  });
  const [validate, setValidate] = useState({
    phone: false,
    address: false,
  })
  const { orders } = useCartStore()
  const postOrderMut = useMutation(postOrder)
  const isDisabledButton = useMemo(() => input.phone === '' || input.address === '' || !input.checkbox,
    [input.address, input.checkbox, input.phone])

  function submit(ev?: FormEvent<HTMLFormElement>) {
    ev?.preventDefault()
    if (!isDisabledButton) {
      if (validatePhoneNumber(input.phone)) {
        postOrderMut.mutate(
          {
            owner: input,
            items: orders
          },
          {
            onError: (e) => {
              console.error(e)
            }
          }
        )
        setInput({
          phone: '',
          address: '',
          checkbox: false
        });
      } else {
        setValidate({
          phone: !validatePhoneNumber(input.phone),
          address: input.address === '',
        })
      }
    }
  }

  function handleInputPhone(ev: ChangeEvent<HTMLInputElement>) {
    setInput((prev) => ({ ...prev, phone: ev.target.value.trim() }))
  }

  function handleInputAddress(ev: ChangeEvent<HTMLInputElement>) {
    setInput((prev) => ({ ...prev, address: ev.target.value.trim() }))
  }

  function handleInputCheckbox(ev: ChangeEvent<HTMLInputElement>) {
    setInput((prev) => ({ ...prev, checkbox: ev.target.checked }))
  }

  if (postOrderMut.isError) {
    return <ErrorResponse
      error={'Заполните все поля!'}
      handleError={() => submit()} />
  }

  if (postOrderMut.isSuccess && postOrderMut.data === 'Order succeed!') {
    return <StatusOrder />
  }

  if (postOrderMut.isLoading) {
    return <Preloader />
  }

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
        <form className="card-body" onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input className="form-control" placeholder="Ваш телефон"
              value={input.phone}
              onChange={handleInputPhone} />
            {validate.phone && !validatePhoneNumber(input.phone) && <p style={{ color: 'red', fontSize: '12px' }}>Не правильно введен номер!</p>}
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input className="form-control" id="address" placeholder="Адрес доставки"
              value={input.address}
              onChange={handleInputAddress} />
            {validate.address && <p style={{ color: 'red', fontSize: '12px' }}>Не правильно введен адрес!</p>}
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="agreement" onChange={handleInputCheckbox} />
            <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
          </div>
          <button disabled={isDisabledButton} type="submit" className={`btn btn-outline-secondary ${isDisabledButton ? 'disabled' : ''}`}>Оформить</button>
        </form>
      </div>
    </section>
  );
}
