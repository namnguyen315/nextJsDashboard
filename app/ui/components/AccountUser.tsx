'use client';

import Image from 'next/image';
import React from 'react';
import { MdOutlineSwapVert } from 'react-icons/md';
import BtnSignOut from './buttonCustom/BtnSignOut';
import BtnSwitch from './buttonCustom/BtnSwitch';
import { useAppSelector } from '@/lib/hook';

export default function AccountUser() {
  const accountList = useAppSelector((state) => state.accountList.accountUsers);
  const user = useAppSelector((state) => state.user.userInfor);
  const accountListWithoutUser = accountList.filter(
    (item) => item.username !== user?.username && item.email !== user?.email,
  );

  console.log(accountListWithoutUser);
  const handleSwitchAccount = () => {
    console.log('clicked');
  };
  return (
    <div className="flex h-[calc(100%_-_40%_-_25%_-_120px)] flex-col items-center rounded-[5px_5px_15px_15px] bg-[#252836]">
      <div className=" mt-[30px] flex w-[90%] flex-row items-center space-x-3">
        <Image
          src="/images/avatarUser.png"
          alt="avatar user"
          width={50}
          height={50}
          className="rounded-full bg-white"
        />
        <div className="flex w-[calc(100%_-_62px)] flex-col">
          <div className="relative flex w-full flex-row">
            <p className="flex h-full w-[calc(100%_-_25px)] items-center  justify-start truncate font-bold text-slate-200">
              {user?.username}
            </p>
            {/* <button className="duration-[0.5s] ease-[ease] absolute right-0 top-0 text-[#FEFBF6] transition hover:text-[#7BC9FF]">
              <MdOutlineSwapVert size="25px" />
            </button> */}
            <BtnSwitch
              isTypeSwitchAccount={true}
              handleOnClicked={handleSwitchAccount}
              data={accountListWithoutUser}
            />
          </div>
          <p className="mt-[10px] w-full truncate text-[12px] text-slate-400">
            {user?.email}
          </p>
        </div>
      </div>
      <BtnSignOut />
    </div>
  );
}
