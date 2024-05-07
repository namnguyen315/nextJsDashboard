import Image from "next/image";
import { IoSettingsOutline } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";

interface IActivityUserData {
  avatar?: string;
  userName: string;
  activity: string;
  waterTank?: string;
  room?: string;
  timestamp: number;
}
export default function ActivityCard({ data }: { data: IActivityUserData }) {
  const now = Math.floor(Date.now() / 1000);
  const timeGap = now - data.timestamp;
  const hour = Math.floor(timeGap / 3600);
  const minute = Math.floor((timeGap - 3600 * hour) / 60);
  return (
    <div className="flex flex-row w-full h-[70px] items-center">
      {data.userName === "System" || data.avatar === undefined ? (
        <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-white">
          <IoSettingsOutline size="25px" />
        </div>
      ) : (
        <Image
          className="rounded-full w-[50px] h-[50px] bg-white"
          src={data.avatar}
          alt="avatar user"
          width={50}
          height={50}
        />
      )}
      <div className="flex flex-col w-[calc(100%_-_50px_-_10px)] h-full ml-[10px] justify-between py-[8px]">
        <p className="text-[14px] text-slate-400">
          <span className="font-bold text-[14px] text-slate-200">
            {data.userName}
          </span>{" "}
          {data.activity}
        </p>
        <div className="flex flex-row items-center">
          <CiClock2 size="15px" color="#94a3b8" />
          <p className="text-[12px] text-slate-400 w-[calc(100%_-_15px_-_10px)] ml-[10px]">
            {hour > 0
              ? minute !== 0
                ? `${hour} hour ${minute} minutes ago`
                : `${hour} hour ago`
              : minute > 3
              ? `${minute} minutes ago`
              : "Just now"}
          </p>
        </div>
      </div>
    </div>
  );
}
