import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import {
  useMutation,
} from '@tanstack/react-query'
import { getOrderItem } from '../services/api/httpServices';
import { useCartStore } from '../store/orders';
import { TOrder } from '../types/types';

type Props = {
  i: number,
  item: TOrder
};

export default function TableCart({ item, i }: Props): ReactElement {
  const getOrderItemMut = useMutation(getOrderItem)
  const { removeItem } = useCartStore()

  function removeOrder() {
    removeItem(item.id);
  }

  function handleCatalogItem() {
    getOrderItemMut.mutate(item.id, {
      onError: (e) => {
        console.error(e)
      }
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
