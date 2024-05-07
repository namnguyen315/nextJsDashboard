import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const oneDay = 24 * 60 * 60 * 365;
  const req = await request.json();
  const cookieStore = cookies();
  const result = cookieStore.set('language', req.language, {
    maxAge: oneDay,
    httpOnly: true,
    path: '/',
  });
  if (!result.has('language')) {
    throw new Error('Failed to set cookie');
  }
  return Response.json({ success: true });
}
