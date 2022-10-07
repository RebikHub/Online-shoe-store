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
  return async (dispatch) => {
    dispatch(fetchTopSalesRequest());
    try {
      const response = await fetch(process.env.REACT_APP_URL_API_TOP);
      if (!response.ok) {
        console.log(response);
        throw new Error('Something bad happened');
      }
      const data = await response.json();

      dispatch(fetchTopSalesSuccess(data));
    } catch (error) {
      console.log(error.message);
      dispatch(fetchTopSalesFailure('Что то пошло не так!'));
    };
  };
};

export function getCategories() {
  return async (dispatch) => {
    dispatch(fetchCategoriesRequest());
    try {
      const response = await fetch(process.env.REACT_APP_URL_API_CATEGORIES);
      if (!response.ok) {
        throw new Error('Something bad happened');
      };
      const data = await response.json();

      dispatch(fetchCategoriesSuccess(data));
    } catch (error) {
      dispatch(fetchCategoriesFailure('Что то пошло не так!'));
    };
  };
};

export function getItems(id) {
  return async (dispatch) => {
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
    } catch (error) {
      dispatch(fetchItemsFailure('Что то пошло не так!'));
    };
  };
};

export function getItemsMore(id, offset, text) {
  return async (dispatch) => {
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
        dispatch(fetchItemsMoreEmpty());
      };

    } catch (error) {
      dispatch(fetchItemsFailure('Что то пошло не так!'));
    };
  };
};

export function getSearch(text) {
  return async (dispatch) => {

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

export function getOrderItem(id) {
  return async (dispatch) => {
    dispatch(fetchItemsRequest());
    try {
      const response = await fetch(`${process.env.REACT_APP_URL_API_ITEMS}/${id}`);

      if (!response.ok) {
        throw new Error('Something bad happened');
      };
      const data = await response.json();
      dispatch(fetchItemSuccess(data));
    } catch (error) {
      dispatch(fetchItemsFailure('Что то пошло не так!'));
    };
  };
};

export function postOrder(item) {
  return async (dispatch) => {
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
    } catch (error) {
      dispatch(postCartFailure('Что то пошло не так!'));
    };
  };
};