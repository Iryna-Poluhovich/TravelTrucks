import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { Camper } from '../lib/types';


type Filters = {
location?: string;
bodyType?: string;
features: string[]; // e.g. ['AC','kitchen']
};


type State = {
campers: Camper[];
page: number;
limit: number;
totalLoaded: number;
filters: Filters;
favorites: string[];
loading: boolean;
setCampers: (items: Camper[], reset?: boolean) => void;
appendCampers: (items: Camper[]) => void;
setPage: (p: number) => void;
setFilters: (f: Partial<Filters>, resetResults?: boolean) => void;
toggleFavorite: (id: string) => void;
resetResults: () => void;
setLoading: (v: boolean) => void;
};


export const useStore = create<State>()(
persist(
(set, get) => ({
campers: [],
page: 1,
limit: 6,
totalLoaded: 0,
filters: { features: [] },
favorites: [],
loading: false,


setCampers: (items, reset = true) =>
set((s) => ({ campers: reset ? items : [...s.campers, ...items], totalLoaded: (reset ? items.length : s.totalLoaded + items.length) })),


appendCampers: (items) => set((s) => ({ campers: [...s.campers, ...items], totalLoaded: s.totalLoaded + items.length })),


setPage: (p) => set(() => ({ page: p })),


setFilters: (f, resetResults = true) => {
set((s) => ({ filters: { ...s.filters, ...f } }));
if (resetResults) get().resetResults();
},


toggleFavorite: (id) =>
set((s) => ({ favorites: s.favorites.includes(id) ? s.favorites.filter((x) => x !== id) : [...s.favorites, id] })),


resetResults: () => set(() => ({ campers: [], page: 1, totalLoaded: 0 })),


setLoading: (v) => set(() => ({ loading: v })),
}),
{
name: 'traveltrucks-storage',
partialize: (state) => ({ favorites: state.favorites }),
}
)
);