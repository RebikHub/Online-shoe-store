import { EndpointApi } from "../types/enum";
import { PostOrderItem } from "../types/interfaces";
import { BaseApiType } from "../types/types";


async function baseApi(apiConfig: BaseApiType) {
  const url = process.env.BASE_API_URL + apiConfig.url
  try {
    const response = apiConfig.options ? await fetch(url, apiConfig.options) : await fetch(url);

    if (!response.ok) {
      throw new Error('Что то пошло не так!');
    }

    return await response.json();
  } catch (e) {
    console.error('Что то пошло не так!');
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

export async function getItems(id: number) {
  const config = {
    url: EndpointApi.Items + `/${id}`
  }
  return await baseApi(config)
}

export async function getItemsMore(id: number | null, offset: number) {
  const config = {
    url: EndpointApi.Items + (id ? `?categoryId=${id}&offset=${offset}` : `?offset=${offset}`)
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
    url: EndpointApi.Items + `/${id}`
  }
  return await baseApi(config)
}

export async function postOrder(item: PostOrderItem) {
  const config = {
    url: EndpointApi.Order,
    options: {
      method: 'POST',
      body: JSON.stringify(item)
    }
  }
  return await baseApi(config)
}