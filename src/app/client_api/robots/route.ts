import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";

// Base URL for the site
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sibkomplekt.ru";

// Default robots.txt content
const getDefaultRobotsContent = (): string => {
  return `User-agent: *
Allow: /

# Disallow admin pages and all their subpages
Disallow: /admin/
Disallow: /dashboard/
Disallow: /login
Disallow: /auth/
Disallow: /client_api/

# Disallow API routes
Disallow: /api/

# Allow sitemap
Allow: /sitemap.xml

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml`;
};

export async function GET() {
  try {
    const publicDir = join(process.cwd(), "public");
    const robotsPath = join(publicDir, "robots.txt");

    let content: string;

    if (existsSync(robotsPath)) {
      content = readFileSync(robotsPath, "utf8");
    } else {
      content = getDefaultRobotsContent();
      // Create the file if it doesn't exist
      writeFileSync(robotsPath, content, "utf8");
    }

    return NextResponse.json({
      success: true,
      content,
    });
  } catch (error) {
    console.error("Error reading robots.txt:", error);
    return NextResponse.json(
      { success: false, message: "Failed to read robots.txt" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { success: false, message: "Content is required" },
        { status: 400 }
      );
    }

    // Save robots.txt to public directory
    const publicDir = join(process.cwd(), "public");
    const robotsPath = join(publicDir, "robots.txt");

    writeFileSync(robotsPath, content, "utf8");

    return NextResponse.json({
      success: true,
      message: "Robots.txt updated successfully",
    });
  } catch (error) {
    console.error("Error updating robots.txt:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update robots.txt" },
      { status: 500 }
    );
  }
}
