import { EndpointApi } from "../../types/enum";
import { BaseApiType, PostOrderItem } from "../../types/types";


async function baseApi(apiConfig: BaseApiType) {
  const url = process.env.BASE_API_URL + apiConfig.url
  try {
    const response = apiConfig.options ? await fetch(url, apiConfig.options) : await fetch(url);

    if (!response.ok) {
      throw new Error('Что то пошло не так!');
    }

    const data = await response.json();

    return data || []

  } catch (e) {
    console.error(e);
  }
}

export async function getTopSales() {
  const config = {
    url: EndpointApi.TopSales
  }
  return await baseApi(config)
}

export async function getCategories() {
  const config = {
    url: EndpointApi.Categories
  }
  return await baseApi(config)
}

export async function getCategory({ id, page }: { id: number, page: number }) {
  const config = {
    url: EndpointApi.Category + `?categoryId=${id}&page=${page}&limit=6`
  }
  return await baseApi(config)
}

export async function getSearch(text: string) {
  const config = {
    url: EndpointApi.Items + `?q=${text}`
  }
  return await baseApi(config)
}

export async function getOrderItem(id: number) {
  const config = {
    url: EndpointApi.Item + `?id=${id}`
  }
  return await baseApi(config)
}

export async function postOrder(item: PostOrderItem) {
  const config = {
    url: EndpointApi.Order,
    options: {
      method: 'POST',
      body: JSON.stringify(item) as string,
      headers: {
        "Content-Type": "application/json",
      },
    }
  }
  return await baseApi(config)
}