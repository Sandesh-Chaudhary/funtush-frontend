import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dir = path.join(process.cwd(), 'public', 'assets');

    const entries = await fs.promises.readdir(dir, { withFileTypes: true });

    const files = entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => /\.(jpe?g|png|webp|gif|avif)$/i.test(name));

    const images = files.map((file) => {
      const owner = file.split(/[_-]/)[0] || '';
      return {
        id: file,
        url: `/assets/${file}`,
        title: file,
        owner,
      };
    });

    return NextResponse.json(images);
  } catch (err) {
    console.error('Gallery API error', err);
    return NextResponse.json([]);
  }
}
