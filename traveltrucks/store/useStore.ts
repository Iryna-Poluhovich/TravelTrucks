'use client';

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Camper } from "@/lib/api";

export interface Filters {
  location: string;
  bodyType: string;
  features: string[]; // local filtering
}

export interface StoreState {
  // filters
  filters: Filters;
  setFilters: (filters: Filters) => void;
  resetFilters: () => void;

  // favorites
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  // campers list
  campers: Camper[]; // already filtered as shown
  setCampers: (campers: Camper[], reset?: boolean) => void;

  // pagination and loading
  page: number;
  setPage: (page: number) => void;
  limit: number;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // filters
      filters: { location: "", bodyType: "", features: [] },
      setFilters: (filters) => set({ filters }),
      resetFilters: () =>
        set({ filters: { location: "", bodyType: "", features: [] }, page: 1 }),

      // favorites
      favorites: [],
      toggleFavorite: (id: string) => {
        const fav = get().favorites;
        set({
          favorites: fav.includes(id) ? fav.filter((f) => f !== id) : [...fav, id],
        });
      },
      isFavorite: (id: string) => get().favorites.includes(id),

      // campers
      campers: [],
      setCampers: (campers: Camper[], reset = false) => {
        if (reset) {
          set({ campers });
        } else {
          set({ campers: [...get().campers, ...campers] });
        }
      },

      // pagination & loading
      page: 1,
      setPage: (page: number) => set({ page }),
      limit: 8,
      loading: false,
      setLoading: (loading: boolean) => set({ loading }),
    }),
    {
      name: "traveltrucks-store",
      partialize: (state) => ({
        favorites: state.favorites,
        filters: state.filters,
        campers: state.campers,
        page: state.page,
      }),
    }
  )
);