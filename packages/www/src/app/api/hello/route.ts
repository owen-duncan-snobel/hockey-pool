import { NextResponse } from "next/server";


export async function GET(){
  return NextResponse.json({hello: 'works'}, {
    status: 200,
  })
}
