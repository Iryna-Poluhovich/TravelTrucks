'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Header.module.css';

export default function Header() {
  const pathname = usePathname(); // поточний URL

  return (
    <header className={css.header}>
      <div className={css.logo}>
        <Link href="/">
          <svg width="136" height="15" aria-label="TravelTruck Logo">
            <use href="/icons.svg#icon-Logo-1" />
          </svg>
        </Link>
      </div>

      <nav className={css.nav}>
        <Link
          href="/"
          className={pathname === '/' ? css.active : ''}
        >
          Home
        </Link>

        <Link
          href="/catalog"
          className={pathname === '/catalog' ? css.active : ''}
        >
          Catalog
        </Link>
      </nav>
    </header>
  );
}