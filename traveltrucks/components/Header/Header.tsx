'use client';


import Link from 'next/link';
import Image from 'next/image';
import css from './Header.module.css';


export default function Header() {
return (
<header className={css.header}>
<div className={css.logo}>
<Image
  src="/icons.svg#icon-Logo"
  alt="TravelTruck Logo"
  width={136}
  height={15}
/>
</div>
<nav className={css.nav}>
<Link href="/">Home</Link>
<Link href="/catalog">Catalog</Link>
</nav>
</header>
);
}