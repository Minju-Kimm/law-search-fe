import { X } from 'lucide-react';
import type { Article, LawType } from '@/lib/api';
import { getTheme, COLORS } from '@/lib/constants/theme';

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
  onSpeak: (article: Article) => void;
}

export function ArticleModal({ article, onClose, onSpeak }: ArticleModalProps) {
  const lawType: LawType = article.lawCode === 'CRIMINAL_CODE' ? 'criminal' : 'civil';
  const theme = getTheme(lawType);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{
        background: COLORS.overlayDark,
        backdropFilter: 'blur(10px)',
      }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <span
              className="inline-block px-5 py-2 rounded-full text-white font-bold shadow-lg mb-3"
              style={{ background: theme.gradient }}
            >
              제{article.articleNo}조
              {article.articleSubNo > 0 ? `의${article.articleSubNo}` : ''}
            </span>
            <h2 className="text-2xl font-bold text-gray-900">
              {article.heading}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-all active:scale-95"
            aria-label="닫기"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">본문</h3>
          <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">
            {article.body || ''}
          </p>
        </div>

        {Array.isArray(article.clauses) && article.clauses.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">항/호</h3>
            <div className="space-y-2">
              {article.clauses.map((clause, idx) => (
                <div
                  key={`clause-${idx}`}
                  className="flex gap-3 p-3 rounded-xl"
                  style={{ backgroundColor: theme.lightBg }}
                >
                  <span className="font-bold" style={{ color: theme.textColor }}>{clause.no}</span>
                  <span className="text-gray-800">{clause.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => onSpeak(article)}
            className="flex-1 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg"
            style={{ background: theme.gradient }}
          >
            🔊 읽어주기
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-xl text-gray-700 font-semibold transition-all"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
