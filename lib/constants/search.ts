export const SEARCH_CONFIG = {
  debounceDelay: 200,
  defaultLimit: 20,
  previewLength: 200,
  speechRate: 0.94,
} as const;

export const SEARCH_MESSAGES = {
  listening: '🎤 음성을 듣고 있습니다...',
  noResults: '검색 결과가 없습니다',
  tryAgain: '다른 키워드로 검색해보세요',
  error: '검색에 실패했습니다. 잠시 후 다시 시도해주세요.',
  browserNotSupported: '이 브라우저는 음성 인식을 지원하지 않습니다.',
} as const;
