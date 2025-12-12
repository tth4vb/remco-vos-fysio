import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET() {
  try {
    const hasToken = !!process.env.BLOB_READ_WRITE_TOKEN;
    const { blobs } = await list();

    return NextResponse.json({
      hasToken,
      tokenPrefix: process.env.BLOB_READ_WRITE_TOKEN?.substring(0, 10) + "...",
      blobCount: blobs.length,
      blobs: blobs.map(b => ({
        pathname: b.pathname,
        url: b.url,
        size: b.size
      }))
    });
  } catch (error) {
    return NextResponse.json({
      error: String(error),
      hasToken: !!process.env.BLOB_READ_WRITE_TOKEN
    }, { status: 500 });
  }
}
