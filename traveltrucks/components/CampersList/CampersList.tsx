'use client';

import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import CamperCard from "../CamperCard/CamperCard";
import css from "./CampersList.module.css";

export default function CampersList() {
  const campers = useStore((s) => s.campers);
  const loadCampers = useStore((s) => s.loadCampers);
  const appendCampers = useStore((s) => s.appendCampers);
  const loading = useStore((s) => s.loading);
  const page = useStore((s) => s.page);
  const setPage = useStore((s) => s.setPage);

  // Load initial campers on mount or when filters change
  useEffect(() => {
    loadCampers();
  }, [loadCampers]);

  // Load next page
  const loadMore = async () => {
    if (loading) return;
    setPage(page + 1);  // оновлюємо сторінку
    await appendCampers();
  };

  return (
    <section className={css.listWrapper}>
      {!loading && campers.length === 0 && (
        <p>No campers found.</p>
      )}

      <div className={css.list}>
        {campers.map((c) => (
          <CamperCard key={c.id} camper={c} />
        ))}
      </div>

      {campers.length > 0 && (
        <div className={css.loadMoreWrap}>
          <button
            className={css.loadMoreBtn}
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </section>
  );
}