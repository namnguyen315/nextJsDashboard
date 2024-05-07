import ControlerArea from '../ui/ControlerArea';
import SideBar from '../ui/SideBar';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[100vh] w-[100vw] flex-row items-center bg-slate-950">
      <SideBar />
      <div className=" ml-[20px] flex h-[96%] w-[calc(100%_-_250px_-_40px)] flex-row space-x-5">
        <ControlerArea />
        <div className="h-full w-[calc(100%_-_200px)]">{children}</div>
      </div>
    </div>
  );
}
