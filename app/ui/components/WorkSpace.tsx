import { CiSquarePlus } from "react-icons/ci";
import { TiArrowRight } from "react-icons/ti";
import Link from "next/link";
import Image from "next/image";
export default async function WorkSpace() {
  return (
    <div className=" relative h-[25%] bg-[#252836] rounded-[5px] flex items-center flex-col pt-6">
      <Link
        href="/instruction"
        className="hover:bg-slate-500 transition- duration-[0.5s] ease-[ease] w-[90%] h-[50%] flex flex-row bg-[#3F4562] rounded-3xl items-center"
      >
        <Image
          src="/images/instruction-icon.png"
          alt="instruction-icon.png"
          width={70}
          height={70}
        />
        <div className="flex flex-col">
          <p className="text-[16px] font-bold text-slate-200">
            Setup Instructions
          </p>
          <p className="text-[12px] flex flex-row text-slate-400">
            Read instructions <TiArrowRight size="20px" />
          </p>
        </div>
      </Link>
      <button className="h-[50px] w-[90%] bg-[#3F4562] absolute bottom-5 rounded-md pl-[10px] flex flex-row items-center hover:bg-slate-500 transition duration-[0.5s] ease-[ease]">
        <CiSquarePlus size="30px" color="#FEFBF6" />
        <p className="ml-[5px] text-[14px] font-bold text-slate-200">
          Create new workspace
        </p>
      </button>
    </div>
  );
}
