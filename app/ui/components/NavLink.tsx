'use client';

import Link from 'next/link';
import { lusitana } from '../fonts';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaChartLine, FaFileInvoiceDollar } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { IoSettingsSharp } from 'react-icons/io5';
import { usePathname } from 'next/navigation';

export default function NavLink() {
  const pathname = usePathname().split('/dashboard/')[1];

  const link = [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: <MdSpaceDashboard size="20px" color="#FEFBF6" />,
    },
    {
      name: 'Statistics',
      url: '/dashboard/statistics',
      icon: <FaChartLine size="20px" color="#FEFBF6" />,
    },
    {
      name: 'Invoices',
      url: '/dashboard/invoices',
      icon: <FaFileInvoiceDollar size="20px" color="#FEFBF6" />,
    },
    {
      name: 'Shopping',
      url: '/dashboard/shopping',
      icon: <FaCartShopping size="20px" color="#FEFBF6" />,
    },
    {
      name: 'Setting',
      url: '/dashboard/setting',
      icon: <IoSettingsSharp size="20px" color="#FEFBF6" />,
    },
  ];

  return (
    <div className="h-[40%] rounded-[5px] bg-[#252836] ">
      <ul className={`h-full`}>
        {link.map((item, index) => {
          return (
            <li
              key={index}
              className={`
                ${
                  (pathname === undefined && item.url === '/dashboard') ||
                  item.url.includes(pathname)
                    ? `rounded-[5px_5px_0_0] 
                    bg-[#2D3640] before:absolute before:left-0 before:block before:h-[35px] before:w-[5px] 
                    before:rounded-[0%_50%_50%_0%]
                    before:bg-slate-200
                    before:content-[''] after:absolute after:right-0 after:block after:h-[35px] after:w-[5px] 
                    after:rounded-[50%_0%_0%_50%] after:bg-[linear-gradient(0deg,rgba(225,124,247,1)_12%,rgba(91,121,255,1)_46%,rgba(112,194,255,1)_78%)] 
                    after:content-[''] ${
                      index === 0
                        ? 'rounded-[5px_5px_0_0]'
                        : index === link.length - 1
                        ? 'rounded-[0_0_5px_5px]'
                        : ''
                    }`
                    : 'duration-[1.5s] ease-[ease] transition hover:bg-slate-500'
                } flex h-[calc(20%)] w-full items-center pl-[35px]`}
            >
              <Link
                href={item.url}
                className="flex h-full w-full flex-row items-center space-x-5"
              >
                {item.icon}
                <h1 className={`${lusitana.className} text-slate-100`}>
                  {item.name}
                </h1>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
