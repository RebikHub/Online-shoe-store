import { ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getTopSales } from '../store/middleware';
import ErrorResponse from './ErrorResponse';
import Preloader from './Preloader';
import ProductCard from './ProductCard';

export default function TopSales(): ReactElement {
  const { topSales, loading, error } = useAppSelector((state) => state.topSalesSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTopSales());
  }, [dispatch]);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {error ? <ErrorResponse error={error} handleError={() => dispatch(getTopSales())} /> :
        <div className="row">
          {loading ? <Preloader /> : topSales && topSales.map((el) => <ProductCard item={el} key={el.id} />)}
        </div>}
    </section>
  );
}
