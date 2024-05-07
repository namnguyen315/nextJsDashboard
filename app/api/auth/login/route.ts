import { cookies } from 'next/headers'


export async function POST(request: Request) {

  console.log("next router /login")
  const oneDay = 24 * 60 * 60 * 1000
  const req = await request.json()
  const cookieStore = cookies()
  console.log("req: ",req)
  const resultSetToken = cookieStore.set("token", req.token,{ expires: Date.now() + oneDay , httpOnly:true, path:"/"})  
  if (!resultSetToken.has('token')) {
        throw new Error('Failed to set token to cookie')
  }
    return Response.json({ success: true })
}
