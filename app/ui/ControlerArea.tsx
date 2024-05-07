import { MdOutlineSwapVert } from 'react-icons/md';
import { TbAirConditioning } from 'react-icons/tb';
import { IoBulb } from 'react-icons/io5';
import { FiSpeaker } from 'react-icons/fi';
import { GiTheaterCurtains } from 'react-icons/gi';
import { PiTelevisionBold } from 'react-icons/pi';
import IoTDeviceCard from './components/IoTDeviceCard';
import BtnSwitch from './components/buttonCustom/BtnSwitch';
import AddIoTDeviceDialog from './components/dialog/AddIoTDeviceDialog';

export default async function ControlerArea() {
  const IoTDevices = [
    {
      production: 'Air Conditioner agjsdhgajs',
      nameProduction: 'Panasonic N73',
      state: 'on',
      icon: <TbAirConditioning size="30px" />,
      data: [
        {
          nameData: 'Swing',
          value: '20°C',
        },
      ],
    },
    {
      production: 'Smart Lamp',
      nameProduction: 'Xiaomi Yeelight',
      state: 'on',
      icon: <IoBulb size="30px" />,
      data: [],
    },
    {
      production: 'Google Home',
      nameProduction: 'Smart Speaker',
      state: 'off',
      icon: <FiSpeaker size="30px" />,
      data: [],
    },
    {
      production: 'Smart Curtain',
      nameProduction: 'Bardi Wifi Curtain',
      state: 'off',
      icon: <GiTheaterCurtains size="30px" />,
      data: [
        {
          nameData: 'Front',
          value: 'Opened',
        },
        {
          nameData: 'Left',
          value: 'Closed',
        },
      ],
    },
    {
      production: 'Smart Tivi',
      nameProduction: 'Tivi Sony Smart TV',
      state: 'off',
      icon: <PiTelevisionBold size="30px" />,
      data: [],
    },
  ];

  const handleOnclick = () => {
    console.log('clicked');
    return;
  };

  return (
    <div className="flex h-full w-[200px] flex-col space-y-3">
      <div className="relative flex h-[120px] flex-col">
        <div className="relative flex w-full flex-row items-center pt-8">
          <p className="w-[170px] truncate pl-3 font-bold text-slate-200">
            Living Room
          </p>
          <BtnSwitch position="absolute right-0" />
        </div>
        <AddIoTDeviceDialog />
      </div>
      <div className="scrollbar h-[calc(100%_-_90px)] w-full space-y-5 overflow-y-auto ">
        {IoTDevices.map((device, index) => {
          return <IoTDeviceCard device={device} key={index} />;
        })}
      </div>
    </div>
  );
}
