import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Scope } from '@/lib/api';

const validScopes: Scope[] = ['all', 'civil', 'criminal', 'civil_procedure', 'criminal_procedure'];

export function useScope() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 초기값을 URL에서 읽기
  const [scope, setScope] = useState<Scope>(() => {
    const scopeParam = searchParams.get('scope');
    return (scopeParam && validScopes.includes(scopeParam as Scope)) ? scopeParam as Scope : 'all';
  });

  // URL이 변경될 때 scope 업데이트
  useEffect(() => {
    const scopeParam = searchParams.get('scope');
    if (scopeParam && validScopes.includes(scopeParam as Scope)) {
      setScope(scopeParam as Scope);
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
