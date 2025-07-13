import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import VideoCategory from "../../../../models/Videos";

export async  function DELETE(req){
    await dbConnect();
    const {_id } = await req.json();
    try {
        const deleted = await VideoCategory.findByIdAndDelete(_id);
        if(!deleted){
            return NextResponse.json({ error:'Category not found'},{status: 404})
        }
    } catch (err) {
        return NextResponse.json({error:err.message},{status: 500})
        
    }

}