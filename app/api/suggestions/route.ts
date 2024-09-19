import { genearateAI } from "@/lib/getMovies";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");

  const message = await genearateAI(term);

  return Response.json({ message });
}
