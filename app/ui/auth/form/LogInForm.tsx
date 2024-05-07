'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import Link from 'next/link';
import { fetchApiLoginNextServer } from '@/app/lib/clientAction';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { fetchApiLogin } from '@/app/lib/fetchAPI';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { userLoginSuccess } from '@/lib/features/user/userSlice';
import { setUrlRedirect } from '@/lib/features/localVariable/localVariableSlice';
import { addAccount } from '@/lib/features/accountList/accountListSlice';

const logInBody = z.object({
  username: z.string().min(1, {
    message: 'Please enter username or email.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

interface ISearchParamsLogin {
  url?: string;
  type?: 'oAuthLogin' | 'oAuthRegister';
  success?: string;
  error?: string;
  provider?: string;
  profileId?: string;
  code?: string;
}

export function LoginForm({
  searchParams,
}: {
  searchParams: ISearchParamsLogin;
}) {
  const { url } = searchParams;
  const urlRedirect = useAppSelector(
    (state) => state.localVariable.urlRedirect,
  );

  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const [serverErr, setServerErr] = useState('');

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  if (!!url) {
    dispatch(setUrlRedirect(url));
  }

  const form = useForm<z.infer<typeof logInBody>>({
    resolver: zodResolver(logInBody),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  async function onSubmit(values: z.infer<typeof logInBody>) {
    console.log(values);

    setIsSubmit(true);

    const data = await fetchApiLogin(values);
    if (data.success === false) {
      if (data.errors.path.includes('Auth login')) {
        setIsSubmit(false);
        if (data.errors.msg.includes('Invalid password')) {
          setServerErr('Invalid password');
          return serverErr;
        }
        console.log(data.errors.msg.includes('User does not exist'));
        if (data.errors.msg.includes('User does not exist')) {
          setServerErr('User does not exist');
          return serverErr;
        }
      }
      if (data.errors.path.includes('sendOTP')) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: data.errors.msg,
        });
        return router.push(
          `/verifyOTP?type=verifyAccount&success=${data.success}&email=${data.data.email}&message=${data.errors.msg}`,
        );
      }
    } else {
      console.log('loginForm');
      if (data.message.includes('Send OTP Code' && 'successfully')) {
        toast({
          description:
            'OTP has been sent successfully! Please check your email',
        });
        return router.push(
          `/verifyOTP?type=verifyAccount&success=${data.success}&email=${data.data.email}`,
        );
      }
      console.log(data.data.dataUser);
      dispatch(userLoginSuccess(data.data.dataUser));
      dispatch(
        addAccount({
          avatar: '',
          username: data.data.dataUser.username,
          email: data.data.dataUser.email,
        }),
      );
      const res = await fetchApiLoginNextServer(data.data.jwt);
      console.log(res);
      if (res.success === true) {
        console.log('redirect');
        router.push(urlRedirect ? urlRedirect : '/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description:
            'The regular login function is currently experiencing errors. Please log in using your GitHub, Google, or Facebook account.',
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onChange={() => setServerErr('')}
        className="flex w-full flex-col items-end space-y-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className=" h-14 rounded-lg border-2 bg-white font-bold  placeholder:font-medium placeholder:text-slate-400 focus-visible:border-blue-300 focus-visible:ring-0"
                  placeholder="Enter Email or Username"
                  {...field}
                />
              </FormControl>
              <div className="h-4">
                <FormMessage
                  serverErrors={serverErr.includes('User') ? serverErr : ''}
                />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <PasswordInput
                  className="h-14 rounded-lg border-2 bg-white font-bold  placeholder:font-medium placeholder:text-slate-400 focus-visible:border-blue-300 focus-visible:ring-0"
                  placeholder="Enter Password"
                  {...field}
                />
              </FormControl>
              <div className="h-4">
                <FormMessage
                  serverErrors={serverErr.includes('password') ? serverErr : ''}
                />
              </div>
            </FormItem>
          )}
        />
        <Link
          className="right h-6 w-28 text-xs text-slate-700 transition-all hover:text-orange-600"
          href={'/forgotPassword'}
        >
          Recover Password?
        </Link>
        <Button
          disabled={isSubmit}
          className="h-12 w-full rounded-lg bg-royalBlue-500 font-bold hover:bg-royalBlue-400"
          type="submit"
        >
          {isSubmit ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isSubmit ? 'Please wait' : 'Sign In'}
        </Button>
      </form>
    </Form>
  );
}
