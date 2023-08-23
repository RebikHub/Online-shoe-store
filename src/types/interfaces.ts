export interface ICart { // cartslice
  orders: TOrder[] | null;
  status: boolean;
}

export interface ICategories { // categoriesslice
  categories: Category[] | null;
  id: null | number;
}

export interface IItems { // Itemsslice
  items: Products[] | null;
  item: Products | null;
  empty: boolean;
  searchResponse: boolean;
}

export interface ITopSales { // topsalesslice
  topSales: Products[] | null;
}

export type Category = {
  id: number,
  title: string,
}

export type Size = {
  size: string,
  avalible: boolean
}

export interface BaseProduct {
  id: number
  category: number
  title: string
  price: number
  images: string[]
}

export interface Products extends BaseProduct {
  sku: string,
  manufacturer: string,
  color: string,
  material: string,
  reason: string,
  season: string,
  heelSize: string,
  price: number,
  oldPrice: number,
  sizes: Size[]
}

export type OrderInput = {
  phone: string,
  address: string
}

export type TOrder = {
  count: number,
  id: number,
  price: number,
  size: string,
  title: string
}

export type PostOrderItem = {
  owner: OrderInput,
  items: TOrder[]
}