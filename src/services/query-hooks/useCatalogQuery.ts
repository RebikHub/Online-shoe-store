import { UseMutationResult, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { QueryKeys } from '../../types/keys';
import { getCategories } from '../api/httpServices';
import { Products } from '../../types/types';


type CatalogQueryType = {
  getCategoryMut: UseMutationResult<unknown, unknown, {
    id: number;
    page: number;
  }, unknown>,
  setPage: (page: number) => void,
  setItems: (data: Products[]) => void,
  setIsMore: (isMore: boolean) => void
}

export function useCatalogQuery({
  getCategoryMut,
  setPage,
  setItems,
  setIsMore
}: CatalogQueryType) {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: [QueryKeys.GetCategories],
    queryFn: () => getCategories(),
    onSuccess: () => getCategoryMut.mutate({ id: 0, page: 1 }, { onSuccess: () => setPage(2) }),
    refetchOnWindowFocus: false
  })

  const { isLoading: searchLoading } = useQuery({
    queryKey: [QueryKeys.GetSearch],
    onSuccess: (data) => {
      if (Array.isArray(data) && data.length > 0) {
        setItems(data)
        setIsMore(false)
      }
    }
  })

  return useMemo(() => ({
    isLoading,
    isError,
    data,
    refetch,
    searchLoading
  }), [data, isError, isLoading, refetch, searchLoading])
}