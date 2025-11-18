// Database document structure
export interface UrlDocument {
  _id?: string;  
  url: string;
  alias: string;
  createdAt: Date;
}

// API request body
export interface ShortenUrlRequest {
  url: string;
  alias: string;
}

// API success response
export interface ShortenUrlResponse {
  success: true;
  alias: string;
  shortUrl: string;
}

// API error response
export interface ErrorResponse {
  error: string;
}