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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  fetchApiResendOTP,
  fetchApiVerifyOTP,
  fetchApiVerifyOTPRegister,
} from '@/app/lib/fetchAPI';
import { ToastAction } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import { fetchApiLoginNextServer } from '@/app/lib/clientAction';
import { Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { userLogin } from '@/lib/features/user/userSlice';
import { setUrlRedirect } from '@/lib/features/localVariable/localVariableSlice';

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

export function VerifyOtpForm({
  type,
  email,
}: {
  type: string;
  email: string;
}) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isResendOtp, setIsResendOtp] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [linkEnabled, setLinkEnabled] = useState(false);
  const [serverValidate, setServerValidate] = useState('');

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else return prevCountdown;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      setLinkEnabled(true);
    }
  }, [countdown]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmit(true);
    console.log(type);
    if (type !== 'verifyAccount' && type !== 'forgotPassword') {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
      });
      return router.push('/login');
    }
    if (type === 'verifyAccount') {
      const res = await fetchApiVerifyOTPRegister({ email, otp: data.pin });
      if (res.success === false) {
        if (res.errors.msg.includes('OTP has expired')) {
          setIsSubmit(false);
          return toast({
            title: 'Uh oh! Something went wrong.',
            description: res.errors.msg,
            action: (
              <ToastAction
                altText="Resend OTP"
                onClick={() => handleResendOTP({ isImmediately: true })}
              >
                Resend OTP
              </ToastAction>
            ),
          });
        }
        if (res.errors.msg.includes('Incorrect OTP')) {
          setIsSubmit(false);
          setServerValidate(res.errors.msg);
          return serverValidate;
        }
        return toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: res.errors.msg,
        });
      } else {
        dispatch(userLogin(res.data.userData));
        const result = await fetchApiLoginNextServer(res.data.jwt);
        if (result.success) {
          dispatch(setUrlRedirect(null));
          toast({
            title: 'Account verification successful!',
          });
          return router.push('/dashboard');
        }
        return toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: res.errors.msg,
        });
      }
    }
    if (type === 'forgotPassword') {
      console.log('forgotPassword');
      const reqBody = {
        email: email,
        otp: data.pin,
      };
      const res = await fetchApiVerifyOTP(reqBody);
      if (res.success === false) {
        if (res.errors.msg.includes('Incorrect OTP')) {
          setIsSubmit(false);
          setServerValidate(res.errors.msg);
          return serverValidate;
        }
        if (res.errors.msg.includes('OTP has expired')) {
          return toast({
            title: 'Uh oh! Something went wrong.',
            description: res.errors.msg,
            action: (
              <ToastAction
                altText="Resend OTP"
                onClick={() => handleResendOTP({ isImmediately: true })}
              >
                Resend OTP
              </ToastAction>
            ),
          });
        }
        return toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: res.errors.msg,
        });
      } else {
        const code = res.data.jwt;
        toast({
          title: 'Verification successful.',
          description: 'Please enter a new password.',
        });
        return router.push(`/resetPassword?code=${code}&email=${email}`);
      }
    }
  }

  const handleResendOTP = async ({
    isImmediately,
  }: {
    isImmediately: boolean;
  }) => {
    setIsResendOtp(true);
    if (!isImmediately) {
      setCountdown(120);
      setLinkEnabled(false);
    }
    const res = await fetchApiResendOTP({
      email: email,
    });
    console.log(res);
    setIsResendOtp(false);
    if (res.success) {
      toast({
        title: 'Send OTP successfully',
        description: 'Please check your email!',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: res.errors.msg,
      });
    }
  };

  const handleResendOTPUnenable = () => {
    toast({
      description: `Please click "send again" after ${countdown} second!`,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center pt-10"
        onChange={() => {
          setServerValidate('');
        }}
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center">
              <FormLabel className="text-3xl font-bold">
                OTP Verification
              </FormLabel>
              <FormDescription className="pt-5 text-justify text-sm text-black">
                Please enter the One-Time Password to verify your account
              </FormDescription>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup className="flex w-4/5 flex-row items-center justify-around pt-10 ">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>

              <FormMessage
                serverErrors={serverValidate}
                className="self-start pl-10"
              />

              <FormDescription className="justify-center pt-4 text-center text-slate-500">
                A One-Time Password has been send to Email:{' '}
                <Link href={`mailto:${email}`}>{email}</Link>
              </FormDescription>
              <p className="relative pt-3 text-xs text-slate-600">
                Haven’t received the email?{' '}
                {linkEnabled ? (
                  <span
                    onClick={() => handleResendOTP({ isImmediately: false })}
                    className="cursor-pointer font-semibold text-blue-700"
                  >
                    Send again
                  </span>
                ) : (
                  <span
                    onClick={handleResendOTPUnenable}
                    className="cursor-pointer font-semibold text-blue-700"
                  >
                    Send again
                  </span>
                )}
                {isResendOtp ? (
                  <Loader2 className="absolute right-[-15px] top-[14px] h-3 w-3 animate-spin text-blue-600 " />
                ) : null}
              </p>
            </FormItem>
          )}
        />

        <Button
          disabled={isSubmit}
          className="mt-10 h-11 w-2/3 bg-blue-700"
          type="submit"
        >
          {isSubmit ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isSubmit ? 'Please wait' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
