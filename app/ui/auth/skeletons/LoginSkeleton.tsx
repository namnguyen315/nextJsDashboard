import { Skeleton } from '@/components/ui/skeleton';

export function LoginSkeleton() {
  return (
    <div className="flex h-[577px] w-full flex-col items-center justify-center pt-[100px]">
      <Skeleton className="mb-[48px] h-[64px] w-full" />
      <Skeleton className="mb-[48px] h-[64px] w-full" />
      <Skeleton className="mb-[32px] h-[24px] w-[112px] self-end rounded-xl" />
      <Skeleton className="h-[48px] w-full" />
      <div className="flex w-full flex-row items-center justify-between">
        <Skeleton className="mt-[40px] h-[2px] w-[118px] rounded-xl" />
        <Skeleton className="ml-[4px] mr-[4px] mt-[40px] h-[19.5px] w-[112px] rounded-xl" />
        <Skeleton className="mt-[40px] h-[2px] w-[118px] rounded-xl" />
      </div>
      <div className="mt-[40px] flex w-full flex-row justify-between">
        <Skeleton className="h-[50px] w-[97px] rounded-xl" />
        <Skeleton className="h-[50px] w-[97px] rounded-xl" />
        <Skeleton className="h-[50px] w-[97px] rounded-xl" />
      </div>
    </div>
  );
}
