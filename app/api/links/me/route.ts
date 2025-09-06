import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { links } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

async function getUserFromReq(req: NextRequest) {
  const auth = req.headers.get("authorization")?.split(" ")?.[1];
  if (!auth) return null;

  const { data, error } = await supabaseAdmin.auth.getUser(auth);
  if (error || !data?.user) return null;

  return data.user;
}

export async function GET(req: NextRequest) {
  const user = await getUserFromReq(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const list = await db
    .select()
    .from(links)
    .where(eq(links.owner_id, user.id))
    .orderBy(desc(links.created_at));

  return NextResponse.json(list);
}
