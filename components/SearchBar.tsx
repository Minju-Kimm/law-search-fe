import { Search, Mic } from 'lucide-react';
import { GRADIENTS, COLORS } from '@/lib/constants/theme';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isListening: boolean;
  onVoiceSearch: () => void;
}

export function SearchBar({
  query,
  onQueryChange,
  onSubmit,
  isListening,
  onVoiceSearch,
}: SearchBarProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="relative flex items-center">
        <div className="absolute left-5 pointer-events-none">
          <Search className="w-6 h-6 text-gray-500" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="조문 번호나 키워드를 입력하세요... (예: 2, 신의성실, 계약)"
          className="w-full pl-14 pr-36 py-5 text-lg rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-2xl"
          style={{
            background: COLORS.overlay,
            borderColor: COLORS.border,
          }}
          aria-label="민법 조문 검색 입력"
          autoComplete="off"
          spellCheck={false}
        />

        <div className="absolute right-2 flex gap-2">
          <button
            type="button"
            onClick={onVoiceSearch}
            className="p-3 rounded-full transition-all shadow-lg hover:scale-105 active:scale-95"
            style={{
              background: isListening ? GRADIENTS.danger : 'white',
            }}
            aria-label="음성으로 검색"
          >
            <Mic
              className={`w-5 h-5 ${isListening ? 'text-white' : 'text-gray-700'}`}
            />
          </button>

          <button
            type="submit"
            className="px-7 py-3 rounded-full text-white font-semibold transition-all shadow-lg hover:scale-105 active:scale-95"
            style={{ background: GRADIENTS.primary }}
          >
            검색
          </button>
        </div>
      </div>
    </form>
  );
}
