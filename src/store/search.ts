import { create } from 'zustand';

interface ISearchState {
  search: string;
  setSearch: (input: string) => void;
  clearSearch: () => void;
}

const useSearchStore = create<ISearchState>((set) => ({
  search: '',
  setSearch: (input) => {
    set({
      search: input
    });
  },
  clearSearch: () => {
    set({ search: '' });
  },
}));

export default useSearchStore;