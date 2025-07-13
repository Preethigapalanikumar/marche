import dbConnect from '../../../../lib/dbConnect';
import VideoCategory from '../../../../models/Videos';
import { NextResponse } from 'next/server';

export async function PUT(req) {
  await dbConnect();
  const { id, newCategoryName } = await req.json(); // you can use 'category' instead of 'id'

  try {
    const updated = await VideoCategory.findByIdAndUpdate(
      id, // or use { category: oldName } if you're updating by name
      { $set: { category: newCategoryName } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Category updated', updated }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
