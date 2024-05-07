import { VerifyOtpForm } from '@/app/ui/auth/form/VerifyOTPForm';

export default function VerifyOTP({
  searchParams,
}: {
  searchParams?: {
    type: string;
    email?: string;
    success?: boolean;
    message?: string;
  };
}) {
  const type = searchParams && searchParams.type ? searchParams.type : '';
  const emailAddress =
    searchParams && searchParams.email ? searchParams.email : '';
  const successState = searchParams?.success;
  const message = searchParams?.message;

  return <VerifyOtpForm type={type} email={emailAddress}></VerifyOtpForm>;
}
