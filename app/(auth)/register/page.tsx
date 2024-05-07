// 'use client';
import styles from './styles.module.scss';
import { RegisterForm } from '@/app/ui/auth/form/RegisterFrom';
import Oauth from '@/app/ui/auth/oauth/Oauth';

interface ISearchParamsRegister {
  url?: string;
}

export default function Register({
  searchParams,
}: {
  searchParams: ISearchParamsRegister;
}) {
  const { url } = searchParams;

  return (
    <div className={styles.container}>
      <RegisterForm />
      <div className={styles.device}>
        <div className={styles.line} />
        <p>Or register with</p>
        <div className={styles.line} />
      </div>
      <div className={styles.oauthButton}>
        <Oauth />
      </div>
    </div>
  );
}
