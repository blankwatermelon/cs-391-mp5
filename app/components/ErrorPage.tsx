export default function ErrorPage({
  title,
  message,
  buttonText = "Go Home",
}: {
  title: string;
  message: string;
  buttonText?: string;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">{title}</h1>
        <p className="text-xl text-gray-600 mb-2">{message}</p>
        <a
          href="/"
          className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
}
