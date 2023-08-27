import { ChangeEvent, ReactElement, SyntheticEvent, useState } from 'react';
import useSearchStore from '../store/search';
import { useFormSearchQuery } from '../services/query-hooks/useFormSearchQuery';

type Props = {
  classStyle?: string
  handleSearch?: (done: boolean, callback?: () => void) => void
}

export default function FormSearch({ classStyle, handleSearch }: Props): ReactElement {
  const [inputSearch, setInputSearch] = useState('')

  const { setSearch, clearSearch } = useSearchStore()

  const { refetch } = useFormSearchQuery({ inputSearch, setInputSearch, clearSearch, handleSearch })

  function submit(ev: SyntheticEvent) {
    ev.preventDefault()
    refetch()
  }

  function handleInputSearch(ev: ChangeEvent<HTMLInputElement>) {
    setInputSearch(ev.target.value)
    setSearch(ev.target.value)
  }

  return (
    <form className={`${classStyle ? classStyle : 'catalog-search-form'} form-inline`} onSubmit={submit}>
      <input className="form-control" placeholder="Поиск"
        value={inputSearch}
        onChange={handleInputSearch} />
    </form>
  );
}
