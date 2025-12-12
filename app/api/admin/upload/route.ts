import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export async function POST(request: Request) {
  // Check authentication
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const oldUrl = formData.get("oldUrl") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Use JPEG, PNG, WebP, or GIF." },
        { status: 400 }
      );
    }

    // Validate file size (max 4MB)
    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 4MB." },
        { status: 400 }
      );
    }

    // Delete old blob if it exists and is a blob URL
    if (oldUrl && oldUrl.includes("blob.vercel-storage.com")) {
      try {
        await del(oldUrl);
      } catch (e) {
        // Ignore errors when deleting old blob
        console.log("Could not delete old blob:", e);
      }
    }

    // Upload new file
    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
