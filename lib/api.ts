// lib/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:8080';

export interface Article {
  id: string;               // 백엔드에 없으면 joCode로 대체
  lawCode: 'CIVIL_CODE';
  articleNo: number;        // article_no
  articleSubNo: number;     // article_sub_no
  joCode: string;           // jo_code
  heading: string;          // heading (이미 "제108조(...)" 형태)
  body: string;             // backend의 snippet을 body로 사용
  clauses: Array<{ no: string; text: string }>;
}

export interface SearchResponse {
  query: string;
  mode: 'numeric' | 'keyword';
  processingTimeMs?: number;
  limit: number;
  offset: number;
  estimatedTotalHits?: number; // backend total 매핑
  hits: Article[];
}

export interface HealthResponse {
  ok: boolean;
  db: boolean;
  search: boolean;
  version: string;
}

// ---- helpers ----
function toStr(v: any, def = ''): string {
  return typeof v === 'string' ? v : v == null ? def : String(v);
}
function toNum(v: any, def = 0): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : def;
}

function normalizeArticle(a: any): Article {
  return {
    id: toStr(a.id ?? a._id ?? a.jo_code ?? a.article_no),
    lawCode: 'CIVIL_CODE',
    articleNo: toNum(a.articleNo ?? a.article_no),
    articleSubNo: toNum(a.articleSubNo ?? a.article_sub_no),
    joCode: toStr(a.joCode ?? a.jo_code),
    heading: toStr(a.heading),
    body: toStr(a.body ?? a.snippet ?? a.content), // ★ snippet을 body로 사용
    clauses: Array.isArray(a.clauses)
      ? a.clauses.map((c: any) => ({
          no: toStr(c.no ?? c.clause_no ?? c.number),
          text: toStr(c.text ?? c.content ?? c.body),
        }))
      : [],
  };
}

function normalizeSearch(json: any): SearchResponse {
  const hitsRaw = Array.isArray(json.hits) ? json.hits : [];
  return {
    query: toStr(json.query),
    mode: (json.mode === 'numeric' ? 'numeric' : 'keyword') as 'numeric' | 'keyword',
    processingTimeMs:
      typeof json.processingTimeMs === 'number'
        ? json.processingTimeMs
        : undefined,
    limit: toNum(json.limit ?? 20),
    offset: toNum(json.offset ?? 0),
    estimatedTotalHits: toNum(json.estimatedTotalHits ?? json.total, undefined as any),
    hits: hitsRaw.map(normalizeArticle),
  };
}

async function ok<T>(r: Response): Promise<T> {
  if (!r.ok) {
    let m = `${r.status} ${r.statusText}`;
    try {
      const t = await r.text();
      if (t) m += ` - ${t}`;
    } catch {}
    throw new Error(m);
  }
  return (await r.json()) as T;
}

// ---- APIs ----
export async function checkHealth(): Promise<HealthResponse> {
  const r = await fetch(`${BASE_URL}/health`, { cache: 'no-store' });
  return ok<HealthResponse>(r);
}

export async function search(q: string, limit = 20): Promise<SearchResponse> {
  const url = `${BASE_URL}/search?q=${encodeURIComponent(q)}&limit=${limit}`;
  const r = await fetch(url, { cache: 'no-store' });
  const raw = await ok<any>(r);
  return normalizeSearch(raw);
}

export async function getArticleByJoCode(joCode: string): Promise<Article> {
  const r = await fetch(`${BASE_URL}/articles/by-jo/${joCode}`, { cache: 'no-store' });
  const raw = await ok<any>(r);
  return normalizeArticle(raw);
}

export async function getArticleByNumber(articleNo: number, subNo = 0): Promise<Article> {
  const qs = subNo > 0 ? `?sub_no=${subNo}` : '';
  const r = await fetch(`${BASE_URL}/articles/${articleNo}${qs}`, { cache: 'no-store' });
  const raw = await ok<any>(r);
  return normalizeArticle(raw);
}
