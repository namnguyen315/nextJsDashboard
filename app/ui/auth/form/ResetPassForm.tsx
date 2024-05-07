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
import { fetchApiResetPass } from '@/app/lib/fetchAPI';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { PasswordInput } from '@/components/ui/password-input';
import { ToastAction } from '@/components/ui/toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { setUrlRedirect } from '@/lib/features/localVariable/localVariableSlice';

const logInBody = z
  .object({
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

export function ResetPassForm({
  code,
  email,
}: {
  code: string;
  email: string;
}) {
  const [isSubmit, setSubmit] = useState(false);
  const urlRedirect = useAppSelector(
    (state) => state.localVariable.urlRedirect,
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const form = useForm<z.infer<typeof logInBody>>({
    resolver: zodResolver(logInBody),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof logInBody>) {
    setSubmit(true);
    const reqbody = {
      email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    const res = await fetchApiResetPass(reqbody, code);
    if (res.success === false) {
      if (
        res.errors.path.includes('TokenExpiredError') ||
        res.errors.msg.includes('OTP not found')
      ) {
        setSubmit(false);
        return toast({
          title: 'Uh oh! Something went wrong.',
          description: `Please click on the "Undo" button to perform the action Reset Password again`,
          action: (
            <ToastAction
              altText="Undo"
              onClick={() => router.push('/forgotPassword')}
            >
              Undo
            </ToastAction>
          ),
        });
      } else
        return toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: `Please click on the "Undo" button to perform the action again`,
          action: (
            <ToastAction
              altText="Undo"
              onClick={() => router.push('/forgotPassword')}
            >
              Undo
            </ToastAction>
          ),
        });
    } else {
      if (res.message == 'Update password and verified state successfully') {
        dispatch(setUrlRedirect(null));
      }
      toast({
        title: 'Reset password successfully!',
        description: 'Please log in to access our services.',
      });
      return router.push('/login');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="justify-centerb flex h-72 w-full flex-col items-center pt-10">
              <FormLabel className="text-3xl font-bold">
                Reset Password
              </FormLabel>
              <FormDescription className="pb-8 pt-5 text-center text-sm text-black">
                Put your new password. Please use your password stronger by (Cap
                letter, Smallletter, Numeric and symbols)
              </FormDescription>
              <FormControl>
                <PasswordInput
                  className="h-14 w-full rounded-lg border-2 bg-white font-bold  placeholder:font-medium placeholder:text-slate-400 focus-visible:border-blue-300 focus-visible:ring-0"
                  placeholder="New password"
                  {...field}
                />
              </FormControl>
              <div className="h-4">
                <FormMessage />
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
                  placeholder="Comfirm new password"
                  {...field}
                />
              </FormControl>
              <div className="h-4">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button
          disabled={isSubmit}
          className="mt-5 h-12 w-full rounded-lg bg-royalBlue-500 font-bold hover:bg-royalBlue-400"
          type="submit"
        >
          {isSubmit ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isSubmit ? 'Please wait' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
