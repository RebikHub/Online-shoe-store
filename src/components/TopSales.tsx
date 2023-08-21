import { ReactElement, useEffect } from 'react';
import ErrorResponse from './ErrorResponse';
import Preloader from './Preloader';
// import ProductCard from './ProductCard';
import {
  // QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { QueryKeys } from '../types/keys';
import { getTopSales } from '../api/httpServices';

export default function TopSales(): ReactElement {
  const { isLoading, error, data } = useQuery({
    queryKey: [QueryKeys.GetTopSales],
    queryFn: () => getTopSales(),
  })

  useEffect(() => {
    console.log('getTopSales-data: ', data);
    console.log('getTopSales-error: ', error);
    console.log('getTopSales-loading: ', isLoading);
  }, [isLoading, error, data])


  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {error ? <ErrorResponse error={'error'} /> :
        <div className="row">
          {isLoading && <Preloader />}
          {/* {isLoading ? <Preloader /> : data && data.map((el: any) => <ProductCard item={el} key={el.id} />)} */}
        </div>}
    </section>
  );
}
