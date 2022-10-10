import React, { ChangeEvent, ReactElement, SyntheticEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getSearch } from '../store/middleware';
import { changeSearch, clearSearch } from '../store/searchSlice';

type Props = {
  classStyle: string | null
}

export default function FormSearch({classStyle}: Props): ReactElement {
  const { search } = useAppSelector((state) => state.searchSlice);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  function submit(ev: SyntheticEvent) {
    ev.preventDefault()
    if (location.pathname !== '/catalog' && search !== '') {
      navigate('/catalog');
      dispatch(getSearch(search));
      dispatch(clearSearch());
    } else {
      dispatch(getSearch(search));
      dispatch(clearSearch());
    };
  };

  return (
    <form className={`${classStyle ? classStyle : 'catalog-search-form'} form-inline`}
      onSubmit={submit}>
      <input className="form-control" placeholder="Поиск"
      value={search}
      onChange={(ev: ChangeEvent<HTMLInputElement>) => dispatch(changeSearch(ev.target.value))}/>
    </form>
  );
};
