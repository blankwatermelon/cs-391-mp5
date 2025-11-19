import { redirect } from "next/navigation";
import getCollection, { URLS_COLLECTION } from "../lib/db";
import ErrorPage from "../components/ErrorPage";

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
    console.error("Error fetching URL:", error);
    return (
      <ErrorPage
        title="Error"
        message="An error occurred while processing your request."
      />
    );
  }

  if (urlData?.url) {
    redirect(urlData.url);
  }

  return (
    <ErrorPage
      title="404"
      message="This shortened URL does not exist."
      buttonText="Create a Short URL"
    />
  );
}
