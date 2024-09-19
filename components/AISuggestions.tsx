"use client"; // not needed if we do not use swr
import useSWR from "swr";

const fetcher = async (term: string) => {
  return fetch("/api/suggestions?term=" + term).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  });
};

function AISuggestions({ term }: { term: string }) {
  const { data, error, isLoading, isValidating } = useSWR(
    term ? `/api/suggestions?term=${term}` : null,  // Key includes `term` to cache different results
    () => fetcher(term),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60 * 60 * 24, // cache for 24 hours
    }
  );

  const generateText = () => {
    if (isLoading || isValidating)
      return (
        <>
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white" />
          <p className="text-sm text-gray-400">AI Assistant is thinking...</p>
        </>
      );

    if (error) return <>Error...</>;

    if (!data || !data.message) return <>No data</>;

    return (
      <>
        <div className="animate-pulse rounded-full bg-gradient-to-t from-white h-10 w-10 border-2 flex-shrink-0 border-white" />

        <div>
          <p className="text-sm text-gray-400">AI Gemini Suggests: </p>
          <p className="italic text-xl">{data.message}</p>
        </div>
      </>
    );
  };

  return (
    <div className="flex space-x-5 items-center px-10">{generateText()}</div>
  );
}

export default AISuggestions;
