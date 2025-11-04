import { Search, Zap } from 'lucide-react';
import type { SearchResponse } from '@/lib/api';

interface SearchInfoProps {
  searchResult: SearchResponse;
  isListening: boolean;
}

export function SearchInfo({ searchResult, isListening }: SearchInfoProps) {
  const isNumericMode = searchResult?.mode === 'numeric';

  return (
    <>
      {isListening && (
        <p className="mt-3 text-center text-white font-semibold">
          🎤 음성을 듣고 있습니다...
        </p>
      )}

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
          {typeof searchResult.processingTimeMs === 'number' && (
            <span className="text-xs opacity-75">
              {searchResult.processingTimeMs}ms
            </span>
          )}
        </div>
      )}
    </>
  );
}
