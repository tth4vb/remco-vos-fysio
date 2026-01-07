import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { put, list, del } from "@vercel/blob";
import { verifyPassword } from "@/lib/auth";

export const dynamic = "force-dynamic";

const CONTENT_BLOB_NAME = "site-content.json";

export async function POST(request: NextRequest) {
  // Check auth via password in body
  const { password } = await request.json();
  if (!verifyPassword(password)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Read local content.json
    const contentFilePath = path.join(process.cwd(), "data", "content.json");
    const fileContent = fs.readFileSync(contentFilePath, "utf-8");
    const content = JSON.parse(fileContent);

    // Delete existing blob
    const { blobs } = await list({ prefix: CONTENT_BLOB_NAME });
    for (const blob of blobs) {
      if (blob.pathname === CONTENT_BLOB_NAME) {
        await del(blob.url);
      }
    }

    // Upload new content
    const jsonContent = JSON.stringify(content, null, 2);
    const result = await put(CONTENT_BLOB_NAME, jsonContent, {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
    });

    return NextResponse.json({
      success: true,
      message: "Content seeded to blob storage",
      url: result.url,
      navigation: content.siteSettings.navigation
    });
  } catch (error) {
    return NextResponse.json({
      error: String(error)
    }, { status: 500 });
  }
}
