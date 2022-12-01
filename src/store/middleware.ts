import { AppDispatch } from ".";
import { PostOrderItem } from "../interfaces";
import { postCartFailure, postCartRequest, postCartSuccess } from "./cartSlice";
import {
  currentCategoriesId,
  fetchCategoriesFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess
} from "./categoriesSlice";
import {
  fetchItemsFailure,
  fetchItemsMoreEmpty,
  fetchItemsMoreSuccess,
  fetchItemsRequest,
  fetchItemsSuccess,
  fetchItemSuccess,
  responseSearch,
} from "./itemsSlice";
import {
  fetchTopSalesRequest,
  fetchTopSalesSuccess,
  fetchTopSalesFailure
} from "./topSalesSlice";

export function getTopSales() {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchTopSalesRequest());
    try {
      const response = await fetch(process.env.REACT_APP_URL_API_TOP);
      if (!response.ok) {
        throw new Error('Something bad happened');
      }
      const data = await response.json();

      dispatch(fetchTopSalesSuccess(data));
    } catch (e) {
      dispatch(fetchTopSalesFailure('Что то пошло не так!'));
    };
  };
};

export function getCategories() {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchCategoriesRequest());
    try {
      const response = await fetch(process.env.REACT_APP_URL_API_CATEGORIES);
      if (!response.ok) {
        throw new Error('Something bad happened');
      };
      const data = await response.json();

      dispatch(fetchCategoriesSuccess(data));
    } catch (e) {
      dispatch(fetchCategoriesFailure('Что то пошло не так!'));
    };
  };
};

export function getItems(id: number | null) {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchItemsRequest());
    let url = '';
    if (id) {
      url = `?categoryId=${id}`;
      dispatch(currentCategoriesId(id));
    } else {
      dispatch(currentCategoriesId(null));
    };

    try {
      const response = await fetch(process.env.REACT_APP_URL_API_ITEMS + url);

      if (!response.ok) {
        throw new Error('Something bad happened');
      };
      const data = await response.json();
      dispatch(fetchItemsSuccess(data));
    } catch (e) {
      dispatch(fetchItemsFailure('Что то пошло не так!'));
    };
  };
};

export function getItemsMore(id: number | null, offset: number) {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchItemsRequest());

    let url = '';
    
    if (id && offset) {
      url = `?categoryId=${id}&offset=${offset}`;
    } else if (offset) {
      url = `?offset=${offset}`;
    };

    try {
      const response = await fetch(process.env.REACT_APP_URL_API_ITEMS + url);
      if (!response.ok) {
        throw new Error('Something bad happened');
      };
      const data = await response.json();
      
      if (data.length > 0) {
        dispatch(fetchItemsMoreSuccess(data));
      } else {
        dispatch(fetchItemsMoreEmpty(null));
      };

    } catch (e) {
      dispatch(fetchItemsFailure('Что то пошло не так!'));
    };
  };
};

export function getSearch(text: string) {
  return async (dispatch: AppDispatch) => {

    dispatch(fetchItemsRequest());
    let url = `?q=${text}`;
    try {
      const response = await fetch(process.env.REACT_APP_URL_API_ITEMS + url);

      if (!response.ok) {
        throw new Error('Something bad happened');
      };
      const data = await response.json();

      if (data.length === 0) {
        dispatch(responseSearch());
      } else {
        dispatch(fetchItemsSuccess(data));
      };

    } catch (error) {
      dispatch(fetchItemsFailure('Что то пошло не так!'));
    };
  };
};

export function getOrderItem(id: string | undefined | number) {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchItemsRequest());
    try {
      const response = await fetch(`${process.env.REACT_APP_URL_API_ITEMS}/${id}`);

      if (!response.ok) {
        throw new Error('Something bad happened');
      };
      const data = await response.json();
      dispatch(fetchItemSuccess(data));
    } catch (e) {
      dispatch(fetchItemsFailure('Что то пошло не так!'));
    };
  };
};

export function postOrder(item: PostOrderItem) {
  return async (dispatch: AppDispatch) => {
    dispatch(postCartRequest());
    try {
      const response = await fetch(process.env.REACT_APP_URL_API_ORDER, {
        method: 'POST',
        body: JSON.stringify(item)
      });

      if (!response.ok) {
        throw new Error('Something bad happened');
      };
      dispatch(postCartSuccess());
    } catch (e) {
      dispatch(postCartFailure('Что то пошло не так!'));
    };
  };
};