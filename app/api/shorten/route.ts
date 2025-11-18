import { NextRequest, NextResponse } from "next/server";
import getCollection, { URLS_COLLECTION } from "../../lib/db";


// URL validation function
function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
}

// POST: Create a new shortened URL
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { url, alias } = body;

    // Validate that both fields are provided
    if (!url || !alias) {
      return NextResponse.json(
        { error: "URL and alias are required" },
        { status: 400 }
      );
    }

    // Validate URL format
    if (!isValidUrl(url)) {
      return NextResponse.json(
        { error: "Invalid URL. Please enter a valid HTTP or HTTPS URL." },
        { status: 400 }
      );
    }

    // Validate alias format
    const aliasRegex = /^[a-zA-Z0-9-]+$/;
    if (!aliasRegex.test(alias)) {
      return NextResponse.json(
        { error: "Alias can only contain letters, numbers, and hyphens" },
        { status: 400 }
      );
    }

    // Get the collection
    const collection = await getCollection(URLS_COLLECTION);

    // Check if alias already exists
    const existingAlias = await collection.findOne({ alias });
    if (existingAlias) {
      return NextResponse.json(
        { error: "This alias is already taken. Please choose another." },
        { status: 409 } // 409 Conflict
      );
    }

    // Insert the new URL mapping into database
    await collection.insertOne({
      url,
      alias,
      createdAt: new Date(),
    });

    // Build with base URL
    const base = "https://cs-391-mp5-eight.vercel.app/";

    // Return success response with shortened URL
    return NextResponse.json(
      {
        success: true,
        alias,
        shortUrl: `${base}/${alias}`,
      },
      { status: 201 } // 201 Created
    );
  } catch (error) {
    console.error("Error creating short URL:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
