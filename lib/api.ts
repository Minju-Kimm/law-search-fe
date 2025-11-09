// lib/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE ?? '';

export type Scope = 'all' | 'civil' | 'criminal' | 'civil_procedure' | 'criminal_procedure';
export type LawType = 'civil' | 'criminal' | 'civil_procedure' | 'criminal_procedure';

export interface Article {
  id: string;               // 백엔드에 없으면 joCode로 대체
  lawCode: 'CIVIL_CODE' | 'CRIMINAL_CODE' | 'CIVIL_PROCEDURE_CODE' | 'CRIMINAL_PROCEDURE_CODE';
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
  count?: number;              // 1순위: 백엔드 count 필드
  total?: number;              // 2순위: 백엔드 total 필드
  estimatedTotalHits?: number; // 3순위: 백엔드 estimatedTotalHits 필드
  hits: Article[];
}

export interface HealthResponse {
  ok: boolean;
  db: boolean;
  search: boolean;
  version: string;
}

// Bookmark & Auth types
export interface User {
  id: string;
  email: string;
  name: string;
  provider: 'google' | 'naver';
  avatar?: string;
}

export interface MeResponse {
  user: User;
}

export interface Bookmark {
  id: string;
  userId: string;
  articleId: string;
  joCode: string;
  lawType: LawType;
  heading: string;
  note?: string;
  createdAt: string;
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
    lawCode: (a.lawCode ?? a.law_code ?? 'CIVIL_CODE') as 'CIVIL_CODE' | 'CRIMINAL_CODE' | 'CIVIL_PROCEDURE_CODE' | 'CRIMINAL_PROCEDURE_CODE',
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
    count: typeof json.count === 'number' ? json.count : undefined,
    total: typeof json.total === 'number' ? json.total : undefined,
    estimatedTotalHits: typeof json.estimatedTotalHits === 'number' ? json.estimatedTotalHits : undefined,
    hits: hitsRaw.map(normalizeArticle),
  };
}

// API 클라이언트 (credentials: 'include' 기본값)
async function apiFetch(url: string, options?: RequestInit): Promise<Response> {
  const response = await fetch(url, {
    credentials: 'include',
    ...options,
  });

  return response;
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

// Health check
export async function checkHealth(): Promise<HealthResponse> {
  const r = await apiFetch(`${BASE_URL}/health`, { cache: 'no-store' });
  return ok<HealthResponse>(r);
}

// Law search
export async function search(
  q: string,
  scope: Scope = 'all',
  limit = 20,
  offset = 0
): Promise<SearchResponse> {
  const url = `${BASE_URL}/search?scope=${scope}&q=${encodeURIComponent(q)}&limit=${limit}&offset=${offset}`;
  const r = await apiFetch(url, { cache: 'no-store' });
  const raw = await ok<any>(r);
  return normalizeSearch(raw);
}

export async function getArticleByJoCode(joCode: string, law: LawType = 'civil'): Promise<Article> {
  const r = await apiFetch(`${BASE_URL}/articles/by-jo/${joCode}?law=${law}`, { cache: 'no-store' });
  const raw = await ok<any>(r);
  return normalizeArticle(raw);
}

export async function getArticleByNumber(articleNo: number, law: LawType = 'civil', subNo = 0): Promise<Article> {
  const qs = subNo > 0 ? `?law=${law}&sub_no=${subNo}` : `?law=${law}`;
  const r = await apiFetch(`${BASE_URL}/articles/${articleNo}${qs}`, { cache: 'no-store' });
  const raw = await ok<any>(r);
  return normalizeArticle(raw);
}

// Auth APIs
export async function getMe(): Promise<User> {
  const r = await apiFetch(`${BASE_URL}/api/users/me`, { cache: 'no-store' });
  return ok<User>(r);
}

export function getLoginUrl(provider: 'google' | 'naver'): string {
  return `${BASE_URL}/api/auth/login/${provider}`;
}

export async function logout(): Promise<void> {
  const r = await apiFetch(`${BASE_URL}/api/auth/logout`, {
    method: 'POST',
    cache: 'no-store',
  });
  if (!r.ok) {
    throw new Error(`Logout failed: ${r.status} ${r.statusText}`);
  }
}

// Bookmark APIs
export async function getBookmarks(): Promise<Bookmark[]> {
  const r = await apiFetch(`${BASE_URL}/api/bookmarks`, { cache: 'no-store' });
  return ok<Bookmark[]>(r);
}

export async function createBookmark(data: {
  articleNo: number;
  articleSubNo: number;
  lawCode: 'CIVIL_CODE' | 'CRIMINAL_CODE' | 'CIVIL_PROCEDURE_CODE' | 'CRIMINAL_PROCEDURE_CODE';
}): Promise<Bookmark> {
  const r = await apiFetch(`${BASE_URL}/api/bookmarks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    cache: 'no-store',
  });
  return ok<Bookmark>(r);
}

export async function deleteBookmark(id: string): Promise<void> {
  const r = await apiFetch(`${BASE_URL}/api/bookmarks/${id}`, {
    method: 'DELETE',
    cache: 'no-store',
  });
  if (!r.ok) {
    throw new Error(`Delete failed: ${r.status} ${r.statusText}`);
  }
}
