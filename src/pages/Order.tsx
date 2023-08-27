import { ReactElement, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import getArrayFromStorage from '../utils/arrayFromStorage';
import { Products } from '../types/interfaces';
import ErrorResponse from '../components/ErrorResponse';
import Preloader from '../components/Preloader';
import { useQuery } from '@tanstack/react-query';
import { getOrderItem } from '../api/httpServices';
import { QueryKeys } from '../types/keys';
import { useCartStore } from '../store/orders';

export default function Order(): ReactElement {
  const [count, setCount] = useState(0);
  const [select, setSelect] = useState<string>('');
  const navigate = useNavigate();
  const { id } = useParams();

  const { addItem, orders } = useCartStore()

  console.log(orders);

  const { data, isError, isLoading, refetch } = useQuery<Products>({
    queryKey: [QueryKeys.GetOrderItem],
    queryFn: () => getOrderItem(Number(id)),
    refetchOnWindowFocus: false
  })


  function checkSelected(size: string) {
    if (select === size) {
      setSelect('');
    } else {
      setSelect(size);
    }
  }

  function toCartMarket() {
    if (data) {
      addItem({
        id: data.id,
        title: data.title,
        size: select,
        count: count,
        price: data.price
      })
      navigate('/cart');
    }
  }

  if (isError) {
    return <ErrorResponse handleError={refetch} />
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <section className="catalog-item">
      {data &&
        <><h2 className="text-center">{data.title}</h2>
          <div className="row">
            <div className="col-5">
              <img src={data.images?.length > 0 ? data.images[0] : ''} className="img-fluid" alt={data.title} />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{data.sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{data.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{data.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{data.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{data.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{data.reason}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                <p>Размеры в наличии:
                  {data.sizes.map((el, i) => el.avalible ?
                    <span className={`catalog-item-size ${select === el.size ? 'selected' : ''}`}
                      onClick={() => checkSelected(el.size)} key={i}>{el.size}</span> : null)}
                </p>
                {data.sizes.some((el) => el.avalible === true) ?
                  <p>Количество:
                    <span className="btn-group btn-group-sm pl-2">
                      <button className="btn btn-secondary" onClick={() => setCount(prev => {
                        if (prev > 0) {
                          return prev - 1
                        }
                        return prev
                      })}>-</button>
                      <span className="btn btn-outline-primary">{count}</span>
                      <button className="btn btn-secondary" onClick={() => setCount(prev => prev + 1)}>+</button>
                    </span>
                  </p> : null}
              </div>
              {data.sizes.some((el) => el.avalible === true) && select !== '' && count !== 0 ?
                <button className="btn btn-danger btn-block btn-lg"
                  onClick={toCartMarket}>В корзину</button> : null}
            </div>
          </div>
        </>}
    </section>
  );
}
