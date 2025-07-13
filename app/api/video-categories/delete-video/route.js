import dbConnect from "../../../../lib/dbConnect";
import VideoCategory from "../../../../models/Videos";
import { NextResponse } from 'next/server';

export async function PUT(req) {
  await dbConnect();
  const { category, subcategory, videoName } = await req.json();

  try {
    const updated = await VideoCategory.findOneAndUpdate(
      { category, "subcategories.name": subcategory },
      { $pull: { "subcategories.$.videos": { name: videoName } } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Video deleted', updated }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
