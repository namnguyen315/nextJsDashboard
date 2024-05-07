'use client';

import styles from '../styles.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Button() {
  const path = usePathname();

  return (
    <>
      <Link
        className={`${styles.button} ${
          path === '/login' ? styles.active : styles.inactive
        }`}
        href={'/login'}
      >
        Login
      </Link>
      <Link
        className={`${styles.button} ${
          path === '/register' ? styles.active : styles.inactive
        }`}
        href={'/register'}
      >
        Register
      </Link>
    </>
  );
}
