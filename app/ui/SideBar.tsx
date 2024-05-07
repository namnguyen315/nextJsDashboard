import React from 'react';
import LogoApp from './components/LogoApp';
import NavLink from './components/NavLink';
import WorkSpace from './components/WorkSpace';
import AccountUser from './components/AccountUser';
import BtnToogleSidebar from './components/buttonCustom/BtnToogleSidebar';

export default async function SideBar() {
  return (
    <div className="relative flex h-[100%] w-[250px] flex-col items-center justify-center">
      <div className="absolute right-0 box-border flex h-[96%] w-[95%] flex-col justify-center space-y-3">
        <LogoApp />
        <NavLink />
        <WorkSpace />
        <AccountUser />
        <BtnToogleSidebar />
      </div>
    </div>
  );
}
