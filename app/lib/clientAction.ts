"use client"

import { unstable_noStore as noStore } from "next/cache"



export async function fetchApiLoginNextServer(token: string) {
    console.log(token)
    noStore()
    const dataBody = JSON.stringify({token: token})
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            "ContentType": "aplication/json"
        },
        body:dataBody
    })

    if (!res.ok) {
        return {
            success: false,
            errors: {
                path: "API Login next server",
                msg: 'Failed to fetch api set cookie'
            }
        }
    }

    return res.json()
}

export async function setLanguage(data:string ) {

     noStore()
    console.log(data)
    const dataBody = JSON.stringify(data)
    console.log(dataBody)

     const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/language`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: dataBody,
    });
    const resultdata = await res.json();
    console.log("setLanguageFunc resultdata: ", resultdata);

    return resultdata

}
export async function setRedirectURL(data:string ) {

    noStore()
    
    console.log("setRedirectURL")

    console.log(data)
    const dataBody = JSON.stringify({url:data})
    console.log(dataBody)

     const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/oauth/setRedirectURL`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: dataBody,
    });
    const resultdata = await res.json();
    console.log("setRedirectURL resultdata: ", resultdata);

    return resultdata

}