import Header from '@/components/Header/Header';
import css from './page.module.css';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className={css.main}>
        <div className={css.banner}>
          <div className={css.overlay}>
            <h1 className={css.title}>Campers of your dreams</h1>
            <p className={css.text}>You can find everything you want in our catalog</p>

            <Link href="/catalog" className={css.button}>
              View Now
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}