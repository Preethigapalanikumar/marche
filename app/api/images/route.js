import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// Upload directory path
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// GET - List all images
export async function GET() {
  try {
    const files = fs.readdirSync(uploadDir);
    const imageUrls = files.map(filename => ({
      filename,
      url: `/uploads/${filename}`,
    }));
    return NextResponse.json(imageUrls);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE - Delete a specific image (send ?filename=abc.jpg)
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get('filename');
  const filePath = path.join(uploadDir, filename);

  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ message: 'File deleted' });
    } else {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT - Rename a file (oldName & newName in JSON body)
export async function PUT(req) {
  const { oldName, newName } = await req.json();
  const oldPath = path.join(uploadDir, oldName);
  const newPath = path.join(uploadDir, newName);

  try {
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      return NextResponse.json({
        message: 'File renamed',
        newUrl: `/uploads/${newName}`,
      });
    } else {
      return NextResponse.json({ error: 'Old file not found' }, { status: 404 });
    }
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
