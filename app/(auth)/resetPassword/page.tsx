import { ResetPassForm } from '@/app/ui/auth/form/ResetPassForm';

export default function ResetPassword({
  searchParams,
}: {
  searchParams: { code: string; email: string };
}) {
    const code = searchParams.code;
    const email = searchParams.email;
    console.log({ code, email });
    return <ResetPassForm code={code} email={email} />;

}
