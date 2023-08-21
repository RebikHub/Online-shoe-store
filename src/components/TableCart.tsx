import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { TOrder } from '../types/interfaces';
import {
  useMutation,
} from '@tanstack/react-query'
import { getOrderItem } from '../api/httpServices';

type Props = {
  i: number,
  item: TOrder
};

export default function TableCart({ item, i }: Props): ReactElement {
  const getOrderItemMut = useMutation(getOrderItem)

  function removeOrder() {
    sessionStorage.removeItem(`${item.id}`);
  }

  function handleCatalogItem() {
    getOrderItemMut.mutate(item.id, {
      onError: (e) => {
        console.error(e)
      },
      onSuccess: (data) => {
        console.log('getOrderItem-Data: ', data);

      },
    })
  }

  return (
    <tr>
      <td>{i + 1}</td>
      <td>
        <Link to={`/catalog/${item.id}`}
          onClick={handleCatalogItem}>{item.title}</Link>
      </td>
      <td>{item.size}</td>
      <td>{item.count}</td>
      <td>{item.price}</td>
      <td>{item.count * item.price}</td>
      <td>
        <button className="btn btn-outline-danger btn-sm"
          onClick={removeOrder}>Удалить</button>
      </td>
    </tr>
  );
}
