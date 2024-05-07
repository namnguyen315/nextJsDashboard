'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaSquareGithub, FaSquareFacebook } from 'react-icons/fa6';
import { fetchApiOauthLogin } from '@/app/lib/fetchAPI';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hook';

export default function Oauth() {
  const router = useRouter();
  const urlRedirect = useAppSelector(
    (state) => state.localVariable.urlRedirect,
  );
  const handleLoginOauth = async (
    provider: 'github' | 'google' | 'facebook',
  ) => {
    const result = await fetchApiOauthLogin({ provider: provider });

    if (result.success) {
      const popupCenter = ({
        url,
        w,
        h,
      }: {
        url: string;
        w: number;
        h: number;
      }) => {
        const dualScreenLeft = window.screenLeft || window.screenX;
        const dualScreenTop = window.screenTop || window.screenY;
        const width =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          screen.width;
        const height =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          screen.height;
        const left = (width - w) / 2 + dualScreenLeft;
        const top = (height - h) / 2 + dualScreenTop;
        const newWindow = window.open(
          url,
          '_blank',
          `scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`,
        );
        return newWindow;
      };

      popupCenter({
        url: result.data.url,
        w: 500,
        h: 600,
      });
    } else {
      console.log(result);
      if (result.errors.msg.includes("oauth provider dosen't support")) {
        toast({
          title: 'Uh oh! Somthing went wrong!',
          description: `The login service ussing ${provider} account is temporarily unavailable.`,
        });
      }
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener(
      'message',
      (event) => {
        if (event.origin !== process.env.NEXT_PUBLIC_APP_URL) return;

        switch (event.data.type) {
          case 'info':
            toast({
              description: event.data.content,
            });
            break;
          case 'alert':
            toast({
              title: 'Uh oh! Somthing went wrong!',
              description: event.data.content,
            });
            break;
          case 'redirect':
            if (event.data.content === '') {
              router.push(urlRedirect || '/dashboard');
            } else {
              router.replace(event.data.content);
            }
            break;
          default:
            break;
        }
      },
      false,
    );
  }

  return (
    <>
      <button onClick={() => handleLoginOauth('github')}>
        <FaSquareGithub style={{ width: '60%', height: '60%' }} />
      </button>
      <button onClick={() => handleLoginOauth('google')}>
        <FcGoogle style={{ width: '60%', height: '60%' }} />
      </button>
      <button onClick={() => handleLoginOauth('facebook')}>
        <FaSquareFacebook
          style={{ width: '60%', height: '60%', color: 'blue' }}
        />
      </button>
    </>
  );
}
