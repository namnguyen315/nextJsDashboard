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
import { fetchApiRegister } from '@/app/lib/fetchAPI';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const logInBody = z
  .object({
    username: z.string().min(6, {
      message: 'Username must be at least 6 characters.',
    }),
    email: z.string().email({ message: 'Please enter valid email!' }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Confirm password don’t match',
      });
    }
  });

export function RegisterForm() {
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const [usernameServerValidate, setUsernameServerValidate] = useState('');
  const [emailServerValidate, setEmailServerValidate] = useState('');
  const [passwordServerValidate, setPasswordServerValidate] = useState('');
  const [confirmPasswordServerValidate, setConfirmPasswordServerValidate] =
    useState('');

  const form = useForm<z.infer<typeof logInBody>>({
    resolver: zodResolver(logInBody),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof logInBody>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsSubmit(true);
    const res = await fetchApiRegister(values);
    console.log('res.errors.isArray: ', Array.isArray(res.errors));
    if (res.success === false) {
      if (Array.isArray(res.errors)) {
        setIsSubmit(false);
        res.errors.map((err: { path: string; msg: string }) => {
          switch (err.path) {
            case 'username':
              setUsernameServerValidate(err.msg);
              break;
            case 'email':
              setEmailServerValidate(err.msg);
              break;
            case 'password':
              setPasswordServerValidate(err.msg);
              break;
            case 'confirmPassword':
              setConfirmPasswordServerValidate(err.msg);
              break;
            default:
              break;
          }
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: res.errors.msg,
        });
      }
    } else {
      toast({
        description: 'OTP has been sent successfully! Please check your email',
      });
      return router.push(
        `/verifyOTP?type=verifyAccount&success=true&email=${values.email}`,
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-end space-y-8"
        onChange={() => {
          setUsernameServerValidate('');
          setEmailServerValidate('');
          setPasswordServerValidate('');
          setConfirmPasswordServerValidate('');
        }}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className=" h-14 rounded-lg border-2 bg-white font-bold  placeholder:font-medium placeholder:text-slate-400 focus-visible:border-blue-300 focus-visible:ring-0"
                  placeholder="Enter Username"
                  {...field}
                />
              </FormControl>
              <div className="h-4">
                <FormMessage serverErrors={usernameServerValidate} />
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
                  className=" h-14 rounded-lg border-2 bg-white font-bold  placeholder:font-medium placeholder:text-slate-400 focus-visible:border-blue-300 focus-visible:ring-0"
                  placeholder="Enter Email"
                  {...field}
                />
              </FormControl>
              <div className="h-4">
                <FormMessage serverErrors={emailServerValidate} />
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
                  placeholder="Enter password"
                  {...field}
                />
              </FormControl>
              <div className="h-4">
                <FormMessage serverErrors={passwordServerValidate} />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  type="password"
                  className="h-14 rounded-lg border-2 bg-white font-bold  placeholder:font-medium placeholder:text-slate-400 focus-visible:border-blue-300 focus-visible:ring-0"
                  placeholder="Enter comfirm password"
                  {...field}
                />
              </FormControl>
              <div className="h-4">
                <FormMessage serverErrors={confirmPasswordServerValidate} />
              </div>
            </FormItem>
          )}
        />

        <Button
          disabled={isSubmit}
          className="h-12 w-full rounded-lg bg-royalBlue-500 font-bold hover:bg-royalBlue-400"
          type="submit"
        >
          {isSubmit ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isSubmit ? 'Please wait' : 'Sign Up'}
        </Button>
      </form>
    </Form>
  );
}
