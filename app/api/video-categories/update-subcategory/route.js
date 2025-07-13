import dbConnect from "../../../../lib/dbConnect";
import VideoCategory from "../../../../models/Videos";
import { NextResponse } from 'next/server';

export async function PUT(req) {
  await dbConnect();
  const { category, oldSubcategoryName, newSubcategoryName } = await req.json();

  try {
    const updated = await VideoCategory.findOneAndUpdate(
      { category, "subcategories.name": oldSubcategoryName },
      { $set: { "subcategories.$.name": newSubcategoryName } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Subcategory name updated', updated }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
