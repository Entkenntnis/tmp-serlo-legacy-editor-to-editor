declare const normalizeMarkdown: (markdown: string) => NormalizedObject;
export interface NormalizedObject {
  normalized: string;
  elements: Element[];
}
interface CodeTMP {
  name: "code";
  language: string;
  src: string;
}
interface SpoilerTMP {
  name: "spoiler";
  title: string;
  content: ReturnType<typeof normalizeMarkdown>;
}
interface TableTMP {
  name: "table";
  src: string;
}
interface BlockquoteTMP {
  name: "blockquote";
  content: ReturnType<typeof normalizeMarkdown>;
}
interface InjectionsTMP {
  name: "injection";
  description: string;
  src: string;
}
interface GeogebraTMP {
  name: "geogebra";
  description: string;
  src: string;
}
interface ImagesTMP {
  name: "image";
  description: string;
  src: string;
  title?: string;
}
export interface LinkedImagesTMP extends ImagesTMP {
  href: string;
}
export declare type Element =
  | CodeTMP
  | SpoilerTMP
  | TableTMP
  | BlockquoteTMP
  | InjectionsTMP
  | GeogebraTMP
  | LinkedImagesTMP
  | ImagesTMP;
export default normalizeMarkdown;
//# sourceMappingURL=normalizeMarkdown.d.ts.map
