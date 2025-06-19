import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return new Response(JSON.stringify({ slug: null }), { status: 401 });
  }

  const biodata = await prisma.biodata.findUnique({
    where: { userId },
    select: { slug: true },
  });

  return Response.json({ slug: biodata?.slug || null });
}
