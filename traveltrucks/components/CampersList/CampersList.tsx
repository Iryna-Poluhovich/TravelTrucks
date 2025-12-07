'use client';

import { useEffect, useCallback } from "react";
import { useStore } from "@/store/useStore";
import { fetchCampers, Camper, CamperParams } from "@/lib/api";
import CamperCard from "../CamperCard/CamperCard";
import css from "./CampersList.module.css";

export default function CampersList() {
  const campers = useStore((s) => s.campers);
  const page = useStore((s) => s.page);
  const limit = useStore((s) => s.limit);
  const filters = useStore((s) => s.filters);
  const loading = useStore((s) => s.loading);

  const setCampers = useStore((s) => s.setCampers);
  const setPage = useStore((s) => s.setPage);
  const setLoading = useStore((s) => s.setLoading);

  const applyLocalFeatures = (items: Camper[], features: string[]) => {
  if (!features || features.length === 0) return items;

  return items.filter((c) =>
    features.every((f) => {
      const key = f as keyof Camper;

      // Camper features are boolean | undefined
      const value = c[key];

      return value === true; // must be exactly true
    })
  );
};

  const loadCampers = useCallback(
    async (pageNum = 1, reset = false) => {
      setLoading(true);
      try {
        // backend params (no features)
        const params: CamperParams = { page: pageNum, limit, location: filters.location || undefined, bodyType: filters.bodyType || undefined };
        const data = await fetchCampers(params);
        // apply local features filter
        const filtered = applyLocalFeatures(data, filters.features);
        setCampers(filtered, reset);
        setPage(pageNum);
      } catch (err) {
        console.error(err);
        setCampers([], reset);
      } finally {
        setLoading(false);
      }
    },
    [filters.location, filters.bodyType, filters.features, limit, setCampers, setPage, setLoading]
  );

  useEffect(() => {
    // when filters change, load page 1 and reset
    loadCampers(1, true);
  }, [loadCampers]);

  const loadMore = async () => {
    if (loading) return;
    await loadCampers(page + 1, false);
  };

  return (
    <section className={css.listWrapper}>
      {(!Array.isArray(campers) || campers.length === 0) && !loading && <p>No campers found.</p>}

      <div className={css.list}>
        {Array.isArray(campers) && campers.map((c) => <CamperCard key={c.id} camper={c} />)}
      </div>

      {Array.isArray(campers) && campers.length > 0 && (
        <div className={css.loadMoreWrap}>
          <button className={css.loadMoreBtn} onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </section>
  );
}