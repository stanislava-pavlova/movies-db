import { genearateAI } from "@/src/lib/getMovies";

export async function GET(
  request: Request,
  { params }: { params: { locale: string } }
) {
  const { locale } = params;
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");

  const message = await genearateAI(term, locale);

  return Response.json({ message });
}
