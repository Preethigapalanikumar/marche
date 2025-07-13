import dbConnect from "../../../../lib/dbConnect";
import VideoCategory from "../../../../models/Videos";
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect();
  const data = await req.json();

  try {
    const category = await VideoCategory.create(data);
    return NextResponse.json({ message: 'Category created', category }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
