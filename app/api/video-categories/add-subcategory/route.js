import dbConnect from "../../../../lib/dbConnect";
import VideoCategory from "../../../../models/Videos";
import { NextResponse } from 'next/server';

export async function PUT(req) {
  await dbConnect();
  const { categoryId, subcategoryName } = await req.json();
console.log("before try block");
  try {
    console.log("inside try");
    console.log(categoryId)
    const updated = await VideoCategory.findOneAndUpdate(
      {  category:categoryId },
      { $push: { subcategories: { name: subcategoryName, videos: [] } } },
      { new: true }
    );
    console.log(updated);
    if (!updated) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Subcategory added', updated }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
