import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { RawTransaction } from "@/types";

/**
 * Module-level in-process cache.
 * The 9 MB JSON is read from disk exactly once per server lifecycle
 * and held in Node.js module memory — no size restrictions apply.
 * unstable_cache was dropped because it enforces a 2 MB per-item limit.
 */
let cache: RawTransaction[] | null = null;

function loadTransactions(): RawTransaction[] {
  if (!cache) {
    const filePath = path.join(process.cwd(), "transactions.json");
    cache = JSON.parse(fs.readFileSync(filePath, "utf-8")) as RawTransaction[];
  }
  return cache;
}

export async function GET() {
  const data = loadTransactions();
  return NextResponse.json(data, {
    headers: {
      // Browser and CDN can cache the response for 1 h; serve stale for 24 h while revalidating
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
