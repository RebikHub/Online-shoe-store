import create from 'zustand';
import { Category } from "../types/interfaces";

interface ICategoriesState {
  categories: Category[] | null;
  id: null | number;
  fetchCategories: (categories: Category[]) => void;
  currentCategoriesId: (id: null | number) => void;
}

const useCategoriesStore = create<ICategoriesState>((set) => ({
  categories: null,
  id: null,
  fetchCategories: (categories) => {
    set({ categories });
  },
  currentCategoriesId: (id) => {
    set({ id });
  },
}));

export default useCategoriesStore;
