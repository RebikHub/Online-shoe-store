import { useMemo } from 'react';
import { useQuery } from "@tanstack/react-query";
import { getTopSales } from "../api/httpServices";
import { QueryKeys } from "../../types/keys";

export function useTopSalesQuery() {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: [QueryKeys.GetTopSales],
    queryFn: () => getTopSales(),
  })
  return useMemo(() => ({ isLoading, isError, data, refetch }), [data, isError, isLoading, refetch])
}