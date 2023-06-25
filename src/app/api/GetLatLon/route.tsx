import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cityName = request.nextUrl.searchParams.get("city");
  console.log(cityName);
  const res = await fetch(
    `${process.env.GEOCODING_API_BASE_URL}${cityName}&limit=5&appid=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const data = await res.json();

  return NextResponse.json(data);
}
