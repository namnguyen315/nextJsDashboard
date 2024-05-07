import { Skeleton } from '@/components/ui/skeleton';

export function VerifyOTPSkeleton() {
  return (
    <div className="flex w-full flex-col items-center justify-center pt-10">
      <Skeleton className="h-[36px] w-[228px] rounded-xl" />
      <Skeleton className="mt-[28px] h-[40px] w-full rounded-2xl" />
      <div className="flex h-[92px] w-4/5 flex-row items-center justify-around pt-10 ">
        <Skeleton className="h-11 w-11" />
        <Skeleton className="h-11 w-11" />
        <Skeleton className="h-11 w-11" />
        <Skeleton className="h-11 w-11" />
        <Skeleton className="h-11 w-11" />
        <Skeleton className="h-11 w-11" />
      </div>
      <Skeleton className="mt-[24px] h-[38.38px] w-4/5 rounded-xl" />
      <Skeleton className="mt-[20px] h-[16px] w-[209px] rounded-xl" />
      <Skeleton className="mt-[40px] h-[44px] w-2/3 " />
    </div>
  );
}
