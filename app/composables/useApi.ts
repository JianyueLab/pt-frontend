const BASE = "https://pt-api.jianyuelab.net"

export type AsnData = {
  asn: number
  name: string
  short: string
  country: string
  website: string
  tags: string
  comments: string
  org: { handle: string; name: string } | null
  sponsor_org: { handle: string; name: string } | null
  relationships: {
    upstream_count: number
    downstream_count: number
    peer_count: number
    upstream: number[]
    downstream: number[]
    peers: number[]
  } | null
  prefix_count: number
  v4_count: number
  v6_count: number
  v4_size: number
  v6_size: number
  prefixes: { prefix: string; paths: number[][] }[]
}

export type RankEntry = {
  asn: number
  name: string
  short: string
  prefix_count: number
  v4_count: number
  v6_count: number
  v4_size: number
  v6_size: number
}

export const useAsn = (asn: Ref<string | number>) =>
  useFetch<AsnData>(() => `${BASE}/api/v1/asn/${asn.value}`, { watch: [asn], lazy: true, server: false })

export const useRankPrefix = () =>
  useFetch<{ v4: RankEntry[]; v6: RankEntry[] }>(`${BASE}/api/v1/rank/prefix`, { lazy: true, server: false })

export const usePrefixCount = () =>
  useFetch<{ prefix_count: number }>(`${BASE}/api/v1/prefixes/count`, { lazy: true, server: false })
