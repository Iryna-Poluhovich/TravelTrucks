'use client';


import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { fetchCampers } from '@/lib/api';
import CamperCard from '../CamperCard/CamperCard';
import css from './CampersList.module.css';


export default function CampersList() {
const campers = useStore((s) => s.campers);
const page = useStore((s) => s.page);
const limit = useStore((s) => s.limit);
const filters = useStore((s) => s.filters);
const setCampers = useStore((s) => s.setCampers);
const appendCampers = useStore((s) => s.appendCampers);
const setPage = useStore((s) => s.setPage);
const loading = useStore((s) => s.loading);
const setLoading = useStore((s) => s.setLoading);


useEffect(() => {
const load = async () => {
setLoading(true);
try {
const params: any = { page: 1, limit };
if (filters.location) params.location = filters.location;
if (filters.bodyType) params.bodyType = filters.bodyType;
filters.features.forEach((f, i) => (params[`features[${i}]`] = f));


const data = await fetchCampers(params);
setCampers(data, true);
setPage(1);
} finally {
setLoading(false);
}
};


load();
}, [filters]);


const loadMore = async () => {
if (loading) return;
setLoading(true);
try {
const next = page + 1;
const params: any = { page: next, limit };
if (filters.location) params.location = filters.location;
if (filters.bodyType) params.bodyType = filters.bodyType;
filters.features.forEach((f, i) => (params[`features[${i}]`] = f));


const data = await fetchCampers(params);
appendCampers(data);
setPage(next);
} finally {
setLoading(false);
}
};


return (
<div className={css.container}>
<div className={css.grid}>
{campers.map((c) => (
<CamperCard key={c.id} camper={c} />
))}
</div>
<div className={css.loadMoreWrapper}>
<button onClick={loadMore} disabled={loading} className={css.loadMoreButton}>
{loading ? 'Loading...' : 'Load More'}
</button>
</div>
</div>
);
}