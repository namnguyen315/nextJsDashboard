import { IoIosArrowBack } from 'react-icons/io';
export default async function BtnToogleSidebar() {
  return (
    <button className="duration-[0.5S] ease-[ease] absolute right-0 top-[50%] h-[40px] w-[50px] rounded-[50%_0_0_50%] bg-slate-950 pl-1 transition hover:bg-slate-600">
      <IoIosArrowBack color="#4af3f3" size="30px" />
    </button>
  );
}
