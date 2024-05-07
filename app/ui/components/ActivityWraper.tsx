import ActivityCard from "./ActivityCard";

export default function ActivityWraper() {
  const activityData = [
    {
      avatar: "/images/avatarUser.png",
      userName: "NTNam315",
      activity: "turn on the inlet water valve",
      waterTank: "Water Tank Primary",
      timestamp: 1714243810,
    },
    {
      avatar: "/images/avatar1.jpg",
      userName: "Alex",
      activity: "turn on the Smart Lamp",
      room: "living room",
      timestamp: 1714243704,
    },
    {
      avatar: "",
      userName: "System",
      activity: "turn off the inlet water valve",
      waterTank: "Water Tank Primary",
      timestamp: 1714243704,
    },
    {
      avatar: "/images/avatar2.png",
      userName: "Jessica",
      activity: "turn of the Smart Lamp",
      room: "living room",
      timestamp: 1714243704,
    },
    {
      avatar: "/images/avatar2.png",
      userName: "Jessica",
      activity: "turn on the Smart Curtain",
      room: "living room",
      timestamp: 1714243704,
    },
    {
      avatar: "/images/avatar1.jpg",
      userName: "Alex",
      activity: "turn on the Smart Tivi",
      room: "bedroom",
      timestamp: 1714243704,
    },
  ];
  return (
    <>
      <div className="w-full h-[calc(100%_-_100px)] px-[20px] overflow-hidden">
        {activityData.map((data, index) => {
          return (
            <>
              <ActivityCard key={index} data={data} />
              {index !== activityData.length - 1 ? (
                <div className="w-[3px] h-[15px] my-[3px] bg-slate-500 ml-[25px]"></div>
              ) : null}
            </>
          );
        })}
      </div>
      <div
        className="absolute bottom-0 h-[100px] w-full rounded-[0_0_25px_25px] 
      bg-[linear-gradient(180deg,rgba(37,40,54,0)_0%,rgba(37,40,54,0.2)_20%,rgba(37,40,54,0.4)_44%,rgba(37,40,54,0.6)_63%,rgba(37,40,54,0.8)_83%,rgba(37,40,54,1)_100%)] "
      ></div>
    </>
  );
}
