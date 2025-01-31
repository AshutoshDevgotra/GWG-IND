// types/next.d.ts
import type { ReadonlyURLSearchParams } from 'next/navigation';

declare module 'next' {
  interface PageProps {
    params?: Record<string, string>;
    searchParams?: ReadonlyURLSearchParams | Record<string, string | string[]>;
  }
}