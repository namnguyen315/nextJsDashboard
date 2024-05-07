import Image from 'next/image';
import Link from 'next/link';
import { lusitana } from '../fonts';

export default function LogoApp() {
  return (
    <div className=" flex h-[120px] w-full flex-row items-center rounded-[15px_15px_5px_5px] bg-[#252836]">
      <Link href="/" className="ml-2 flex flex-row items-center">
        <Image
          src="/images/logo-app.png"
          width={100}
          height={100}
          alt="Logo App "
        />
        <h1
          className={`${lusitana.className} text-center text-xl text-[#50C4ED]`}
        >
          Home Flow App
        </h1>
      </Link>
    </div>
  );
}
