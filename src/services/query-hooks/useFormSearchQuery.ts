import { useMemo } from 'react';
import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../../types/keys"
import { getSearch } from "../api/httpServices"

type FormSearchQueryType = {
  inputSearch: string,
  setInputSearch?: (input: string) => void,
  clearSearch: () => void,
  handleSearch?: (isSearch: boolean) => void
}

export function useFormSearchQuery({ inputSearch, setInputSearch, clearSearch, handleSearch }: FormSearchQueryType) {
  const { refetch } = useQuery({
    queryKey: [QueryKeys.GetSearch],
    queryFn: () => {
      if (inputSearch.trim() !== '') {
        return getSearch(inputSearch)
      }
      return null
    },
    onSuccess: () => {
      setInputSearch?.('')
      clearSearch()
      handleSearch?.(true)
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: false
  })

  return useMemo(() => ({
    refetch
  }), [refetch])
}