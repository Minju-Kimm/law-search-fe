import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Scope } from '@/lib/api';

export function useScope() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [scope, setScope] = useState<Scope>('all');

  // URL에서 scope 읽기
  useEffect(() => {
    const scopeParam = searchParams.get('scope');
    if (scopeParam === 'all' || scopeParam === 'civil' || scopeParam === 'criminal') {
      setScope(scopeParam);
    }
  }, [searchParams]);

  // scope 변경 시 URL 업데이트
  const changeScope = (newScope: Scope) => {
    setScope(newScope);
    const params = new URLSearchParams(searchParams.toString());
    params.set('scope', newScope);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return { scope, changeScope };
}
