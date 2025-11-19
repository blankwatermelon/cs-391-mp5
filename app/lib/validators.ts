// only handles validation

export function validateRequiredFields(
  url: string,
  alias: string
): string | null {
  if (!url || !alias) {
    return "URL and alias are required";
  }
  return null;
}

export function validateUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    if (urlObj.protocol !== "http:" && urlObj.protocol !== "https:") {
      return "Invalid URL. Please enter a valid HTTP or HTTPS URL.";
    }
    return null;
  } catch {
    return "Invalid URL. Please enter a valid HTTP or HTTPS URL.";
  }
}

export function validateAlias(alias: string): string | null {
  const aliasRegex = /^[a-zA-Z0-9-]+$/;
  if (!aliasRegex.test(alias)) {
    return "Alias can only contain letters, numbers, and hyphens";
  }
  return null;
}
