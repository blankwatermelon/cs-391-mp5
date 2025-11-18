import getCollection, { URLS_COLLECTION } from "./db";

// only handles URL database operations 
export async function checkAliasExists(alias: string): Promise<boolean> {
  const collection = await getCollection(URLS_COLLECTION);
  const existing = await collection.findOne({ alias });
  return !!existing;
}

export async function createShortUrl(url: string, alias: string) {
  const collection = await getCollection(URLS_COLLECTION);
  await collection.insertOne({
    url,
    alias,
    createdAt: new Date(),
  });
}