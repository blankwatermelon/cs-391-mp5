import { NextRequest } from "next/server";
import {
  validateRequiredFields,
  validateUrl,
  validateAlias,
} from "../../lib/validators";
import { checkAliasExists, createShortUrl } from "../../lib/url-service";
import { errorResponse, successResponse } from "../../lib/api-response";

export async function POST(request: NextRequest) {
  try {
    // Parse request
    const { url, alias } = await request.json();

    // Validate inputs
    const requiredError = validateRequiredFields(url, alias);
    if (requiredError) return errorResponse(requiredError, 400);

    const urlError = validateUrl(url);
    if (urlError) return errorResponse(urlError, 400);

    const aliasError = validateAlias(alias);
    if (aliasError) return errorResponse(aliasError, 400);

    // Check if alias exists
    if (await checkAliasExists(alias)) {
      return errorResponse(
        "This alias is already taken. Please choose another.",
        409
      );
    }

    // Create short URL
    await createShortUrl(url, alias);

    // Return success
    const base = "https://cs-391-mp5-nine.vercel.app";
    return successResponse(
      {
        success: true,
        alias,
        shortUrl: `${base}/${alias}`,
      },
      201
    );
  } catch (error) {
    console.error("Error creating short URL:", error);
    return errorResponse("Internal server error", 500);
  }
}
