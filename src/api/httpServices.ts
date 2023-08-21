import { EndpointApi } from "../types/enum";
import { PostOrderItem } from "../types/interfaces";
import { BaseApiType } from "../types/types";

async function baseApi(apiConfig: BaseApiType) {
  try {
    const response = apiConfig.options ? await fetch(process.env.REACT_APP_URL + apiConfig.url, apiConfig.options) : await fetch(process.env.REACT_APP_URL + apiConfig.url);
    if (!response.ok) {
      throw new Error('Something bad happened');
    }
    const data = await response.json();

    return data;
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