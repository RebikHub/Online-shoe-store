/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactElement, SyntheticEvent, useEffect } from "react";
import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCategories, getItems, getItemsMore, getSearch } from "../store/middleware";
import { clearSearch } from "../store/searchSlice";
import ErrorResponse from "./ErrorResponse";
import Preloader from "./Preloader";
import ProductCard from "./ProductCard";
import ResponseSearch from "./ResponseSearch";

type Props = {
  children: ReactNode | null
};

export default function Catalog({children}: Props): ReactElement {
  const cat = useAppSelector((state) => state.categoriesSlice);
  const { loading, items, empty, error, searchResponse } = useAppSelector((state) => state.itemsSlice);
  const { search } = useAppSelector((state) => state.searchSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCategoriesAndItems();
  }, []);

  function getCategoriesAndItems() {

    if (cat) {
      dispatch(getCategories());
    };

    if (search === '') {
      dispatch(getItems(null));
    } else {
      dispatch(getSearch(search));
      dispatch(clearSearch());
    };
  };

  function getCategory(ev: SyntheticEvent, id: number) {
    ev.preventDefault();
    dispatch(getItems(id));
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {children}
      {cat.loading && loading ? <Preloader/> :

      cat.error && error ?
        <ErrorResponse error={cat.error} handleError={getCategoriesAndItems}/> :
        <div>
        {cat.loading ? <Preloader/> : cat.error === null ? 

        <ul className="catalog-categories nav justify-content-center">
          <li className="nav-item">
            <a className={`nav-link ${cat.id === null ? 'active' : ''}`} href="#">Все</a>
          </li>
          {cat.categories && cat.categories.map((el) => (
            <li className="nav-item" key={el.id}>
              <a className={`nav-link ${cat.id === el.id? 'active' : ''}`} href="#"
                onClick={(ev) => getCategory(ev, el.id)} >
                {el.title}
              </a>
            </li>
          ))}
        </ul>
        : <ErrorResponse error={cat.error} handleError={() => dispatch(getCategories())}/>}

        {error === null ? 
          <div className="row">
            {searchResponse ? <ResponseSearch/> :
            loading ? <Preloader/> : items && items.map((el) => <ProductCard item={el} key={el.id}/>)}
          </div> : <ErrorResponse error={error} handleError={() => dispatch(getItems(null))}/>}

        {empty ? null : <div className="text-center">
          <button className="btn btn-outline-primary"
            onClick={() => {
              if (cat.id && items) {
                dispatch(getItemsMore(cat.id, items.length))
              }
              }}>Загрузить ещё</button>
        </div>}

      </div>}

    </section>
  );
};
