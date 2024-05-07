import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const oneYear = 24 * 60 * 60 * 360;
  const req = await request.json();
  console.log('router language req: ', req);
  const cookieStore = cookies();
  const result = cookieStore.set('language', req, {
    maxAge: oneYear,
    httpOnly: true,
    path: '/',
  });

  if (!result.has('language')) {
    throw new Error('Failed to set cookie');
  }
  return Response.json({ success: true });
}
