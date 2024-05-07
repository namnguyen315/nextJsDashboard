import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { IAccountUser } from '@/lib/features/accountList/accountListSlice';
import { fetchApiLogin, logOut } from '@/app/lib/fetchAPI';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hook';
import { userLoginSuccess, userLogout } from '@/lib/features/user/userSlice';
import { toast } from '@/components/ui/use-toast';
import { fetchApiLoginNextServer } from '@/app/lib/clientAction';
import { PasswordInput } from '@/components/ui/password-input';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SwitchAccountDialog({ item }: { item: IAccountUser }) {
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [serverErr, setServerErr] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const logInBody = z.object({
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
  });

  const form = useForm<z.infer<typeof logInBody>>({
    resolver: zodResolver(logInBody),
    defaultValues: {
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof logInBody>, item: any) {
    setIsSubmit(true);
    const data = {
      username: item.username,
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
          className="h-[50px] w-[90%] rounded-[100px_0_0_100px] bg-slate-300 px-[5px] py-0 hover:bg-slate-400"
        >
          <Avatar className="h-[40px] w-[40px]">
            <AvatarImage
              className="bg-white"
              src={item.avatar !== '' ? item.avatar : '/images/avataUser.png'}
              alt="avatar user"
            />
            <AvatarFallback>{item.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="w-[calc(100%_-_40px)] px-[10px] text-left">
            <p className="w-full truncate text-[12px] font-bold">
              {item.username}
            </p>
            <p className="w-full truncate text-[12px]">{item.email}</p>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="font-bold">Enter your password</DialogHeader>
        <DialogDescription>
          Please add your password to complete the account transition.
        </DialogDescription>
        <Form {...form}>
          <form
            onChange={() => setServerErr('')}
            onSubmit={form.handleSubmit((values: z.infer<typeof logInBody>) =>
              onSubmit(values, item),
            )}
            className="flex w-full flex-col items-end space-y-8"
          >
            <FormItem className="flex w-full flex-row items-center justify-center space-x-5">
              <FormLabel>Username</FormLabel>
              <Input
                className=" h-14 rounded-lg border-2 bg-white font-bold  placeholder:font-medium placeholder:text-slate-400 focus-visible:border-blue-300 focus-visible:ring-0"
                value={item.username}
                disabled
                placeholder="Enter Email or Username"
              />
            </FormItem>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex w-full flex-row items-center justify-center space-x-5">
                  <FormLabel>Password</FormLabel>
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
