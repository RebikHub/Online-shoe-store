import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { TOrder } from '../interfaces';
import { removeItem } from '../store/cartSlice';
import { useAppDispatch } from '../store/hooks';
import { getOrderItem } from '../store/middleware';

type Props = {
  i: number,
  item: TOrder
};

export default function TableCart({item, i}: Props): ReactElement {
  const dispatch = useAppDispatch();

  function removeOrder(id: number) {
    localStorage.removeItem(`${id}`);
    dispatch(removeItem(id));
  };

  return (
    <tr>
      <td>{i + 1}</td>
      <td>
        <Link to={`/catalog/${item.id}`}
          onClick={() => dispatch(getOrderItem(item.id))}>{item.title}</Link>
      </td>
      <td>{item.size}</td>
      <td>{item.count}</td>
      <td>{item.price}</td>
      <td>{item.count * item.price}</td>
      <td>
        <button className="btn btn-outline-danger btn-sm"
          onClick={() => removeOrder(item.id)}>Удалить</button>
      </td>
    </tr>
  );
};
