"use client";

import { useEffect } from "react";
import Header from "@/components/Header/Header";
import FiltersPanel from "@/components/FiltersPanel/FiltersPanel";
import CampersList from "@/components/CampersList/CampersList";
import { useStore } from "@/store/useStore";
import css from "./Catalog.module.css";

export default function CatalogPage() {
  const filters = useStore((s) => s.filters);
  const loadCampers = useStore((s) => s.loadCampers);

  // Завантаження перших кемперів при першому рендері або зміні фільтрів
  useEffect(() => {
    loadCampers(); // тепер викликаємо правильну функцію
  }, [filters, loadCampers]);

  return (
    <>
      <Header />
      <main className={css.container}>
        <aside className={css.filters}>
          <FiltersPanel />
        </aside>
        <section className={css.listWrapper}>
          <CampersList />
        </section>
      </main>
    </>
  );
}
