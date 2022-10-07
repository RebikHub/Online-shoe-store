import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getArrayFromStorage from "../arrayFromStorage";
import Checkout from "./Checkout";
import TableCart from "./TableCart";

export default function Cart() {
  const [order, setOrder] = useState([]);
  const { orders } = useSelector((state) => state.cartSlice);

  useEffect(() => {
    const local =  getArrayFromStorage();
    setOrder(local);
  }, [orders.length]);

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {order.map((el, i) => <TableCart item={el} i={i} key={i}/>)}
            <tr>
              <td colSpan={5} className="text-right">Общая стоимость</td>
              <td>{order.reduce((a, b) => a + (b.price * b.count), 0)}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <Checkout/>
    </>
  );
};
