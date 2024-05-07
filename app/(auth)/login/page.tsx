// 'use client';

import Oauth from '@/app/ui/auth/oauth/Oauth';
import styles from './styles.module.scss';
import { LoginForm } from '@/app/ui/auth/form/LogInForm';
import { OAuthRegisterForm } from '@/app/ui/auth/form/OAuthRegisterForm';

interface ISearchParamsLogin {
  url?: string;
  type?: 'oAuthRegister';
  provider?: string;
  profileId?: string;
}

export default function Login({
  searchParams,
}: {
  searchParams: ISearchParamsLogin;
}) {
  const { url, type, provider, profileId } = searchParams;

  if (type === 'oAuthRegister' && provider && profileId) {
    return (
      <div className={styles.container}>
        <OAuthRegisterForm provider={provider} profileId={profileId} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <LoginForm searchParams={searchParams} />
      <div className={styles.device}>
        <div className={styles.line} />
        <p>Or continue with</p>
        <div className={styles.line} />
      </div>
      <div className={styles.oauthButton}>
        <Oauth/>
      </div>
    </div>
  );
}
