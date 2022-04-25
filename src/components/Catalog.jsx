/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getItems, getItemsMore } from "../store/middleware";
import ErrorResponse from "./ErrorResponse";
import Preloader from "./Preloader";
import ProductCard from "./ProductCard";

export default function Catalog(props) {
  const cat = useSelector((state) => state.categoriesSlice);
  const { loading, items, empty, error } = useSelector((state) => state.itemsSlice);
  const { search } = useSelector((state) => state.searchSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    getCategoriesAndItems();
  }, []);

  function getCategoriesAndItems() {
    dispatch(getCategories());
    if (search === '') {
      dispatch(getItems());
    };
  };

  function handleMore() {
    dispatch(getItemsMore(cat.id, items.length, search));
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {props.children}
      {cat.loading ? <Preloader/> :

      cat.error && error ?
        <ErrorResponse error={cat.error} handleError={getCategoriesAndItems}/> :
        <div>
      {cat.error === null ? 

        <ul className="catalog-categories nav justify-content-center">
          <li className="nav-item">
            <a className={`nav-link ${cat.id === null ? 'active' : ''}`} href="#"
            onClick={() => dispatch(getItems())}>Все</a>
          </li>
          {cat.categories.map((el) => (
            <li className="nav-item" key={el.id}>
              <a className={`nav-link ${cat.id === el.id? 'active' : ''}`} href="#"
                onClick={() => dispatch(getItems(el.id))} >
                {el.title}
              </a>
            </li>
          ))}
        </ul>
        : <ErrorResponse error={cat.error} handleError={() => dispatch(getCategories())}/>}

        {error === null ? 
          <div className="row">
            {loading ? <Preloader/> : items.map((el) => <ProductCard item={el} key={el.id}/>)}
          </div> : <ErrorResponse error={error} handleError={() => dispatch(getItems())}/>}

        {empty ? null : <div className="text-center">
          <button className="btn btn-outline-primary"
            onClick={handleMore}>Загрузить ещё</button>
        </div>}

      </div>}

    </section>
  );
};
