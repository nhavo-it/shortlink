import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { links } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> } // 👈 sửa ở đây
) {
  const { slug } = await context.params; // 👈 await vì giờ nó là Promise

  const rows = await db.select().from(links).where(eq(links.slug, slug));

  if (!rows || rows.length === 0) {
    return new NextResponse("Not found", { status: 404 });
  }

  const row = rows[0];

  // increment clicks (fire-and-forget)
  db.update(links)
    .set({ clicks: Number(row.clicks) + 1 })
    .where(eq(links.id, row.id))
    .catch((e) => console.error("increment click failed", e));

  return NextResponse.redirect(row.url);
}
