'use client';

import { useEffect, useRef, useState } from 'react';
import { Search, Mic, Volume2, BookOpen, Sparkles, X, Zap } from 'lucide-react';
import { search as apiSearch, type Article, type SearchResponse } from '@/lib/api';

export default function Home() {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const q = query.trim();
    if (!q) {
      setSearchResult(null);
      setError(null);
      setLoading(false);
      return;
    }

    timerRef.current = setTimeout(() => {
      performSearch(q);
    }, 200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query]);

  const performSearch = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await apiSearch(q, 20);
      setSearchResult(result);
    } catch (err: any) {
      console.error('검색 오류:', err);
      setError(typeof err?.message === 'string' ? `검색 실패: ${err.message}` : '검색에 실패했습니다. 잠시 후 다시 시도해주세요.');
      setSearchResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (timerRef.current) clearTimeout(timerRef.current);
    performSearch(query);
  };

  const startVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('이 브라우저는 음성 인식을 지원하지 않습니다.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const said = event?.results?.[0]?.[0]?.transcript;
      if (said) setQuery(String(said));
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const speakArticle = (article: Article) => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const text = `${article.heading || ''}. ${article.body || ''}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ko-KR';
        utterance.rate = 0.94;
        window.speechSynthesis.speak(utterance);
      }
    } catch {}
  };

  const results: Article[] = searchResult?.hits ?? [];
  const isNumericMode = searchResult?.mode === 'numeric';

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* 헤더 */}
      <header className="sticky top-0 z-50 backdrop-blur-lg border-b" style={{ background: 'rgba(255,255,255,0.10)', borderColor: 'rgba(255,255,255,0.20)' }}>
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl shadow-lg" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">민법 조문 검색</h1>
                <p className="text-sm text-white/80">빠르고 정확한 법률 검색</p>
              </div>
            </div>
            <Sparkles className="w-6 h-6 text-yellow-300" style={{ animation: 'float 3s ease-in-out infinite' }} />
          </div>
        </div>
      </header>

      {/* 메인 */}
      <main className="max-w-6xl mx-auto px-6 py-10 relative z-10">
        {/* 검색 영역 */}
        <div className="mb-10">
          <form onSubmit={handleSearch}>
            <div className="relative flex items-center">
              <div className="absolute left-5 pointer-events-none">
                <Search className="w-6 h-6 text-gray-500" />
              </div>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="조문 번호나 키워드를 입력하세요... (예: 2, 신의성실, 계약)"
                className="w-full pl-14 pr-36 py-5 text-lg rounded-full border-2 focus:outline-none transition-all shadow-2xl"
                style={{ background: 'rgba(255,255,255,0.96)', borderColor: 'rgba(255,255,255,0.30)' }}
                aria-label="민법 조문 검색 입력"
                autoComplete="off"
                spellCheck={false}
              />

              <div className="absolute right-2 flex gap-2">
                <button
                  type="button"
                  onClick={startVoiceSearch}
                  className="p-3 rounded-full transition-all shadow-lg hover:scale-105"
                  style={{ background: isListening ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : 'white' }}
                  aria-label="음성으로 검색"
                >
                  <Mic className={`w-5 h-5 ${isListening ? 'text-white' : 'text-gray-700'}`} />
                </button>

                <button type="submit" className="px-7 py-3 rounded-full text-white font-semibold transition-all shadow-lg hover:scale-105" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  검색
                </button>
              </div>
            </div>
          </form>

          {isListening && <p className="mt-3 text-center text-white font-semibold">🎤 음성을 듣고 있습니다...</p>}

          {searchResult && (
            <div className="mt-4 flex items-center justify-between text-white/90 text-sm">
              <div className="flex items-center gap-2">
                {isNumericMode ? (
                  <>
                    <Zap className="w-4 h-4 text-yellow-300" />
                    <span>숫자 검색 모드</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>키워드 검색 모드</span>
                  </>
                )}
              </div>
              {typeof searchResult.processingTimeMs === 'number' && <span className="text-xs opacity-75">{searchResult.processingTimeMs}ms</span>}
            </div>
          )}
        </div>

        {/* 에러 */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl border text-center" style={{ background: 'rgba(239,68,68,0.12)', borderColor: 'rgba(239,68,68,0.35)', color: 'white' }}>
            {error}
          </div>
        )}

        {/* 로딩 */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-flex gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}

        {/* 결과 */}
        {!loading && results.length > 0 && (
          <div className="space-y-4">
            <p className="text-white font-semibold text-lg mb-5">
              총 <span className="text-2xl text-yellow-300">{searchResult?.estimatedTotalHits ?? results.length}</span>개의 조문
              {isNumericMode && <span className="ml-3 text-sm opacity-90">(정확한 조문 최상단 표시)</span>}
            </p>

            {results.map((article, index) => (
              <div
                key={`${article.id}-${index}`}
                className="backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-[1.02] border"
                style={{
                  background: index === 0 && isNumericMode ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.96)',
                  borderColor: index === 0 && isNumericMode ? 'rgba(251, 191, 36, 0.6)' : 'rgba(255, 255, 255, 0.3)',
                  borderWidth: index === 0 && isNumericMode ? '3px' : '1px',
                }}
                onClick={() => setSelectedArticle(article)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {index === 0 && isNumericMode && (
                        <span className="px-2 py-1 rounded-lg text-xs font-bold bg-yellow-400 text-gray-900">정확 일치</span>
                      )}
                      <span className="px-4 py-1.5 rounded-full text-white font-bold shadow-lg" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        제{article.articleNo}조{article.articleSubNo > 0 ? `의${article.articleSubNo}` : ''}
                      </span>
                      <h3 className="font-bold text-lg text-gray-800">
                        {article.heading || (article.joCode ? `(${article.joCode})` : '')}
                      </h3>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      {article.body ? (article.body.length > 200 ? `${article.body.slice(0, 200)}...` : article.body) : ''}
                    </p>

                    {Array.isArray(article.clauses) && article.clauses.length > 0 && (
                      <div className="mt-3 text-sm text-gray-600">
                        <span className="font-semibold">항/호: {article.clauses.length}개</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakArticle(article);
                    }}
                    className="p-3 rounded-xl transition-all hover:scale-110 shadow-md"
                    style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' }}
                    aria-label="조문 읽어주기"
                  >
                    <Volume2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 없음 */}
        {!loading && query.trim() && results.length === 0 && !error && (
          <div className="text-center py-20">
            <div className="inline-block p-6 rounded-full mb-4" style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
              <Search className="w-16 h-16 text-white" />
            </div>
            <p className="text-white text-xl font-semibold">검색 결과가 없습니다</p>
            <p className="text-white/70 mt-2">다른 키워드로 검색해보세요</p>
          </div>
        )}
      </main>

      {/* 모달 */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(10px)' }} onClick={() => setSelectedArticle(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="inline-block px-5 py-2 rounded-full text-white font-bold shadow-lg mb-3" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  제{selectedArticle.articleNo}조{selectedArticle.articleSubNo > 0 ? `의${selectedArticle.articleSubNo}` : ''}
                </span>
                <h2 className="text-2xl font-bold text-gray-900">{selectedArticle.heading}</h2>
              </div>
              <button onClick={() => setSelectedArticle(null)} className="p-2 hover:bg-gray-100 rounded-full transition-all" aria-label="닫기">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">본문</h3>
              <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">{selectedArticle.body || ''}</p>
            </div>

            {Array.isArray(selectedArticle.clauses) && selectedArticle.clauses.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">항/호</h3>
                <div className="space-y-2">
                  {selectedArticle.clauses.map((c, idx) => (
                    <div key={`clause-${idx}`} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                      <span className="font-bold text-gray-600">{c.no}</span>
                      <span className="text-gray-800">{c.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => speakArticle(selectedArticle)} className="flex-1 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:scale-105 shadow-lg" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                🔊 읽어주기
              </button>
              <button onClick={() => setSelectedArticle(null)} className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 font-semibold transition-all">
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
