import { Skeleton } from '@/components/ui/skeleton';

export function RegisterSkeleton() {
  return (
    <div className="flex  w-full flex-col items-center justify-center">
      <Skeleton className="mb-[56px] h-[56px] w-full" />
      <Skeleton className="mb-[56px] h-[56px] w-full" />
      <Skeleton className="mb-[56px] h-[56px] w-full" />
      <Skeleton className="mb-[56px] h-[56px] w-full" />
      <Skeleton className="h-[48px] w-full" />
      <div className="mt-[40px] flex w-full flex-row items-center justify-between">
        <Skeleton className=" h-[2px] w-[118px] rounded-xl" />
        <Skeleton className="ml-[4px] mr-[4px] h-[19.5px] w-[112px] rounded-xl" />
        <Skeleton className=" h-[2px] w-[118px] rounded-xl" />
      </div>
      <div className="mt-[40px] flex w-full flex-row justify-between">
        <Skeleton className="h-[50px] w-[97px] rounded-xl" />
        <Skeleton className="h-[50px] w-[97px] rounded-xl" />
        <Skeleton className="h-[50px] w-[97px] rounded-xl" />
      </div>
    </div>
  );
}
