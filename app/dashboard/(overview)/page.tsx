import ActivityWraper from '@/app/ui/components/ActivityWraper';
import BtnSwitch from '@/app/ui/components/buttonCustom/BtnSwitch';
import TotalWaterUseDuringTheDayChart from '@/app/ui/components/chart/TotalWaterUseDuringTheDayChart';
import WaterTank from '@/app/ui/components/WaterTank';
import { GiWaterTank, GiWallet } from 'react-icons/gi';

export default async function Dashboard() {
  const cost = '2.3589273';
  const unit: string = '$';
  let part1, part2;
  const dotIndex = String(cost).indexOf('.');
  if (dotIndex !== -1 && String(cost).length > dotIndex + 3) {
    part1 = String(cost).substring(0, dotIndex + 3);
    part2 = String(cost).substring(dotIndex + 3);
  } else {
    part1 = String(cost);
    part2 = '';
  }

  return (
    <main className="flex h-[100%] w-[100%] flex-row space-x-5">
      <div className="bg-backGroundColor1 flex h-full w-[70%] flex-col items-center justify-between rounded-[25px] p-[30px]">
        <div className="relative flex h-[70px] w-[300px] flex-row items-center rounded-[25px] bg-slate-950 p-[20px]">
          <div className=" flex w-[calc(100%_-_20px)] flex-row items-center">
            <GiWaterTank size="30px" color="#4af3f3" />
            <p className="w-[calc(100%_-_30px)] truncate p-[0_10px] text-center font-bold text-slate-200">
              Water Tank Primary
            </p>
          </div>
          <BtnSwitch position="absolute right-[20px]" />
        </div>

        <WaterTank />
      </div>
      <div className="h-full w-[30%] overflow-hidden">
        <div className="bg-backGroundColor1 h-[400px] w-full rounded-[25px]">
          <div className="flex h-[90px] w-full flex-col items-center justify-between py-[15px]">
            <p className="text-[14px] text-slate-400">
              The total amount of water consumed today
            </p>
            <p className="text-[25px] font-bold text-slate-200">39.5 L</p>
          </div>
          <div className="h-[220px] w-full">
            <TotalWaterUseDuringTheDayChart />
          </div>
          <div className="flex h-[90px] w-full flex-col items-center border-t-[1px] border-slate-600 py-[10px]">
            <div className="relative flex w-[80%] flex-row items-center">
              <GiWallet color="#94a3b8" />
              <p className="ml-[10px] text-[14px] font-medium text-slate-400">
                Estimated cost for today
              </p>
              <BtnSwitch position="absolute right-[20px]" color="slate-400" />
            </div>
            <p className="mt-[15px] w-[80%] pl-[25px] font-bold text-slate-200">
              <span>{unit !== 'vnd' ? unit + ' ' : null}</span>
              <span className="text-slate-100">{part1}</span>
              <span className="text-slate-400">{part2}</span>
              <span>{unit === 'vnd' ? unit : null}</span>
            </p>
          </div>
        </div>
        <div className="bg-backGroundColor1 relative mt-[20px] h-[calc(100%_-_400px_-_20px)] w-full rounded-[25px]">
          <div className="flex h-[70px] w-full flex-row items-center justify-between px-[20px]">
            <p className="font-bold text-slate-200">Activity</p>
            <button className="text-[12px] text-slate-400">See more</button>
          </div>
          <ActivityWraper />
        </div>
      </div>
    </main>
  );
}
