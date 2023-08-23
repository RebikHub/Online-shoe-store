import { ReactElement } from 'react';
import ErrorResponse from './ErrorResponse';
import Preloader from './Preloader';
import ProductCard from './ProductCard';
import {
  useQuery
} from '@tanstack/react-query'
import { QueryKeys } from '../types/keys';
import { getTopSales } from '../api/httpServices';
import { BaseProduct } from '../types/interfaces';

export default function TopSales(): ReactElement {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [QueryKeys.GetTopSales],
    queryFn: () => getTopSales(),
  })

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {error ? <ErrorResponse handleError={refetch} /> :
        <div className="row">
          {isLoading ? <Preloader /> : data.map((el: BaseProduct) => <ProductCard item={el} key={el.id} />)}
        </div>}
    </section>
  );
}
