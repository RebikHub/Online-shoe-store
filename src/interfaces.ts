export interface IStatus {
  loading: boolean;
  error: null | string;
};

export interface ICart extends IStatus { // cartslice
  orders: [] | null;
  status: boolean;
};

export interface ICategories extends IStatus { // categoriesslice
  categories: Category[] | null;
  id: null | string;
};

export interface IItems extends IStatus { // Itemsslice
  items: Products[] | null;
  item: Products[] | null;
  empty: boolean;
  searchResponse: boolean;
};

export interface ITopSales extends IStatus { // topsalesslice
  topSales: Products[] | null;
};

export type Category = {
  id: number,
  title: string,
};

export type Size = {
  size: string,
  avalible: boolean 
}

export type Products = {
  id: number,
  category: number,
  title: string,
  images: string[],
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
