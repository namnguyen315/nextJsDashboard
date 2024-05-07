import { fetchApiOauthCallback } from '@/app/lib/fetchAPI';
import OauthCallback from '@/app/ui/auth/oauth/OauthCallback';
import { Suspense } from 'react';

export default async function callback({
  params,
  searchParams,
}: {
  params: {
    provider: string;
  };
  searchParams: {
    code: string;
    state: string;
    error: string;
    error_description: string;
  };
}) {
  const { code, error, state, error_description } = searchParams;

  if (code) {
    const result = await fetchApiOauthCallback({
      provider: params.provider,
      code,
      state,
    });
    return (
      <Suspense fallback={<h1>loading</h1>}>
        <OauthCallback provider={params.provider} result={result} />;
      </Suspense>
    );
  }

  if (error) {
    const data = {
      code: error,
      desc: error_description,
    };
    return <OauthCallback error={data} />;
  }

  console.log(searchParams);
  return <></>;
}
