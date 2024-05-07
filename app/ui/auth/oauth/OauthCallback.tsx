'use client';

import { fetchApiLoginNextServer } from '@/app/lib/clientAction';
import {
  userLoginFailed,
  userLoginSuccess,
} from '@/lib/features/user/userSlice';
import { useAppDispatch } from '@/lib/hook';
import { Suspense, useEffect } from 'react';

interface IOauthCallbackProps {
  provider?: string;
  result?: any;
  error?: {
    code?: string;
    desc?: string;
  };
}

export default function OauthCallback({
  provider,
  result,
  error,
}: IOauthCallbackProps) {
  const handleSendMessageWindow = (type: string, content: string) => {
    if (typeof window !== 'undefined') {
      window.opener.postMessage({ type, content }, origin);
    }
  };

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const dispatch = useAppDispatch();
  const closeWindow = () => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.close();
      }, 100);
    }
  };

  if (result) {
    if (result.success === false) {
      switch (true) {
        case result.errors.msg.includes(
          'The code passed is incorrect or expired',
        ):
          handleSendMessageWindow('alert', result.errors.msg);
          closeWindow();
          break;
        case result.errors.msg.includes('Please verify your acount!'):
          handleSendMessageWindow('alert', result.errors.msg);
          const email = result.data.email;
          handleSendMessageWindow(
            'redirect',
            `${appUrl}/verifyOTP?type=verifyAccount&success=true&email=${email}`,
          );
          closeWindow();
          break;
        default:
          handleSendMessageWindow(
            'alert',
            'Unknow Error! Please contact support for assistance.',
          );
          closeWindow();
          break;
      }
    } else {
      switch (true) {
        case result.message.includes('complete the registration'):
          handleSendMessageWindow('info', result.message);
          const profileId = result.data.profileId;
          handleSendMessageWindow(
            'redirect',
            `${appUrl}/login?type=oAuthRegister&provider=${provider}&profileId=${profileId}`,
          );
          closeWindow();
          break;

        case result.message.includes('You are logged in via'):
          const userData = result.data.dataUser;
          const setTokenToCookie = fetchApiLoginNextServer(result.data.jwt);
          setTokenToCookie
            .then((value) => {
              if (value.success) {
                handleSendMessageWindow('info', result.message);
                dispatch(userLoginSuccess(userData));
                handleSendMessageWindow('redirect', '');
                closeWindow();
              } else {
                handleSendMessageWindow('alert', value.errors.msg);
                closeWindow();
              }
            })
            .catch((reason) => {
              handleSendMessageWindow('alert', reason);
              closeWindow();
            });
          break;
        default:
          closeWindow();
          break;
      }
    }
  }

  if (error && error.code == 'access_denied') {
    handleSendMessageWindow(
      'alert',
      `You have denied permission to link with the ${provider} account.`,
    );
    closeWindow();
  }

  return <></>;
}
