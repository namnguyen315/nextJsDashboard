import React from "react";
import { RiShutDownLine } from "react-icons/ri";

export default function BtnShutDown({
  size = 35,
  state,
  handleOnClicked,
}: {
  size?: number;
  state: string;
  handleOnClicked?: () => void;
}) {
  return (
    <button
      onClick={handleOnClicked}
      className={`${
        size ? `h-[${size}px] w-[${size}px]` : "h-[35px] w-[35px]"
      } rounded-full ${
        state === "on"
          ? "bg-[linear-gradient(315deg,rgba(184,158,244,1)_20%,rgba(137,183,254,1)_49%)]"
          : "bg-[#3F4562]"
      }  flex items-center justify-center`}
    >
      <RiShutDownLine size={`${(size * (60 / 100)).toFixed(0)}px`} />
    </button>
  );
}
