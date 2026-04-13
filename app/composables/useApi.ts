const BASE = "http://localhost:8080";

export type AsnData = {
  asn: number;
  name: string;
  short: string;
  country: string;
  website: string;
  tags: string;
  comments: string;
  org: { handle: string; name: string } | null;
  sponsor_org: { handle: string; name: string } | null;
  relationships: {
    upstream_count: number;
    downstream_count: number;
    peer_count: number;
    cone_size: number;
    upstream: number[];
    downstream: number[];
    peers: number[];
    cone: number[];
  } | null;
  prefix_count: number;
  v4_count: number;
  v6_count: number;
  v4_size: number;
  v6_size: number;
};

export type CidrData = {
  asn: number;
  prefixes: { prefix: string; paths: number[][] }[];
};

export type RankEntry = {
  rank: number;
  asn: number;
  name: string;
  short: string;
  prefix_count: number;
  v4_count: number;
  v6_count: number;
  v4_size: number;
  v6_size: number;
};

export type RelRankEntry = {
  rank: number;
  asn: number;
  name: string;
  count: number;
};

export type TagEntry = {
  asn: number;
  name: string;
  short: string;
  org_name: string;
  country: string;
  website: string;
  tags: string;
};

export const useAsn = (asn: Ref<string | number>) =>
  useFetch<AsnData>(() => `${BASE}/api/v1/asn/${asn.value}`, {
    watch: [asn],
    lazy: true,
    server: false,
  });

export const useAsnWhois = (asn: Ref<string | number>) =>
  useFetch<string>(() => `${BASE}/api/v1/whois/${asn.value}`, {
    watch: [asn],
    lazy: true,
    server: false,
    responseType: "text",
  });

export const useAsnCIDR = (asn: Ref<string | number>) =>
  useFetch<CidrData>(() => `${BASE}/api/v1/cidr/${asn.value}`, {
    watch: [asn],
    lazy: true,
    server: false,
  });

export const useTag = (tag: Ref<string>) =>
  useFetch<{ tag: string; asns: TagEntry[] }>(
    () => `${BASE}/api/v1/tag/${tag.value}`,
    {
      watch: [tag],
      lazy: true,
      server: false,
    },
  );

export const useRankPrefix = () =>
  useFetch<{ v4: RankEntry[]; v6: RankEntry[] }>(`${BASE}/api/v1/rank/prefix`, {
    lazy: true,
    server: false,
  });

export const usePrefixCount = () =>
  useFetch<{ prefix_count: number }>(`${BASE}/api/v1/prefixes/count`, {
    lazy: true,
    server: false,
  });

export const useRankDownstream = () =>
  useFetch<RelRankEntry[]>(`${BASE}/api/v1/rank/downstream`, {
    lazy: true,
    server: false,
  });

export const useRankPeer = () =>
  useFetch<RelRankEntry[]>(`${BASE}/api/v1/rank/peer`, {
    lazy: true,
    server: false,
  });

export const useRankASCone = () =>
  useFetch<RelRankEntry[]>(`${BASE}/api/v1/rank/ascone`, {
    lazy: true,
    server: false,
  });
