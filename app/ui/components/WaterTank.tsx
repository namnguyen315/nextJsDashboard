'use client';

import { useState } from 'react';
import BtnShutDown from './buttonCustom/BtnShutDown';
// import WaterFlowGauge from "./gaugesCustom/WaterFlowGaugeCopy";
import FrontTank from './iconCustom/FrontTank';
import GroundIcon from './iconCustom/GroundIcon';
import InsideWaterTank from './iconCustom/InsideWaterTank';
import LidWaterTank from './iconCustom/LidWaterTank';
import PipeInIcon from './iconCustom/PipeInIcon';
import PipeOutIcon from './iconCustom/PipeOutIcon';
import WallIcon from './iconCustom/WallIcon';
import WaterFlow from './gauges/WaterFlow';

export default function WaterTank() {
  const [outletState, setOutletState] = useState('on');
  const [inletState, setInletState] = useState('on');

  const handleOnclick = (params: 'inlet' | 'outlet') => {
    if (params === 'inlet') {
      setInletState(inletState === 'on' ? 'off' : 'on');
    }
    if (params === 'outlet') {
      setOutletState(outletState === 'on' ? 'off' : 'on');
    }
  };

  return (
    <div className="relative flex h-[calc(100%_-_70px_-_30px)] w-[calc(100%)] flex-row justify-between rounded-[0_0_5px_5px] bg-slate-950">
      <div className="relative flex w-[700px] flex-col items-center justify-end">
        <div className="mb-[30px] flex h-[50px] w-[200px] items-center justify-center rounded-[10px] bg-[linear-gradient(315deg,rgba(184,158,244,1)_20%,rgba(137,183,254,1)_49%)]">
          <div className="flex h-[46px] w-[196px] items-center justify-between rounded-[10px] bg-backGroundColor1 p-[0_10px]">
            <p className=" w-[110px] font-bold text-slate-400">Water Level :</p>
            <p className=" flex h-full w-[calc(100%_-_110px)] items-center justify-center bg-[linear-gradient(315deg,rgba(184,158,244,1)_20%,rgba(137,183,254,1)_49%)] bg-clip-text font-bold text-transparent">
              100%
            </p>
          </div>
        </div>
        <LidWaterTank />
        <div className="relative z-30">
          <div className=" absolute left-[-70px] top-[-65px] h-[290px] w-[196px]">
            <PipeInIcon />
          </div>
          <div className="absolute bottom-[-15px] right-[-160px] h-[88px] w-[165px]">
            <PipeOutIcon />
          </div>
          <div>
            <FrontTank />
          </div>
        </div>
        <WallIcon />
        <GroundIcon />
        <div
          className="absolute bottom-[70px] left-[calc(50%_-_210px)] z-0 h-[490px] w-[420px] 
        bg-[linear-gradient(90deg,rgba(15,15,15,1)_0%,rgba(58,100,103,1)_30%,rgba(147,221,226,1)_50%,rgba(58,100,103,1)_70%,rgba(15,15,15,1)_100%)] "
        ></div>
        <div className="absolute bottom-[70px] left-[calc(50%_-_210px)] z-20 h-[490px] w-[420px] animate-water-level2-30 bg-[url(/images/Water2.png)] bg-repeat-x "></div>
        <div className="absolute bottom-[70px] left-[calc(50%_-_210px)] z-10 h-[490px] w-[420px] animate-water-level1-30 bg-[url(/images/Water1.png)] bg-repeat-x "></div>
      </div>
      <div className="flex flex-col items-center justify-between">
        <div className="h-[200px] w-[200px] ">
          <WaterFlow />
        </div>
        <div className="relative flex h-[80px] w-full items-center justify-center ">
          {inletState === 'on' ? (
            <div className="absolute h-full w-full rounded-full bg-[linear-gradient(45deg,rgba(225,124,247,1)_12%,rgba(250,255,153,1)_34%,rgba(64,141,255,1)_65%,rgba(251,255,177,1)_86%)] "></div>
          ) : null}
          <div className="z-10  flex h-[76px] w-[calc(100%_-_4px)] flex-row items-center justify-center rounded-full bg-backGroundColor1 p-[0_20px_0_20px]">
            <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-backGroundColorRoot font-bold text-slate-200">
              {inletState.toUpperCase()}
            </div>
            <p className="w-[calc(100%_-_70px)] text-center text-[14px] font-bold text-slate-200">
              Inlet water valve
            </p>
            <BtnShutDown
              state={inletState}
              handleOnClicked={() => handleOnclick('inlet')}
            />
          </div>
        </div>
        <div className="relative mb-[200px] flex h-[80px] w-full items-center justify-center ">
          {outletState === 'on' ? (
            <div className="absolute h-full w-full rounded-full bg-[linear-gradient(45deg,rgba(225,124,247,1)_12%,rgba(250,255,153,1)_34%,rgba(64,141,255,1)_65%,rgba(251,255,177,1)_86%)] "></div>
          ) : null}
          <div className="z-10 flex h-[76px] w-[calc(100%_-_4px)] flex-row items-center justify-center rounded-full bg-backGroundColor1 p-[0_20px_0_20px]">
            <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-backGroundColorRoot font-bold text-slate-200">
              {outletState.toUpperCase()}
            </div>
            <p className="w-[calc(100%_-_70px)] text-center text-[14px] font-bold text-slate-200">
              Outlet water valve
            </p>
            <BtnShutDown
              state={outletState}
              handleOnClicked={() => handleOnclick('outlet')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
