import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopSales } from '../store/middleware';
import ErrorResponse from './ErrorResponse';
import Preloader from './Preloader';
import ProductCard from './ProductCard';

export default function TopSales() {
  const { topSales, loading, error } = useSelector((state) => state.topSalesSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopSales());
  }, [dispatch]);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {error ? <ErrorResponse error={error} handleError={() => dispatch(getTopSales())}/> :
      <div className="row">
        {loading ? <Preloader/> : topSales.map((el) => <ProductCard item={el} key={el.id}/>)}
      </div>}
  </section>
  );
};
