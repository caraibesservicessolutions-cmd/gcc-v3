declare namespace React {
  type ReactNode = unknown;
}

declare namespace JSX {
  interface IntrinsicAttributes {
    key?: any;
  }
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module "react/jsx-runtime" {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare module "next" {
  export type Metadata = any;
  export type Viewport = any;
  export namespace MetadataRoute {
    type Manifest = any;
    type Robots = any;
    type Sitemap = any;
  }
}

declare module "next/link" {
  const Link: any;
  export default Link;
}

declare module "next/navigation" {
  export function notFound(): never;
  export function redirect(path: string): never;
}

declare module "@supabase/supabase-js" {
  export function createClient(url: string, key: string, options?: any): any;
}

declare module "tailwindcss" {
  export type Config = any;
}

declare const process: {
  env: Record<string, string | undefined>;
};
