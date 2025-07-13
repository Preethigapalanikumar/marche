import dbConnect from "../../../../lib/dbConnect";
import VideoCategory from "../../../../models/Videos";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  const url = new URL(req.url);
  const category = url.searchParams.get("category");
  const subcategory = url.searchParams.get("subcategory");

  try {
    const videos = await VideoCategory.find(
      {
        category,
        "subcategories.name": subcategory
      },
      {
        category: 1,
        "subcategories.$": 1  // this returns only the matching subcategory
      }
    ).sort({ _id: -1 });

    return NextResponse.json({ videos }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
