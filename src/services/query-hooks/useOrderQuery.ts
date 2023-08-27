import { useMemo } from 'react';
import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../../types/keys"
import { getOrderItem } from "../api/httpServices"
import { Products } from '../../types/types';

export function useOrderQuery(id?: string) {
  const { data, isError, isLoading, refetch } = useQuery<Products>({
    queryKey: [QueryKeys.GetOrderItem],
    queryFn: () => getOrderItem(Number(id)),
    refetchOnWindowFocus: false,
    enabled: !!id
  })
  return useMemo(() => ({ data, isError, isLoading, refetch }), [data, isError, isLoading, refetch])
}