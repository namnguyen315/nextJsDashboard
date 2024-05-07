import React, { useState } from 'react';

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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { PasswordInput } from '@/components/ui/password-input';
import { FiPlusSquare } from 'react-icons/fi';
import { fetchApiLogin, logOut } from '@/app/lib/fetchAPI';
import { useAppDispatch } from '@/lib/hook';
import { userLoginSuccess, userLogout } from '@/lib/features/user/userSlice';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { fetchApiLoginNextServer } from '@/app/lib/clientAction';
import { addAccount } from '@/lib/features/accountList/accountListSlice';

export default function SwitchAnotherAccountDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [serverErr, setServerErr] = React.useState('');

  const dispatch = useAppDispatch();
  const router = useRouter();

  const logInBody = z.object({
    username: z.string().min(1, {
      message: 'Please enter username or email.',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
  });

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
    const data = {
      username: values.username,
      password: values.password,
    };
    const result = await fetchApiLogin(data);
    console.log(result);
    if (result.success === false) {
      if (result.errors.path.includes('Auth login')) {
        setIsSubmit(false);
        if (result.errors.msg.includes('Invalid password')) {
          setServerErr('Invalid password');
          return serverErr;
        }
        console.log(result.errors.msg.includes('User does not exist'));
        if (result.errors.msg.includes('User does not exist')) {
          setServerErr('User does not exist');
          return serverErr;
        }
      }
      if (result.errors.path.includes('sendOTP')) {
        const deleteCookie = await logOut();
        if (deleteCookie.success === true) {
          dispatch(userLogout());
          toast({
            variant: 'destructive',
            title: 'Please verify your account!',
            description:
              ' OTP code have been sent before. Please check your email',
          });
          return router.push(
            `/verifyOTP?type=verifyAccount&success=${result.success}&email=${result.data.email}&message=${result.errors.msg}`,
          );
        } else {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'please delete cookie',
          });
        }
      }
    } else {
      console.log('loginForm');
      if (result.message.includes('Send OTP Code' && 'successfully')) {
        const deleteCookie = await logOut();
        if (deleteCookie.success === true) {
          dispatch(userLogout());
          toast({
            title: 'Please verify your account',
            description:
              'OTP has been sent successfully! Please check your email',
          });
          return router.push(
            `/verifyOTP?type=verifyAccount&success=${result.success}&email=${result.data.email}`,
          );
        } else {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'please delete cookie',
          });
        }
      } else {
        console.log(result.data.dataUser);
        dispatch(
          addAccount({
            avatar: result.data.dataUser.avatar
              ? result.data.dataUser.avatar
              : '',
            username: result.data.dataUser.username,
            email: result.data.dataUser.username,
          }),
        );
        setIsSubmit(false);
        const deleteCookie = await logOut();
        if (deleteCookie.success === true) {
          dispatch(userLogout());
          const res = await fetchApiLoginNextServer(result.data.jwt);
          if (res.success === true) {
            dispatch(userLoginSuccess(result.data.dataUser));
            toast({
              title: 'Switch account successful',
            });
            setIsOpen(false);
            return router.refresh();
          } else {
            toast({
              variant: 'destructive',
              title: 'Uh oh! Something went wrong.',
              description:
                'The switch account function is currently experiencing errors. Please log out your acount and using the regular login function.',
            });
          }
        } else {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'please delete cookie',
          });
        }
      }
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mt-[10px] h-[40px] w-full bg-slate-600 px-[5px] py-0 hover:bg-slate-400"
        >
          <div className="w-30px text-slate-200">
            <FiPlusSquare size="20px" />
          </div>
          <p className="w-[calc(100%_-_30px)] font-bold text-slate-200">
            Use Another account
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="font-bold">Switch account</DialogHeader>
        <DialogDescription>
          Please add username and password to complete the account transition.
        </DialogDescription>
        <Form {...form}>
          <form
            onChange={() => setServerErr('')}
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-end space-y-8"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex w-full flex-row items-start justify-center space-x-5">
                  <FormLabel className="mt-[8px] flex h-[56px] items-center justify-center text-center">
                    Username
                  </FormLabel>
                  <div className="flex w-full flex-col items-start justify-center space-y-5">
                    <FormControl>
                      <Input
                        className="h-14 rounded-lg border-2 bg-white font-bold  placeholder:font-medium placeholder:text-slate-400 focus-visible:border-blue-300 focus-visible:ring-0"
                        placeholder="Enter Username or Email"
                        {...field}
                      />
                    </FormControl>
                    <div className="h-[20px] w-full">
                      <FormMessage
                        serverErrors={
                          serverErr.includes('password') ? serverErr : ''
                        }
                      />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex w-full flex-row items-start justify-center space-x-5">
                  <FormLabel className="mt-[8px] flex h-[56px] items-center justify-center text-center">
                    Password
                  </FormLabel>
                  <div className="flex w-full flex-col items-start justify-center space-y-5">
                    <FormControl>
                      <PasswordInput
                        className="h-14 rounded-lg border-2 bg-white font-bold  placeholder:font-medium placeholder:text-slate-400 focus-visible:border-blue-300 focus-visible:ring-0"
                        placeholder="Enter Password"
                        {...field}
                      />
                    </FormControl>
                    <div className="h-[20px] w-full">
                      <FormMessage
                        serverErrors={
                          serverErr.includes('password') ? serverErr : ''
                        }
                      />
                    </div>
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

            <DialogFooter className="flex w-full flex-row items-center justify-between sm:justify-between">
              <DialogClose asChild>
                <Button
                  className="h-12 w-[30%] rounded-lg bg-slate-400 font-bold text-slate-700 hover:bg-slate-300"
                  type="button"
                  variant="secondary"
                >
                  Close
                </Button>
              </DialogClose>
              <Button
                disabled={isSubmit}
                className="h-12 w-[50%] rounded-lg bg-royalBlue-500 font-bold hover:bg-royalBlue-400"
                type="submit"
              >
                {isSubmit ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isSubmit ? 'Please wait' : 'Sign In'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
