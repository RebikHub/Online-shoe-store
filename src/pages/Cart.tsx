import { ReactElement } from "react";
import Checkout from "../components/Checkout";
import TableCart from "../components/TableCart";
import { useCartStore } from "../store/orders";

export default function Cart(): ReactElement {
  const { orders } = useCartStore()

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
            {orders.map((el, i) => <TableCart item={el} i={i} key={i} />)}
            <tr>
              <td colSpan={5} className="text-right">Общая стоимость</td>
              <td>{orders.reduce((a, b) => a + (b.price * b.count), 0)}</td>
            </tr>
          </tbody>
        </table>
      </section>
      {orders.length > 0 && <Checkout />}
    </>
  );
}
