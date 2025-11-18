import { redirect } from 'next/navigation';
import getCollection, { URLS_COLLECTION } from '../lib/db';

type Props = {
  params: Promise<{ alias: string }>;
};

export default async function AliasRedirect({ params }: Props) {
  const { alias } = await params; 

  let urlData;

  try {
    const collection = await getCollection(URLS_COLLECTION);
    urlData = await collection.findOne({ alias });
  } catch (error) {
    console.error('Error fetching URL:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Error</h1>
          <p className="text-gray-600">An error occurred while processing your request.</p>
          <a 
            href="/" 
            className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  if (urlData && urlData.url) {
    redirect(urlData.url);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-2">Short URL Not Found</p>
        <p className="text-gray-500">This shortened URL does not exist.</p>
        <a 
          href="/" 
          className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create a Short URL
        </a>
      </div>
    </div>
  );
}