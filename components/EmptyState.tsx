import { Search } from 'lucide-react';
import { SEARCH_MESSAGES } from '@/lib/constants/search';

export function EmptyState() {
  return (
    <div className="text-center py-20">
      <div
        className="inline-block p-6 rounded-full mb-4"
        style={{ background: 'rgba(255, 255, 255, 0.2)' }}
      >
        <Search className="w-16 h-16 text-white" />
      </div>
      <p className="text-white text-xl font-semibold">
        {SEARCH_MESSAGES.noResults}
      </p>
      <p className="text-white/70 mt-2">{SEARCH_MESSAGES.tryAgain}</p>
    </div>
  );
}
