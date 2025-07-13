import dbConnect from "../../../../lib/dbConnect";
import Post from "../../../../models/Post";
import Video from "../../../../models/Videos"
import { NextResponse } from "next/server";
const models = {
  posts: Post,
 videos: Video,
  // add more as needed
};
export async function PUT(req, { params }) {
  const url = new URL(req.url);
  const collection = url.pathname.split("/").slice(-2)[0]; 
  const Models = models[collection]; 
  const {id} =await params
  await dbConnect();
  // const body = await req.json();
  const { newTitle: topic, newDescription: content ,newlink:link, updatedImageUrl:imageUrl } = await req.json();
  const updated = await Models.findByIdAndUpdate(id, {topic,link,imageUrl,content});
  
  return NextResponse.json(updated);
}

export async function GET(req,{ params})
{
  // console.log("inside the id route")
  const url = new URL(req.url);
  const collection = url.pathname.split("/").slice(-2)[0]; 
  const Models = models[collection]; 
  const { id } = await params;
  await dbConnect();
  
  const posts = await Models.findById({_id: id});
  return NextResponse.json({posts},{status: 200})

}

export async function DELETE(req, { params }) {
  await dbConnect();
  const url = new URL(req.url);
  const collection = url.pathname.split("/").slice(-2)[0]; 
  const Models = models[collection]; 
  await Models.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted successfully" });
}

