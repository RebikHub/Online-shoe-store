import { ReactElement, SyntheticEvent, useState } from "react";
import { ReactNode } from "react";
import ErrorResponse from "../../components/ErrorResponse";
import Preloader from "../../components/Preloader";
import ProductCard from "../../components/ProductCard";
import ResponseSearch from "../../components/ResponseSearch";
import css from './Catalog.module.css';
import { QueryKeys } from "../../types/keys";
import { Category, Products } from "../../types/interfaces";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCategories, getCategory } from "../../api/httpServices";


type Props = {
  children: ReactNode | null;
};

export default function Catalog({ children }: Props): ReactElement {
  const [currentCategory, setCurrentCategory] = useState(0)
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<Products[]>([])
  const [isMore, setIsMore] = useState(true)

  const getCategoryMut = useMutation(getCategory, {
    onSuccess: (data) => {
      if (data && data.length > 0) {
        setItems((prev) => {
          if (prev.length > 0 && prev[0].category === data[0].category) {
            if (prev.length < data.length) {
              setIsMore(true)
              return [...data]
            }
            setIsMore(false)
            return prev
          }
          setIsMore(true)
          return [...data]
        })
      } 
    }
  })

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: [QueryKeys.GetCategories],
    queryFn: () => getCategories(),
    onSuccess: () => getCategoryMut.mutate({ id: 0, page: 1 }, { onSuccess: () => setPage(2) }),
    refetchOnWindowFocus: false
  })

  const handleCategoryClick = (ev: SyntheticEvent, id: number = 0) => {
    ev.preventDefault()
    setCurrentCategory(id)
    getCategoryMut.mutate({ id, page: 1 }, { onSuccess: () => setPage(2)})
  };

  const handleMore = () => {
    getCategoryMut.mutate({ id: currentCategory, page: page }, { onSuccess: () => { setPage(prev => prev + 1) } })
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {children}
      {isLoading ? (
        <Preloader />
      ) : isError ? (
        <ErrorResponse handleError={refetch} />
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
            {data.map((el: Category) => (
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

          {getCategoryMut.isLoading && page === 1 ? <Preloader /> :
            <div className="row">
              {!getCategoryMut.data && items.length === 0 && !getCategoryMut.isError ? (
                <ResponseSearch />
              ) : getCategoryMut.isError ? <ErrorResponse
                handleError={() => getCategoryMut.mutate({ id: currentCategory, page })}
              /> : (
                items.map((el: Products) => <ProductCard item={el} key={el.id + el.category + el.title} />)
              )}
            </div>}

          {isMore && (getCategoryMut.isLoading ? page !== 1 && <Preloader /> : (
            <div className="text-center">
              <button
                className="btn btn-outline-primary"
                onClick={() => handleMore()}
              >
                Загрузить ещё
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
