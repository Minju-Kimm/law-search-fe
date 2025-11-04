import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { LawType } from '@/lib/api';

export function useLawType() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [lawType, setLawType] = useState<LawType>('civil');

  // URL에서 법전 타입 읽기
  useEffect(() => {
    const lawParam = searchParams.get('law');
    if (lawParam === 'criminal' || lawParam === 'civil') {
      setLawType(lawParam);
    }
  }, [searchParams]);

  // 법전 타입 변경 시 URL 업데이트
  const changeLawType = (newLaw: LawType) => {
    setLawType(newLaw);
    const params = new URLSearchParams(searchParams.toString());
    params.set('law', newLaw);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return { lawType, changeLawType };
}
