import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getContent, saveContent, SiteContent } from "@/lib/content";

export async function GET() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const content = await getContent();
    return NextResponse.json(content);
  } catch {
    return NextResponse.json(
      { error: "Failed to load content" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const content: SiteContent = await request.json();
    await saveContent(content);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to save content" },
      { status: 500 }
    );
  }
}
