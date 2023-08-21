import { ReactElement, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import getArrayFromStorage from '../utils/arrayFromStorage';
import { TOrder } from '../types/interfaces';
import ErrorResponse from '../components/ErrorResponse';
import Preloader from '../components/Preloader';

export default function Order(): ReactElement {
  const { item, loading, error } = useAppSelector((state) => state.itemsSlice);
  const { count } = useAppSelector((state) => state.countSlice);
  const [select, setSelect] = useState<null | string>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  function checkSelected(size: string) {
    if (select === size) {
      setSelect(null);
    } else {
      setSelect(size);
    }
  }

  function toCartMarket() {
    let itemStorage: TOrder | null = null;

    for (let i = 0; i < sessionStorage.length; i += 1) {
      const id = sessionStorage.key(i);
      if (id && Number(id) === item?.id) {
        itemStorage = JSON.parse(sessionStorage.getItem(id) || '');
      }
    }

    if (itemStorage === null) {
      sessionStorage.setItem(`${item?.id}`, JSON.stringify({
        id: item?.id,
        title: item?.title,
        size: select,
        count: count,
        price: item?.price
      }));
    } else {
      sessionStorage.setItem(`${item?.id}`, JSON.stringify({
        id: item?.id,
        title: item?.title,
        size: select,
        count: itemStorage.count + count,
        price: item?.price
      }));
    }

    const local = getArrayFromStorage();
    // dispatch(updateCart(local));
    // dispatch(clearCount());
    navigate('/cart');
  }

  // if (error) {
  //   return <ErrorResponse error={error} handleError={() => params.id && dispatch(getOrderItem(+params.id))} />
  // }

  // if (loading) {
  //   return <Preloader />
  // }

  return (
    <section className="catalog-item">
      <h2 className="text-center">{item?.title}</h2>
      <div className="row">
        <div className="col-5">
          <img src={item?.images ? item?.images[0] : ''} className="img-fluid" alt={item?.title} />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{item?.sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{item?.manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{item?.color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{item?.material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{item?.season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{item?.reason}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
            <p>Размеры в наличии:
              {item?.sizes.map((el, i) => el.avalible ?
                <span className={`catalog-item-size ${select === el.size ? 'selected' : ''}`}
                  onClick={() => checkSelected(el.size)} key={i}>{el.size}</span> : null)}
            </p>
            {item?.sizes.some((el) => el.avalible === true) ?
              <p>Количество:
                <span className="btn-group btn-group-sm pl-2">
                  <button className="btn btn-secondary" onClick={() => dispatch(decrement())}>-</button>
                  <span className="btn btn-outline-primary">{count}</span>
                  <button className="btn btn-secondary" onClick={() => dispatch(increment())}>+</button>
                </span>
              </p> : null}
          </div>
          {item?.sizes.some((el) => el.avalible === true) && select !== null && count !== 0 ?
            <button className="btn btn-danger btn-block btn-lg"
              onClick={toCartMarket}>В корзину</button> : null}
        </div>
      </div>
    </section>
  );
};
