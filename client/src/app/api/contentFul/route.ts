import { NextResponse } from "next/server";
import client from "../../../lib/contentFul";

export async function GET() {
  try {
    const entries = await client.getEntries({
      content_type: process.env.CONTENTFUL_CONTENTTYPE_ID_HEROBANNER!,
    });

    return NextResponse.json(entries?.items);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
