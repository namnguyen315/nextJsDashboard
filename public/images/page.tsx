import ActivityWraper from "@/app/ui/components/ActivityWraper";
import BtnSwitch from "@/app/ui/components/buttonCustom/BtnSwitch";
import TotalWaterUseDuringTheDayChart from "@/app/ui/components/chart/TotalWaterUseDuringTheDayChart";
import WaterTank from "@/app/ui/components/WaterTank";
import { GiWaterTank, GiWallet } from "react-icons/gi";

export default async function Dashboard() {
  const cost = "2.3589273";
  const unit: string = "$";
  let part1, part2;
  const dotIndex = String(cost).indexOf(".");
  if (dotIndex !== -1 && String(cost).length > dotIndex + 3) {
    part1 = String(cost).substring(0, dotIndex + 3);
    part2 = String(cost).substring(dotIndex + 3);
  } else {
    part1 = String(cost);
    part2 = "";
  }

  return (
    <main className="w-[100%] h-[100%] flex flex-row space-x-5">
      <div className="bg-backGroundColor1 w-[70%] h-full rounded-[25px] p-[30px] flex flex-col items-center justify-between">
        <div className="w-[300px] h-[70px] bg-slate-950 rounded-[25px] p-[20px] flex flex-row items-center relative">
          <div className=" flex flex-row items-center w-[calc(100%_-_20px)]">
            <GiWaterTank size="30px" color="#4af3f3" />
            <p className="text-slate-200 font-bold w-[calc(100%_-_30px)] text-center truncate p-[0_10px]">
              Water Tank Primary
            </p>
          </div>
          <BtnSwitch position="absolute right-[20px]" />
        </div>

        <WaterTank />
      </div>
      <div className="w-[30%] h-full overflow-hidden">
        <div className="w-full h-[400px] bg-backGroundColor1 rounded-[25px]">
          <div className="h-[90px] w-full flex flex-col items-center justify-between py-[15px]">
            <p className="text-slate-400 text-[14px]">
              The total amount of water consumed today
            </p>
            <p className="text-[25px] font-bold text-slate-200">39.5 L</p>
          </div>
          <div className="w-full h-[220px]">
            <TotalWaterUseDuringTheDayChart />
          </div>
          <div className="h-[90px] w-full border-t-[1px] border-slate-600 flex flex-col items-center py-[10px]">
            <div className="w-[80%] flex flex-row relative items-center">
              <GiWallet color="#94a3b8" />
              <p className="text-slate-400 font-medium text-[14px] ml-[10px]">
                Estimated cost for today
              </p>
              <BtnSwitch position="absolute right-[20px]" color="slate-400" />
            </div>
            <p className="w-[80%] text-slate-200 mt-[15px] pl-[25px] font-bold">
              <span>{unit !== "vnd" ? unit + " " : null}</span>
              <span className="text-slate-100">{part1}</span>
              <span className="text-slate-400">{part2}</span>
              <span>{unit === "vnd" ? unit : null}</span>
            </p>
          </div>
        </div>
        <div className="w-full h-[calc(100%_-_400px_-_20px)] mt-[20px] bg-backGroundColor1 rounded-[25px] relative">
          <div className="w-full h-[70px] px-[20px] flex flex-row justify-between items-center">
            <p className="font-bold text-slate-200">Activity</p>
            <button className="text-slate-400 text-[12px]">See more</button>
          </div>
          <ActivityWraper />
        </div>
      </div>
    </main>
  );
}
