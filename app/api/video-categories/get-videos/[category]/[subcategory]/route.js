// /app/api/video-categories/get-videos/[category]/[subcategory]/route.js

import dbConnect from "../../../../../../lib/dbConnect";

import VideoCategory from "../../../../../../models/Videos";
import { NextResponse } from 'next/server';
export async function GET(req, { params }) {
    await dbConnect();
    const { category, subcategory } = await params;
  
    try {
      const result = await VideoCategory.find(
        {
          category,
          "subcategories.name": subcategory
        },
        {
          subcategories: { $elemMatch: { name: subcategory } },
          category: 1,
          title: 1,
          description: 1,
          backgroundVideo: 1
        }
      );
  
      return NextResponse.json(result, { status: 200 });
    } catch (err) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  