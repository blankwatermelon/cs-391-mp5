"use client";

import { useState } from "react";
import FormInput from "./components/FormInput";

export default function Home() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setLoading(true);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, alias }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      setShortUrl(data.shortUrl);
      setUrl("");
      setAlias("");
    } catch (err) {
      setError("Failed to create short URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-rose-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 border border-rose-300">
        <h1 className="text-3xl font-bold text-center mb-8 text-rose-900">
          URL Shortener
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            id="url"
            label="Original URL"
            value={url}
            onChange={setUrl}
            placeholder="https://example.com"
          />

          <FormInput
            id="alias"
            label="Custom Alias"
            value={alias}
            onChange={setAlias}
            placeholder="my-link"
            helperText="Letters, numbers, and hyphens only"
          />

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {shortUrl && (
            <div className="bg-rose-50 border border-rose-300 rounded-md p-4">
              <p className="text-sm text-rose-900 mb-2">Your shortened URL:</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={shortUrl}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-rose-300 rounded-md text-sm text-rose-800"
                />
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 text-sm font-medium"
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Shorten URL"}
          </button>
        </form>
      </div>
    </main>
  );
}