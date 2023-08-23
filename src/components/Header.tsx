import { useState } from 'react';
import headerLogo from '../media/img/header-logo.png';
import { ReactElement } from 'react';
import { Link, NavLink } from 'react-router-dom';
import FormSearch from './FormSearch';
import HeaderCart from './HeaderCart';
import useSearchStore from '../store/search';
import { QueryKeys } from '../types/keys';
import { useQuery } from '@tanstack/react-query';
import { getSearch } from '../api/httpServices';

export default function Header(): ReactElement {
  const [isHidden, setIsHidden] = useState(true)
  const { search, clearSearch } = useSearchStore()

  const { refetch } = useQuery({
    queryKey: [QueryKeys.GetSearch],
    queryFn: () => {
      if (search.trim() !== '') {
        return getSearch(search)
      }
    },
    onSuccess: () => {
      clearSearch()
      setIsHidden(true)
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  function handleSearch() {
    if (isHidden) {
      setIsHidden(false)
    } else {
      refetch()
    }
  }

  return (
    <header className="container">
      <div className="row">
        <div className="col">

          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to={"/"}>
              <img src={headerLogo} alt="Bosa Noga" />
            </Link>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/"}>Главная</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/catalog"}>Каталог</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/about"}>О магазине</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/contacts"}>Контакты</NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div data-id="search-expander" onClick={handleSearch} className="header-controls-pic header-controls-search"></div>
                  <HeaderCart />
                </div>
                {!isHidden && <FormSearch classStyle='header-controls-search-form' handleSearch={handleSearch} />}
              </div>
            </div>
          </nav>

        </div>
      </div>
    </header>
  );
}
