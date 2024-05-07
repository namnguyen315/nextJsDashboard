'use client';
import { MdOutlineSwapVert } from 'react-icons/md';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BsThreeDotsVertical } from 'react-icons/bs';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  IAccountUser,
  deleteAccount,
} from '@/lib/features/accountList/accountListSlice';
import { PasswordInput } from '@/components/ui/password-input';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { fetchApiLogin, logOut } from '@/app/lib/fetchAPI';
import { toast } from '@/components/ui/use-toast';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hook';
import { userLoginSuccess, userLogout } from '@/lib/features/user/userSlice';
import { fetchApiLoginNextServer } from '@/app/lib/clientAction';
import SwitchAnotherAccountDialog from '../dialog/SwitchAnotherAccountDialog';
import SwitchAccountDialog from '../dialog/SwitchAccountDialog';

export default function BtnSwitch({
  size = 25,
  color,
  hoverColor,
  position,
  handleOnClicked,
  isTypeSwitchAccount = false,
  data,
}: {
  size?: number;
  color?: string;
  hoverColor?: string;
  position?: string;
  isTypeSwitchAccount?: boolean;
  data?: IAccountUser[];
  handleOnClicked?: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const style = `bg-inherit px-0 py-0 w-[${size}px] h-[${size}px] ${
    color
      ? color.startsWith('#')
        ? `text-[${color}]`
        : `text-${color}`
      : `text-[#00ffff]`
  } ${
    hoverColor
      ? hoverColor.startsWith('#')
        ? `hover:text-[${hoverColor}]`
        : `hover:text-${hoverColor}`
      : `hover:text-darkBlue`
  }  ${position} transition duration-[0.5s] ease-[ease] hover:bg-inherit border-[none] shadow-none`;

  const handleDeleteAccountFromList = (item: IAccountUser) => {
    console.log(item);
    dispatch(deleteAccount(item));
  };

  console.log('isNoData: ', data !== undefined);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={style}>
          <MdOutlineSwapVert size={`${size}px`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        {isTypeSwitchAccount ? (
          data === undefined || data.length === 0 ? (
            <DropdownMenuLabel>No account to switch</DropdownMenuLabel>
          ) : (
            data.map((item, index) => (
              <div key={index}>
                <div className="flex h-full w-full flex-row items-center justify-center ">
                  <SwitchAccountDialog item={item} />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="flex h-[50px] w-[10%] items-center justify-center rounded-none bg-slate-300 px-0 py-0 shadow-none hover:bg-slate-400">
                        <BsThreeDotsVertical color="black" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="flex h-full w-full flex-col items-center justify-center space-y-3">
                      <Button
                        onClick={() => handleDeleteAccountFromList(item)}
                        className="w-full bg-white text-black shadow-none hover:bg-slate-300"
                      >
                        Delete
                      </Button>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenuSeparator />
                </div>
                <DropdownMenuSeparator />
              </div>
            ))
          )
        ) : null}
        {isTypeSwitchAccount ? <SwitchAnotherAccountDialog /> : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
