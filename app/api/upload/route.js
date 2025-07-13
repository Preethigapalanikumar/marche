import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';

export const dynamic = 'force-dynamic'; // Allow dynamic behavior (needed for file upload)

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const folder = searchParams.get("folder") || "default"; // fallback
  const uploadFolder = path.join(process.cwd(), 'public', 'uploads',folder);
  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
  }

  // Convert Web Request to Node.js Stream
  const nodeReq = Readable.fromWeb(req.body);
  nodeReq.headers = {};
  for (const [key, value] of req.headers.entries()) {
    nodeReq.headers[key.toLowerCase()] = value;
  }

  const form = formidable({
    uploadDir: uploadFolder,
    keepExtensions: true,
    filename: (name, ext, part, form) => {
      return `${Date.now()}-${part.originalFilename}`;
    },
  });

  return new Promise((resolve, reject) => {
    form.parse(nodeReq, (err, fields, files) => {
      if (err) {
        return resolve(
          NextResponse.json({ error: err.message }, { status: 500 })
        );
      }

      const file = files.file;
      if (!file || file.length === 0) {
        return resolve(
          NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        );
      }

      const filename = path.basename(file[0].filepath);

      return resolve(
        NextResponse.json({
          message: 'Upload successful',
          imageUrl: `/uploads/${folder}/${filename}`,
        })
      );
    });
  });
}
