// /app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("admin-session", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0), // Expire immediately
    secure: process.env.NODE_ENV === "production", // Secure in production
    sameSite: "lax",
  });

  return response;
}
