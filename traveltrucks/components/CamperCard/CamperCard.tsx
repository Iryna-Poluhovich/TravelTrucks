import Link from 'next/link';
import css from './CamperCard.module.css';
import { Camper } from '../../lib/types';
import { useStore } from '../../store/useStore';


export default function CamperCard({ camper }: { camper: Camper }) {
const toggleFavorite = useStore((s) => s.toggleFavorite);
const favorites = useStore((s) => s.favorites);
const isFav = favorites.includes(camper.id);


return (
<article className={css.card}>
<div className={css.media}>
<img src={camper.photos?.[0] ?? '/placeholder.jpg'} alt={camper.name} />
</div>
<div className={css.body}>
<h3>{camper.name}</h3>
<p className={css.location}>{camper.location ?? '—'}</p>
<p className={css.price}>{camper.price.toFixed(2)}</p>
<div className={css.actions}>
<Link href={`/catalog/${camper.id}`} className={css.showMore}>Show more</Link>
<button aria-pressed={isFav} onClick={() => toggleFavorite(camper.id)}>
{isFav ? '★' : '☆'}
</button>
</div>
</div>
</article>
);
}