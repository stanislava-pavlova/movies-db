import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    genre: string;
  };
};

function GenrePage({ params: { id }, searchParams: { genre } }: Props) {
  if (!id) notFound();

  // const idToUse = decodeURI(id);

  // API call to get the Searched Movies
  // API call to get the Popular Movies

  return <div>Welcome to Genre</div>;
}

export default GenrePage;
