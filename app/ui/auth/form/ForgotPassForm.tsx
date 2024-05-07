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
import { fetchApiForgotPass } from '@/app/lib/fetchAPI';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const logInBody = z.object({
  email: z.string().email({ message: 'Please enter valid email!' }),
});

export function ForgotPassForm() {
  const [serverValidate, setServerValidate] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof logInBody>>({
    resolver: zodResolver(logInBody),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof logInBody>) {
    setIsSubmit(true);
    console.log(values);

    const res = await fetchApiForgotPass(values);
    if (res.success === false) {
      if (res.errors.msg.includes('OTP already exists')) {
        toast({
          description: res.errors.msg,
        });
        return router.push(
          `/verifyOTP?type=forgotPassword&success=${res.success}&email=${values.email}&message=${res.errors.msg}`,
        );
      }
      if (res.errors.msg.includes('The email does not exist')) {
        setServerValidate(res.errors.msg);
        setIsSubmit(false);
        return serverValidate;
      }
    } else if (res.message.includes('Send OTP Code' && 'successfully')) {
      toast({
        description: 'OTP has been sent successfully! Please check your email',
      });
      return router.push(
        `/verifyOTP?type=forgotPassword&success=true&email=${values.email}`,
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onChange={() => setServerValidate('')}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="justify-centerb flex h-72 w-full flex-col items-center pt-10">
              <FormLabel className="text-3xl font-bold">
                Forgot Password
              </FormLabel>
              <FormDescription className="pb-8 pt-5 text-center text-sm text-black">
                Wellcome to out password reset tool. Provide your email in the
                form below to begin.
              </FormDescription>
              <FormControl>
                <Input
                  className="h-14 rounded-lg border-2 bg-white font-bold  placeholder:font-medium placeholder:text-slate-400 focus-visible:border-blue-300 focus-visible:ring-0"
                  placeholder="Enter Email"
                  {...field}
                />
              </FormControl>
              <div className="h-4 self-start">
                <FormMessage serverErrors={serverValidate} />
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
          {isSubmit ? 'Please wait' : 'Confirm'}
        </Button>
      </form>
    </Form>
  );
}
