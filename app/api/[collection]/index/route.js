import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Post from "../../../../models/Post";
import Video from "../../../../models/Videos"
import NewsnEvent from "../../../../models/NewsnEvent";
import Testimonials from "../../../../models/Testimonials";
const models = {
  posts: Post,
  videoCat: Video,
  newsnEvent:NewsnEvent,
  testimonial:Testimonials
  // add more as needed
};

export async function POST(req) {
  const url = new URL(req.url);
  const collection = url.pathname.split("/").slice(-2)[0]; 
  const Models = models[collection]; 
  await dbConnect();
  const body = await req.json();
  console.log(body);
  try {
    const post = await Models.create(body);
    
    return new Response(JSON.stringify(post), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
 
}
export async function GET(req) {
  // console.log("inside the index")
  await dbConnect();
  const url = new URL(req.url);
  const collection = url.pathname.split("/").slice(-2)[0]; 
  console.log(collection)
  const Models = models[collection]; 
  console.log(Models)
  try {
    const posts = await Models.find({}).sort({ _id: -1 });
    console.log(posts);
    return NextResponse.json({posts});
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

