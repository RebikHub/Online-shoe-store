import { ChangeEvent, ReactElement, SyntheticEvent, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import {
  useMutation,
} from '@tanstack/react-query'
import { getSearch } from '../api/httpServices';

type Props = {
  classStyle: string | null
}

export default function FormSearch({ classStyle }: Props): ReactElement {
  const [inputSearch, setInputSearch] = useState('')

  const getSearchMut = useMutation(getSearch)
  // const { search } = useAppSelector((state) => state.searchSlice);
  // const dispatch = useAppDispatch();
  // const location = useLocation();
  // const navigate = useNavigate();

  // function submit(ev: SyntheticEvent) {
  //   ev.preventDefault()
  //   if (location.pathname !== '/catalog' && search !== '') {
  //     navigate('/catalog');
  //     dispatch(getSearch(search));
  //     dispatch(clearSearch());
  //   } else {
  //     dispatch(getSearch(search));
  //     dispatch(clearSearch());
  //   };
  // };

  function submit(ev: SyntheticEvent) {
    ev.preventDefault()
    getSearchMut.mutate(inputSearch, {
      onError: (e) => {
        console.error(e)
      },
      // onSettled: () => {

      // },
      onSuccess: (data) => {
        console.log('getSearch-Data: ', data);

      },
    })
  }

  return (
    <form className={`${classStyle ? classStyle : 'catalog-search-form'} form-inline`} onSubmit={submit}>
      <input className="form-control" placeholder="Поиск"
        value={inputSearch}
        onChange={(ev: ChangeEvent<HTMLInputElement>) => setInputSearch(ev.target.value)} />
    </form>
  );
}
