import { Skeleton } from '@/components/ui/skeleton';

export default function ResetPassSkeleton() {
  return (
    <div className="justify-centerb flex w-full flex-col items-center pt-10">
      <Skeleton className="h-[36px] w-[235px] rounded-xl" />
      <Skeleton className="mb-[32px] mt-[28px] h-[60px] w-full rounded-3xl" />
      <Skeleton className="mt-[8px] h-[56px] w-full" />
      <Skeleton className="mt-[28px] h-[56px] w-full" />
      <Skeleton className="mt-[44px] h-[48px] w-full" />
    </div>
  );
}
