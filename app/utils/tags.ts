export const TAGS: Record<number, string> = {
  1: "Player T1",
  2: "Player T2",
  3: "End User",
  4: "No downstream",
  5: "IPv6 Only",
  6: "Anycast",
  7: "IX_RS",
  8: "Hosting",
  9: "Direct Feed",
}

export function parseTags(raw: string) {
  if (!raw) return []
  return raw.split(",").map(Number).filter(n => TAGS[n])
}
