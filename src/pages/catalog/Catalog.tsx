import { ReactElement, SyntheticEvent } from "react";
import { ReactNode } from "react";
import ErrorResponse from "../../components/ErrorResponse";
import Preloader from "../../components/Preloader";
import ProductCard from "../../components/ProductCard";
import ResponseSearch from "../../components/ResponseSearch";
import {
  useQuery,
} from '@tanstack/react-query'
import css from './Catalog.module.css';
import { getCategories, getItems, getSearch } from "../../api/httpServices";
import { QueryKeys } from "../../types/keys";

type Props = {
  children: ReactNode | null;
};

export default function Catalog({ children }: Props): ReactElement {

  const { isLoading, error, data } = useQuery({
    queryKey: [QueryKeys.GetCategories],
    queryFn: () => getCategories(),
  })


  // getSearch(search)

  const handleUpdateRequest = () => {
    console.log('handleUpdateRequest');

  }


  const handleCategoryClick = (ev: SyntheticEvent, id?: number) => {
    ev.preventDefault();
    if (id) {
      // currentCategoriesId(id)
      getItems(id)
    }
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {children}
      {/* {cat.loading && itemsLoading ? (
        <Preloader />
      ) : cat.error && itemsError ? (
        <ErrorResponse error={cat.error} handleError={handleUpdateRequest} />
      ) : (
        <div>
          {cat.loading ? (
            <Preloader />
          ) : cat.error === null ? (
            <ul className="catalog-categories nav justify-content-center">
              <li className="nav-item">
                <span
                  className={`${css.cursor} nav-link ${cat.id === null ? "active" : ""}`}
                  onClick={(ev) => handleCategoryClick(ev)}
                >
                  Все
                </span>
              </li>
              {cat.categories &&
                cat.categories.map((el) => (
                  <li className="nav-item" key={el.id}>
                    <span
                      className={`nav-link ${cat.id === el.id ? "active" : ""
                        }`}
                      onClick={(ev) => handleCategoryClick(ev, el.id)}
                    >
                      {el.title}
                    </span>
                  </li>
                ))}
            </ul>
          ) : (
            <ErrorResponse
              error={cat.error}
              handleError={() => dispatch(getCategories())}
            />
          )} */}

      {/* {itemsError === null ? (
            <div className="row">
              {searchResponse ? (
                <ResponseSearch />
              ) : itemsLoading ? (
                <Preloader />
              ) : (
                items &&
                items.map((el) => <ProductCard item={el} key={el.id} />)
              )}
            </div>
          ) : (
            <ErrorResponse
              error={itemsError}
              handleError={() => dispatch(currentCategoriesId(null))}
            />
          )} */}

      {/* {empty ? null : (
            <div className="text-center">
              <button
                className="btn btn-outline-primary"
                onClick={() =>
                  !!items?.length && dispatch(getItemsMore(cat.id, items.length))
                }
              >
                Загрузить ещё
              </button>
            </div>
          )} */}
      {/* </div>
      )} */}
    </section>
  );
}
