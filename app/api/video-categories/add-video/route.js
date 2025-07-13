import dbConnect from "../../../../lib/dbConnect";
import VideoCategory from "../../../../models/Videos";
import { NextResponse } from 'next/server';

export async function PUT(req) {
  await dbConnect();
  const { category, subcategory, video } = await req.json();
console.log("category:" + category + "subCategory" + subcategory +"vidoes: " + video)
  try {
    const updated = await VideoCategory.findOneAndUpdate(
      { category, "subcategories.name": subcategory },
      { $push: { "subcategories.$.videos": video } },
      { new: true }
    );

    if (!updated) {
      console.log("inside if ");
      console.log(subcategory);
      
      return NextResponse.json({ error: 'Subcategory not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Video added', updated }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  } 
}
