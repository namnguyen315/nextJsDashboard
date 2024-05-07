'use client';

import { logOut } from '@/app/lib/fetchAPI';
import { useState } from 'react';
import { IoExitOutline } from 'react-icons/io5';
import { Loader2 } from 'lucide-react';
import { useAppDispatch } from '@/lib/hook';
import { userLogout } from '@/lib/features/user/userSlice';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function BtnSignOut() {
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleSignOut = async () => {
    setIsSubmit(true);
    const deleteCookie = await logOut();
    if (deleteCookie.success === true) {
      toast({
        title: 'logout successful',
      });
      dispatch(userLogout());
      router.push('/login');
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'please delete cookie to logout',
      });
    }
  };
  return (
    <button
      onClick={handleSignOut}
      className="duration-[0.5s] ease-[ease] mt-[45px] flex h-[40px] w-[90%] flex-row items-center rounded-md bg-[#3F4562] px-[20px] transition hover:bg-slate-500"
    >
      {isSubmit ? (
        <Loader2
          size="25px"
          color="#94a3b8"
          className="mr-2 h-4 w-4 animate-spin"
        />
      ) : (
        <IoExitOutline size="25px" color="#FEFBF6" />
      )}

      <p
        className={`w-full text-center font-bold ${
          isSubmit ? 'text-slate-400' : 'text-slate-200'
        }`}
      >
        {isSubmit ? 'Please wait' : 'Sign Out'}
      </p>
    </button>
  );
}
