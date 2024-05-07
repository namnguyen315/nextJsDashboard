"use client";

import { useState } from "react";
import BtnShutDown from "./buttonCustom/BtnShutDown";

interface IDataIoTDevice {
  nameData?: string;
  value?: string;
}

interface IIoTDeviceCardData {
  production: string;
  nameProduction: string;
  state: string;
  icon: any;
  data: IDataIoTDevice[];
}

export default function IoTDeviceCard({
  device,
}: {
  device: IIoTDeviceCardData;
}) {
  const [state, setState] = useState(device.state);

  const handleOnClicked = () => {
    if (state === "on") {
      setState("off");
    } else {
      setState("on");
    }
  };

  return (
    <div className="flex items-center justify-center h-auto w-[95%] relative">
      {state === "on" ? (
        <div className="z-0 absolute w-full h-full bg-[linear-gradient(45deg,rgba(225,124,247,1)_12%,rgba(250,255,153,1)_34%,rgba(64,141,255,1)_65%,rgba(251,255,177,1)_86%)] rounded-[25px]"></div>
      ) : null}
      <div className="z-10 w-[calc(100%_-_4px)] m-[2px] bg-[#252836] rounded-[23px] p-[15px] pl-[20px] space-y-4 flex flex-col">
        <div
          className={`${state === "on" ? "text-[#5DEBD7]" : "text-slate-500"} `}
        >
          {device.icon}
        </div>
        <div>
          <p
            className={`${
              state === "on" ? "text-slate-200" : "text-slate-500"
            } font-bold text-[17px] w-full truncate`}
          >
            {device.production}
          </p>
          <p className={`text-slate-500 text-[13px] font-bold w-full truncate`}>
            {device.nameProduction}
          </p>
        </div>
        <div>
          {device.data.map((item, index) => {
            return (
              <div className="flex flex-row justify-between" key={index}>
                <p className="text-slate-500 font-bold">{item.nameData}</p>
                <p
                  className={` ${
                    state === "on" ? "text-slate-400" : null
                  } text-slate-500 font-bold`}
                >
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-row justify-between items-center w-full h-auto">
          <p
            className={`${
              state === "on" ? "text-slate-200" : "text-slate-500"
            } font-bold text-[17px] truncate`}
          >
            {state.toUpperCase()}
          </p>
          <BtnShutDown state={state} handleOnClicked={handleOnClicked} />
        </div>
      </div>
    </div>
  );
}
