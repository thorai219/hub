// Frontend-specific types
// Re-export shared types from @repo/types
export type * from '@repo/types';

// Additional frontend-only types can be added here
export interface PageProps<T = {}> {
  params: T;
  searchParams?: { [key: string]: string | string[] | undefined };
}
