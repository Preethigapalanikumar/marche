// app/api/login/route.ts (or /pages/api/login.js for pages router)

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { password } = body;

  if (password === "admin123") {
    const response = NextResponse.json({ success: true });

    // Set httpOnly cookie
    response.cookies.set("admin-session", "valid", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 // 1 hour
    });

    return response;
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
