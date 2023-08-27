import { useMutation } from "@tanstack/react-query"
import { getCategory } from "../api/httpServices"
import { Products } from "../../types/types"


type CategoryMutateType = {
  setItems: (callback: (prev: Products[]) => Products[]) => void,
  setIsMore: (isMore: boolean) => void
}

export function useCategoryMutate({ setIsMore, setItems }: CategoryMutateType) {
  return {
    mutation: useMutation(getCategory, {
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
  }
}