import { ReactElement, SyntheticEvent, useEffect, useState } from "react";
import { ReactNode } from "react";
import ErrorResponse from "../../components/ErrorResponse";
import Preloader from "../../components/Preloader";
import ProductCard from "../../components/ProductCard";
import ResponseSearch from "../../components/ResponseSearch";
import {
  useQuery,
  useMutation
} from '@tanstack/react-query'
import css from './Catalog.module.css';
import { getCategories, getCategory, getCategoryPage, getItems, getItemsMore, getSearch } from "../../api/httpServices";
import { QueryKeys } from "../../types/keys";
import { Category, Products } from "../../types/interfaces";

type Props = {
  children: ReactNode | null;
};

export default function Catalog({ children }: Props): ReactElement {
  const [currentCategory, setCurrentCategory] = useState(0)
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<Products[]>([])
  // const getCategoryMut = useMutation(getCategory)
  const getItemsMoreMut = useMutation(getItemsMore, {
    onSuccess: (data) => {
      console.log(data);

      setItems(prev => ([...prev, data]))
    }
  })

  const { isLoading: loadingCategory, error: errorCategory, data: dataCategory, refetch: refetchCategory } = useQuery({
    queryKey: [QueryKeys.GetCategories],
    queryFn: () => getCategories(),
    onSuccess: () => getItemsMoreMut.mutate({ id: 0, offset: 1 }, { onSuccess: () => { setPage(2) } }),
  })

  // getSearch(search)

  const handleCategoryClick = (ev: SyntheticEvent, id: number = 0) => {
    ev.preventDefault();
    setCurrentCategory(id)
    // getCategoryMut.mutate(id)
    getItemsMoreMut.mutate({ id: currentCategory, offset: 1 }, { onSuccess: () => { setPage(2) } })
  };

  const handleCategoryPage = () => {
    getItemsMoreMut.mutate({ id: currentCategory, offset: page }, { onSuccess: () => { setPage(prev => prev + 1) } })
  }

  useEffect(() => {
    console.log('catalog-item: ', items);

  })

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {children}
      {loadingCategory ? (
        <Preloader />
      ) : errorCategory ? (
        <ErrorResponse handleError={refetchCategory} />
      ) : (
        <div>
          <ul className="catalog-categories nav justify-content-center">
            <li className={`${css.cursor} nav-item`}>
              <span
                className={`nav-link ${currentCategory === 0 ? "active" : ""}`}
                onClick={handleCategoryClick}
              >
                Все
              </span>
            </li>
            {dataCategory.map((el: Category) => (
              <li className={`${css.cursor} nav-item`} key={el.id}>
                <span
                  className={`nav-link ${currentCategory === el.id ? "active" : ""
                    }`}
                  onClick={(ev) => handleCategoryClick(ev, el.id)}
                >
                  {el.title}
                </span>
              </li>
            ))}
          </ul>

          {getItemsMoreMut.isLoading ? <Preloader /> :
            <div className="row">
              {!getItemsMoreMut.data && !getItemsMoreMut.isError ? (
                <ResponseSearch />
              ) : getItemsMoreMut.isError ? <ErrorResponse
                handleError={() => getItemsMoreMut.mutate({ id: currentCategory, offset: page })}
              /> : (
                items.map((el: Products) => <ProductCard item={el} key={el.id + el.category} />)
              )}
            </div>}

          {true && (
            <div className="text-center">
              <button
                className="btn btn-outline-primary"
                onClick={() =>
                  handleCategoryPage()
                  // !!items?.length && dispatch(getItemsMore(cat.id, items.length))
                }
              >
                Загрузить ещё
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
