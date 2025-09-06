import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { links } from "@/lib/schema";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type CreateBody = { url: string; title?: string };

async function getUserFromReq(req: Request) {
  const auth = req.headers.get("authorization")?.split(" ")?.[1];
  if (!auth) return null;
  const { data, error } = await supabaseAdmin.auth.getUser(auth);
  if (error) return null;
  return data.user;
}

export async function GET() {
  // Optionally, admin-only listing; For now return 400 - ask user to pass ?owner=uid or call /api/links/me
  return NextResponse.json({ error: "Use /api/links/me for user links" }, { status: 400 });
}

// Create new short link (must pass Bearer <access_token>)
export async function POST(req: Request) {
  const user = await getUserFromReq(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body: CreateBody = await req.json();
  if (!body?.url) return NextResponse.json({ error: "url required" }, { status: 400 });

  // generate slug
  const slug = nanoid(8);

  const [created] = await db
    .insert(links)
    .values({
      slug,
      url: body.url,
      title: body.title ?? null,
      owner_id: user.id,
    })
    .returning();

  return NextResponse.json(created, { status: 201 });
}

// Delete link (owner only) - use query ?id=123
export async function DELETE(req: Request) {
  const user = await getUserFromReq(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  // ensure owner
  const target = await db.select().from(links).where(eq(links.id, Number(id)));
  if (target.length === 0) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (target[0].owner_id !== user.id) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const deleted = await db.delete(links).where(eq(links.id, Number(id))).returning();
  return NextResponse.json(deleted);
}
