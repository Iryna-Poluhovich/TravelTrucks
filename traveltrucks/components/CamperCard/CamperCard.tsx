'use client';

import Link from "next/link";
import { Camper } from "@/lib/api";
import { useStore } from "@/store/useStore";
import css from "./CamperCard.module.css";

interface Props { camper: Camper }

export default function CamperCard({ camper }: Props) {
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const isFavorite = useStore((s) => s.isFavorite(camper.id));

  return (
    <article className={css.card}>
      <div className={css.media}>
        <img src={camper.gallery?.[0] ?? "/placeholder.png"} alt={camper.name} className={css.image} />
      </div>

      <div className={css.body}>
        <div className={css.row}>
          <h3 className={css.name}>{camper.name}</h3>
          <div className={css.price}>€{camper.price.toFixed(2)}</div>
        </div>

        <div className={css.meta}>
          <span>{camper.location}</span>
          <span>⭐ {camper.rating}</span>
        </div>

        <div className={css.actions}>
          <Link href={`/campers/${camper.id}`} className={css.details}>Show more</Link>
          <button
            aria-label="favorite"
            className={`${css.fav} ${isFavorite ? css.active : ""}`}
            onClick={() => toggleFavorite(camper.id)}
            type="button"
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </article>
  );
}