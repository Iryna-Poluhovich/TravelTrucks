import Header from '@/components/Header/Header';
import Image from 'next/image';
import css from './page.module.css';


export default function HomePage() {
return (
<>
<Header />
<main className={css.main}>
<div className={css.banner}>
<Image
  src="/image/Picture.png"
  alt="Travel Banner"
  width={1200}
  height={500}
  className={css.bannerImage}
/>
<div className={css.overlay}>
<h1 className={css.title}>Campers of your dreams</h1>
<p className={css.text}>You can find everything you want in our catalog</p>
<a href="/catalog" className={css.button}>View Now</a>
</div>
</div>
</main>
</>
);
}