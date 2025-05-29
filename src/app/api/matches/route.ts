// app/api/matches/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const date = new Date().toISOString().split("T")[0]
  console.log(new Date())
  try {
    const response = await axios.get("https://v3.football.api-sports.io/fixtures", {
      headers: {
        "x-apisports-key": process.env.API_KEY!,
      },
      params: {
        date : date
      }
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch matches" }, { status: 500 });
  }
}
