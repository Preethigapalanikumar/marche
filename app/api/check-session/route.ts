// /app/api/admin/session/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();

  const session = cookieStore.get("admin-session");

  if (!session || session.value !== "valid") {
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  }

  return NextResponse.json({ loggedIn: true }, { status: 200 });
}
