import { ChangeEvent, ReactElement, SyntheticEvent, useState } from 'react';
import {
  useQuery
} from '@tanstack/react-query'
import { getSearch } from '../api/httpServices';
import { QueryKeys } from '../types/keys';
import useSearchStore from '../store/search';

type Props = {
  classStyle?: string
  handleSearch?: (done: boolean, callback?: () => void) => void
}

export default function FormSearch({ classStyle, handleSearch }: Props): ReactElement {
  const [inputSearch, setInputSearch] = useState('')

  const { setSearch, clearSearch } = useSearchStore()

  const { refetch } = useQuery({
    queryKey: [QueryKeys.GetSearch],
    queryFn: () => {
      if (inputSearch.trim() !== '') {
        return getSearch(inputSearch)
      }
      return null
    },
    onSuccess: () => {
      setInputSearch('')
      clearSearch()
      handleSearch?.(true)
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  function submit(ev: SyntheticEvent) {
    ev.preventDefault()
    refetch()
  }

  return (
    <form className={`${classStyle ? classStyle : 'catalog-search-form'} form-inline`} onSubmit={submit}>
      <input className="form-control" placeholder="Поиск"
        value={inputSearch}
        onChange={(ev: ChangeEvent<HTMLInputElement>) => {
          setInputSearch(ev.target.value)
          setSearch(ev.target.value)
        }} />
    </form>
  );
}
