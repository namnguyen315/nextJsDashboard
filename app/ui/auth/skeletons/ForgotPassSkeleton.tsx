import { Skeleton } from '@/components/ui/skeleton';

export function ForgotPassSkeleton() {
  return (
    <div className="flex h-[336px] w-full flex-col items-center justify-center pt-10">
      <Skeleton className="h-[36px] w-[246px] rounded-xl" />
      <Skeleton className="mb-[32px] mt-[30px] h-[32px] w-full rounded-xl" />
      <Skeleton className="mt-[8px] h-[48px] w-full" />
      <Skeleton className="mt-[64px] h-[48px] w-full" />
    </div>
  );
}
