import { SEARCH_CONFIG } from '@/lib/constants/search';
import type { Article } from '@/lib/api';

export function useSpeechSynthesis() {
  const speakArticle = (article: Article) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const text = `${article.heading || ''}. ${article.body || ''}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = SEARCH_CONFIG.speechRate;

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('음성 재생 오류:', error);
    }
  };

  return { speakArticle };
}
