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
import { fetchApiLogin, fetchApiOauthRegister } from '@/app/lib/fetchAPI';

const logInBody = z.object({
  username: z.string().min(1, {
    message: 'Please enter username or email.',
  }),
  email: z.string().email({ message: 'Please enter valid email!' }),
});

export function OAuthRegisterForm({
  provider,
  profileId,
}: {
  provider: string;
  profileId: string;
}) {
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const [serverValidateUsername, setServerValidateUsername] = useState('');
  const [serverValidateEmail, setServerValidateEmail] = useState('');
  const form = useForm<z.infer<typeof logInBody>>({
    resolver: zodResolver(logInBody),
    defaultValues: {
      username: '',
      email: '',
    },
  });
  async function onSubmit(values: z.infer<typeof logInBody>) {
    setIsSubmit(true);
    const reqbody = {
      username: values.username,
      email: values.email,
      oauthprofiles: {
        profileId: profileId,
      },
    };
    const res = await fetchApiOauthRegister(reqbody, provider);
    if (res.success === false) {
      setIsSubmit(false);
      if (Array.isArray(res.errors)) {
        res.errors.map((err: { path: string; msg: string }) => {
          switch (err.path) {
            case 'username':
              setServerValidateUsername(err.msg);
              break;
            case 'email':
              setServerValidateEmail(err.msg);
              break;
            default:
              break;
          }
        });
      } else if (
        res.errors.msg.includes('account has already been registered')
      ) {
        toast({
          variant: 'destructive',
          title: res.errors.msg,
          description: `Please register with a different account or log in with this ${provider} account!`,
        });
        return router.push('/login');
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: res.errors.msg,
        });
      }
    } else {
      toast({
        title: 'Send OTP successful!',
        description: 'Please check your email to verify your account.',
      });
      router.push(
        `/verifyOTP?type=verifyAccount&success=true&email=${values.email}`,
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onChange={() => {
          setServerValidateUsername('');
          setServerValidateEmail('');
        }}
        className="flex w-full flex-col items-center justify-center"
      >
        <FormLabel className="text-3xl font-bold">
          Complete registration
        </FormLabel>
        <FormDescription className="pt-5 text-center text-sm text-black">
          Please provide your username and email to complete the registration
        </FormDescription>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className=" mt-[40px] h-14 rounded-lg border-2 bg-white font-bold  placeholder:font-medium placeholder:text-slate-400 focus-visible:border-blue-300 focus-visible:ring-0"
                  placeholder="Enter Username"
                  {...field}
                />
              </FormControl>
              <div className="h-4">
                <FormMessage serverErrors={serverValidateUsername} />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="mt-[20px] h-14 rounded-lg border-2 bg-white font-bold  placeholder:font-medium placeholder:text-slate-400 focus-visible:border-blue-300 focus-visible:ring-0"
                  placeholder="Enter Email"
                  {...field}
                />
              </FormControl>
              <div className="h-4">
                <FormMessage serverErrors={serverValidateEmail} />
              </div>
            </FormItem>
          )}
        />
        <Button
          disabled={isSubmit}
          className="mt-[20px] h-12 w-full rounded-lg bg-royalBlue-500 font-bold hover:bg-royalBlue-400"
          type="submit"
        >
          {isSubmit ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isSubmit ? 'Please wait' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
