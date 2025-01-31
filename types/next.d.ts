// types/next.d.ts
import type { ReadonlyURLSearchParams } from "next/navigation";

declare module "next" {
  export type PageProps = {
    params?: Record<string, string>;
    searchParams?: ReadonlyURLSearchParams | Record<string, string | string[]>;
  };
}