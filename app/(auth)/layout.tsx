import { Suspense } from 'react';
import Nav from '../ui/auth/nav/Nav';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.bottomSide}>
        <div className={styles.leftSide}>
          <div className={styles.title}>
            <h1>
              Sign In to
              <br />
              Water Flow Track App
            </h1>
            <p>
              If you don’t an account
              <br />
              you can <Link href="/register">Register here!</Link>
            </p>
          </div>
          <Image
            className={styles.image}
            src={'/images/image-login.png'}
            alt='"app overview image'
            width={500}
            height={340}
            priority={true}
          />
        </div>
        <div className={styles.rightSide}>{children}</div>
      </div>
    </div>
  );
}
