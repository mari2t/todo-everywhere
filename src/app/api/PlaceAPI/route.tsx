import { NextRequest, NextResponse } from "next/server";

// 2023/7/6 失敗バージョン
export async function handler(request: NextRequest) {
  const cityName = request.nextUrl.searchParams.get("city");
  const country = request.nextUrl.searchParams.get("country");

  const response = await fetch(
    `https://www.google.com/maps/embed/v1/place?key=${process.env.API_KEY_g}&q=${cityName}+${country}&zoom=8`
  );

  const placeUrl =
    "https://www.google.com/maps/embed/v1/place?key=${process.env.API_KEY_g}&q=${cityName}+${country}&zoom=8";
  const data = await response;
  console.log(response);

  return placeUrl;
}
