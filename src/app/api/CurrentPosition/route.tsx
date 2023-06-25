import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const encodedLat = request.nextUrl.searchParams.get("encodedLat");
  const encodedLon = request.nextUrl.searchParams.get("encodedLon");
  const res = await fetch(
    `${process.env.REVERSE_GEOCODING_API_BASE_URL}${encodedLat}&lon=${encodedLon}&limit=5&appid=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const data = await res.json();

  return NextResponse.json(data);
}
