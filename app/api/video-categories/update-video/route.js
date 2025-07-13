import dbConnect from "../../../../lib/dbConnect";
import VideoCategory from "../../../../models/Videos";
import { NextResponse } from 'next/server';

export async function PUT(req) {
  await dbConnect();
  const { category, subcategory, videoName, newVideoData } = await req.json();

  try {
    const updated = await VideoCategory.findOneAndUpdate(
      {
        category,
        "subcategories.name": subcategory,
      },
      {
        $set: {
          "subcategories.$[sub].videos.$[vid].name": newVideoData.name,
          "subcategories.$[sub].videos.$[vid].link": newVideoData.link,
          "subcategories.$[sub].videos.$[vid].thumbnail": newVideoData.thumbnail,
        },
      },
      {
        arrayFilters: [
          { "sub.name": subcategory },
          { "vid.name": videoName }
        ],
        new: true
      }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Video updated', updated }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
