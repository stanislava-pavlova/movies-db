import { genearateAI } from "@/src/lib/getMovies";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");

  const message = await genearateAI(term, locale);

  return Response.json({ message });
}
