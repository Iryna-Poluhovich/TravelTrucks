"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Camper, fetchCampers } from "@/lib/api";

export interface Filters {
  location: string;
  bodyType: string;
  features: string[];
}

export interface StoreState {
  // filters
  filters: Filters;
  setFilters: (filters: Filters) => Promise<void>;
  resetFilters: () => Promise<void>;

  // favorites
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  // campers
  campers: Camper[];
  loadCampers: () => Promise<void>;
  appendCampers: () => Promise<void>;

  // pagination & loading
  page: number;
  setPage: (page: number) => void;
  limit: number;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      /* ---------------------- */
      /* FILTERS                */
      /* ---------------------- */

      filters: { location: "", bodyType: "", features: [] },

      setFilters: async (filters) => {
        set({ filters, page: 1 });        // reset page
        await get().loadCampers();        // reload from page=1
      },

      resetFilters: async () => {
        set({ filters: { location: "", bodyType: "", features: [] }, page: 1 });
        await get().loadCampers();
      },

      /* ---------------------- */
      /* FAVORITES              */
      /* ---------------------- */

      favorites: [],
      toggleFavorite: (id: string) => {
        const fav = get().favorites;
        set({
          favorites: fav.includes(id)
            ? fav.filter((f) => f !== id)
            : [...fav, id],
        });
      },

      isFavorite: (id: string) => get().favorites.includes(id),

      /* ---------------------- */
      /* CAMPERS                */
      /* ---------------------- */

      campers: [],

      // 🔥 Load initial campers (reset list)
      loadCampers: async () => {
        const { page, limit, filters } = get();
        set({ loading: true });

        const data = await fetchCampers({
          page,
          limit,
          location: filters.location || undefined,
          bodyType: filters.bodyType || undefined,
        });

        const filtered =
          filters.features.length > 0
            ? data.filter((c) =>
                filters.features.every((f) => c[f as keyof Camper])
              )
            : data;

        set({ campers: filtered, loading: false });
      },

      // 🔥 Load next page (append)
      appendCampers: async () => {
        const { page, limit, filters } = get();
        set({ loading: true });

        const data = await fetchCampers({
          page,
          limit,
          location: filters.location || undefined,
          bodyType: filters.bodyType || undefined,
        });

        const filtered =
          filters.features.length > 0
            ? data.filter((c) =>
                filters.features.every((f) => c[f as keyof Camper])
              )
            : data;

        set({
          campers: [...get().campers, ...filtered],
          loading: false,
        });
      },

      /* ---------------------- */
      /* PAGINATION             */
      /* ---------------------- */

      page: 1,
      setPage: (page) => set({ page }),

      limit: 8,

      /* ---------------------- */
      /* LOADING                */
      /* ---------------------- */

      loading: false,
      setLoading: (loading) => set({ loading }),
    }),

    {
      name: "traveltrucks-store",
      partialize: (state) => ({
        favorites: state.favorites,
        filters: state.filters,
        page: state.page,
      }),
    }
  )
);