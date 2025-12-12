import { list } from "@vercel/blob";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

// Free tier limits
const FREE_TIER_STORAGE_BYTES = 1 * 1024 * 1024 * 1024; // 1 GB
const WARNING_THRESHOLD = 0.8; // Warn at 80% usage

export async function GET() {
  // Check authentication
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // List all blobs to calculate total size
    let totalSize = 0;
    let cursor: string | undefined;
    let blobCount = 0;

    do {
      const response = await list({ cursor, limit: 1000 });
      for (const blob of response.blobs) {
        totalSize += blob.size;
        blobCount++;
      }
      cursor = response.cursor;
    } while (cursor);

    const usagePercent = (totalSize / FREE_TIER_STORAGE_BYTES) * 100;
    const isNearLimit = usagePercent >= WARNING_THRESHOLD * 100;
    const isAtLimit = usagePercent >= 100;

    return NextResponse.json({
      totalSize,
      totalSizeMB: Math.round((totalSize / (1024 * 1024)) * 100) / 100,
      limitMB: 1024,
      usagePercent: Math.round(usagePercent * 100) / 100,
      blobCount,
      isNearLimit,
      isAtLimit,
      message: isAtLimit
        ? "Opslaglimiet bereikt! Verwijder oude afbeeldingen."
        : isNearLimit
        ? `Let op: ${Math.round(usagePercent)}% van gratis opslag gebruikt.`
        : null,
    });
  } catch (error) {
    console.error("Usage check error:", error);
    // Return empty usage if blob store not configured
    return NextResponse.json({
      totalSize: 0,
      totalSizeMB: 0,
      limitMB: 1024,
      usagePercent: 0,
      blobCount: 0,
      isNearLimit: false,
      isAtLimit: false,
      message: null,
    });
  }
}
