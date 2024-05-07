"use server"

import { unstable_noStore as noStore } from 'next/cache'
import { redirect } from 'next/navigation'

interface ILoginBodyData {
  username: string,
  password: string,
}
interface IRegisterBodyData {
  username: string,
  email: string,
  password: string,
  confirmPassword:string,
}
interface IForgotPassBodyData {
  email: string,
}
interface IVerifyOTPBodyData{
  email: string,
  otp:string
}

interface IResetPassBodyData{
  email: string,
  password: string,
  confirmPassword: string
}

interface IOauthLoginBodyData{
  provider: 'github' | 'google' | 'facebook'
}


interface IOauthRegisterBodyData {
    username: string,
    email: string,
    oauthprofiles: {
        profileId: string
    }
}
 
import { cookies } from 'next/headers'
 
export async function logOut() {
  try {
    cookies().delete('token')
    return {
      success: true
    }
  } catch {
    return {
      success: false,
      errors: {
        path: 'logOut',
        msg: "Can't delete cookies"
      }
    }
  }
}
    

export async function getLanguage() {
  const language = cookies().get('language')?.value
  if (language === undefined || language === '') {
    return "English"
  }
  return language
}


export async function fetchApiLogin(data: ILoginBodyData) {
    noStore()
    console.log(data)
    const dataBody = JSON.stringify(data)
    console.log(dataBody)

     const res = await fetch('http://localhost:3105/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: dataBody,
    });
    const resultdata = await res.json();
    console.log(resultdata);

    return resultdata
}

export async function fetchApiResendOTP(data: any) {
    noStore()
    console.log(data)
    const dataBody = JSON.stringify(data)
    console.log(dataBody)

     const res = await fetch('http://localhost:3105/api/otp/resendOTP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: dataBody,
    });
    const resultdata = await res.json();
    console.log(resultdata);

    return resultdata
}

export async function fetchApiVerifyOTPRegister(data: any) {
  noStore()

  console.log(data)
  const dataBody = JSON.stringify(data)
  console.log(dataBody)

  const res = await fetch('http://localhost:3105/api/otp/verifyOTPRegister', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: dataBody,
  });
  const resultdata = await res.json();
  console.log(resultdata);

  return resultdata
}

export async function fetchApiRegister(data: IRegisterBodyData) {
  noStore()
    const dataBody = JSON.stringify(data)
    console.log(dataBody)
    const res = await fetch('http://localhost:3105/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: dataBody,
    })
    const result = await res.json()
    console.log(result)
    return result
}

export async function fetchApiForgotPass(data: IForgotPassBodyData) {
  noStore()  
  const dataBody = JSON.stringify(data)
    console.log(dataBody)
    const res = await fetch('http://localhost:3105/api/user/forgotPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: dataBody,
    })
    const result = await res.json()
    console.log(result)
    return result
}
export async function fetchApiVerifyOTP(data: IVerifyOTPBodyData) {
  noStore()  
  const dataBody = JSON.stringify(data)
    console.log(dataBody)
    const res = await fetch('http://localhost:3105/api/otp/verifyOTP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: dataBody,
    })
    const result = await res.json()
    console.log(result)
    return result
}

export async function fetchApiResetPass(data: IResetPassBodyData, token: string) {
  noStore()
  console.log(data)
  const dataBody = JSON.stringify(data)
  console.log(dataBody)
  const res = await fetch('http://localhost:3105/api/user/resetPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: dataBody,
  })
  const result = await res.json()
  console.log(result)
  return result
}

interface IOauthCallbackParams{
  provider: string,
  code: string, 
  state: string
}

export async function fetchApiOauthCallback(params: IOauthCallbackParams) {
  noStore()  
  const url = `${process.env.BACKEND_URL}/api/auth/oauth/${params.provider}/callback?code=${params.code}&state=${params.state}`
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  console.log(result)
 return result
}


export async function fetchApiOauthLogin(data: IOauthLoginBodyData) {
  noStore()  
  console.log(data)
    const res = await fetch(`http://localhost:3105/api/auth/oauth/${data.provider}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  const result = await res.json()
 return result
}
export async function fetchApiOauthRegister(data: IOauthRegisterBodyData, provider: string) {
  noStore()  
  console.log(data)
  const dataBody = JSON.stringify(data)
    const res = await fetch(`http://localhost:3105/api/auth/oauth/${provider}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: dataBody
    })
    const result = await res.json()
    console.log(result)
    return result
}

export async function fetchApiGetUser(token: string) {
    noStore()  
  console.log(token)
    const res = await fetch(`http://localhost:3105/api/user/getInforUser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
    const result = await res.json()
    console.log(result)
    return result
}
export async function delayAndReturnResult() {
  noStore() 
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return "Kết quả sau khi chờ 3 giây!";
    
  } catch (error) {
    return error
  }
}