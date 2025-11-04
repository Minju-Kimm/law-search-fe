import { BookOpen, Sparkles } from 'lucide-react';
import { GRADIENTS, COLORS } from '@/lib/constants/theme';

export function SearchHeader() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-lg border-b"
      style={{
        background: COLORS.glass,
        borderColor: COLORS.border,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-xl shadow-lg"
              style={{ background: GRADIENTS.primary }}
            >
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">민법 조문 검색</h1>
              <p className="text-sm text-white/80">빠르고 정확한 법률 검색</p>
            </div>
          </div>
          <Sparkles className="w-6 h-6 text-yellow-300 animate-float" />
        </div>
      </div>
    </header>
  );
}
