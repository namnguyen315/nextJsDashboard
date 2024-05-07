'use client';

import { logOut } from '@/app/lib/fetchAPI';
import { toast } from '@/components/ui/use-toast';
import { userLogout } from '@/lib/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { Loader2, PowerIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();

  const [isSubmit, setIsSubmit] = useState(false);

  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  async function handleOnCLicked() {
    setIsSubmit(true);
    dispatch(userLogout());
    const res = await logOut();
    if (res.success === true) {
      toast({
        description: 'Logout Successful!',
      });
      return router.push('/');
    }
    if (res.success === false) {
      setIsSubmit(false);
      toast({
        title: 'Uh Oh! Something went wrong!',
        description: 'Please delete cookie to logout',
      });
    }
  }
  return (
    <button
      disabled={isSubmit}
      onClick={handleOnCLicked}
      className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
    >
      {isSubmit ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <PowerIcon className="w-6" />
      )}

      <div className="hidden md:block">
        {isSubmit ? 'Please wait' : 'Sign Out'}
      </div>
    </button>
  );
}
