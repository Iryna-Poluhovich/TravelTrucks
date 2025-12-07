'use client';

import React from "react";
import { useStore } from "@/store/useStore";
import css from "./FiltersPanel.module.css";

interface Option {
  name: string;
  iconId: string;
}

// типи кузова з іконками
const BODY_TYPES: Option[] = [
  { name: "Van", iconId: "van" },
  { name: "Fully Integrated", iconId: "fully" },
  { name: "Alcove", iconId: "alcove" },
];

// фічі з іконками
const FEATURES: Option[] = [
  { name: "AC", iconId: "ac" },
  { name: "Automatic", iconId: "automatic" },
  { name: "Bathroom", iconId: "bathroom" },
  { name: "Kitchen", iconId: "kitchen" },
  { name: "TV", iconId: "tv" },
];

export default function FiltersPanel() {
  const filters = useStore((s) => s.filters);
  const setFilters = useStore((s) => s.setFilters);
  const resetFilters = useStore((s) => s.resetFilters);

  const handleLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, location: e.target.value });
  };

  const handleBodyType = (t: string) => {
    setFilters({ ...filters, bodyType: filters.bodyType === t ? "" : t });
  };

  const handleFeature = (feature: string) => {
    const exists = filters.features.includes(feature);
    setFilters({
      ...filters,
      features: exists
        ? filters.features.filter((f) => f !== feature)
        : [...filters.features, feature],
    });
  };

  const clear = () => resetFilters();

  return (
    <aside className={css.panel}>
      {/* Location */}
      <div className={css.block}>
        <label className={css.label}>Location</label>
        <div className={css.location}>
          <svg className={css.icon} width={20} height={20} aria-hidden="true">
            <use href="/icons.svg#icon-location" />
          </svg>
          <input
            className={css.input}
            value={filters.location}
            onChange={handleLocation}
            placeholder="Kyiv, Ukraine"
          />
        </div>
      </div>

      <h3 className={css.title}>Filters</h3>

      {/* Features */}
      <div className={css.block}>
        <p className={css.textlabel}>Vehicle equipment</p>
        <div className={css.options}>
          {FEATURES.map((f) => (
            <button
              key={f.name}
              type="button"
              className={`${css.optionBtn} ${filters.features.includes(f.name) ? css.active : ""}`}
              onClick={() => handleFeature(f.name)}
            >
              <svg className={css.featureIcon} width={24} height={24} aria-hidden="true">
                <use href={`/icons.svg#${f.iconId}`} />
              </svg>
              <span>{f.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Body Types */}
      <div className={css.block}>
        <p className={css.textlabel}>Vehicle type</p>
        <svg className={css.divider} width={360} height={1} aria-hidden="true">
          <use href="/icons.svg#icon-divider" />
        </svg>
        <div className={css.options}>
          {BODY_TYPES.map((t) => (
            <button
              key={t.name}
              type="button"
              className={`${css.optionBtn} ${filters.bodyType === t.name ? css.active : ""}`}
              onClick={() => handleBodyType(t.name)}
            >
              <svg className={css.featureIcon} width={24} height={24} aria-hidden="true">
                <use href={`/icons.svg#${t.iconId}`} />
              </svg>
              <span>{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <div className={css.actions}>
        <button className={css.resetBtn} onClick={clear}>
          Reset
        </button>
      </div>
    </aside>
  );
}