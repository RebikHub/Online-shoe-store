import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem } from '../store/cartSlice';
import { getOrderItem } from '../store/middleware';

export default function TableCart({item, i}) {
  const dispatch = useDispatch();

  function removeOrder(id) {
    localStorage.removeItem(id);
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
