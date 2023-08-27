import { ReactElement } from 'react';
import ErrorResponse from './ErrorResponse';
import Preloader from './Preloader';
import ProductCard from './ProductCard';
import { useTopSalesQuery } from '../services/query-hooks/useTopSalesQuery';
import { BaseProduct } from '../types/types';

export default function TopSales(): ReactElement {
  const { isLoading, isError, data, refetch } = useTopSalesQuery()

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {isError ? <ErrorResponse handleError={refetch} /> :
        <div className="row">
          {isLoading ? <Preloader /> : data.map((el: BaseProduct) => <ProductCard item={el} key={el.id} />)}
        </div>}
    </section>
  );
}
