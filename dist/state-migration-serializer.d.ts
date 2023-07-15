import { ValueJSON } from "slate";
export interface Serializer<S, T> {
    deserialize(serialized: S): T;
    serialize(deserialized: T): S;
}
/** @public */
export declare const serializer: Serializer<NewNode[], ValueJSON>;
/** @public */
export interface NewText {
    text: string;
    code?: boolean;
    color?: number;
    em?: boolean;
    strong?: boolean;
}
/** @public */
export interface NewParagraphElement {
    type: "p";
    children: NewNode[];
}
/** @public */
export interface NewHeadingElement {
    type: "h";
    level: 1 | 2 | 3 | 4 | 5 | 6;
    children: NewNode[];
}
/** @public */
export interface NewLinkElement {
    type: "a";
    href: string;
    children: NewNode[];
}
/** @public */
export interface NewMathElement {
    type: "math";
    src: string;
    inline: boolean;
    children: NewNode[];
}
/** @public */
export interface NewOrderedListElement {
    type: "ordered-list";
    children: NewNode[];
}
/** @public */
export interface NewUnorderedListElement {
    type: "unordered-list";
    children: NewNode[];
}
/** @public */
export interface NewListItemElement {
    type: "list-item";
    children: NewNode[];
}
/** @public */
export interface NewListItemChildElement {
    type: "list-item-child";
    children: NewNode[];
}
/** @public */
export type NewElement = NewParagraphElement | NewHeadingElement | NewLinkElement | NewMathElement | NewOrderedListElement | NewUnorderedListElement | NewListItemElement | NewListItemChildElement;
/** @public */
export type NewNode = NewText | NewElement;
/** @public */
export interface OldStrongMark {
    object: "mark";
    type: "@splish-me/strong";
}
/** @public */
export interface OldEmphasizeMark {
    object: "mark";
    type: "@splish-me/em";
}
/** @public */
export interface OldColorMark {
    object: "mark";
    type: "@splish-me/color";
    data: {
        colorIndex: number;
    };
}
/** @public */
export interface OldCodeMark {
    object: "mark";
    type: "code";
}
/** @public */
export type OldMark = OldStrongMark | OldEmphasizeMark | OldColorMark | OldCodeMark;
/** @public */
export interface OldText {
    object: "text";
    text: string;
    marks?: OldMark[];
}
/** @public */
export interface OldParagraphElement {
    object: "block";
    type: "paragraph";
    nodes: OldNode[];
}
/** @public */
export interface OldHeadingElement {
    object: "block";
    type: "@splish-me/h1" | "@splish-me/h2" | "@splish-me/h3" | "@splish-me/h4" | "@splish-me/h5" | "@splish-me/h6";
    nodes: OldNode[];
}
/** @public */
export interface OldLinkElement {
    object: "inline";
    type: "@splish-me/a";
    data: {
        href: string;
    };
    nodes: OldNode[];
}
/** @public */
export interface OldKatexInlineElement {
    object: "inline";
    type: "@splish-me/katex-inline";
    data: {
        formula: string;
        inline: true;
    };
    isVoid: true;
    nodes: OldNode[];
}
/** @public */
export interface OldKatexBlockElement {
    object: "block";
    type: "@splish-me/katex-block";
    data: {
        formula: string;
        inline: false;
    };
    isVoid: true;
    nodes: OldNode[];
}
/** @public */
export interface OldOrderedListElement {
    object: "block";
    type: "ordered-list";
    nodes: OldNode[];
}
/** @public */
export interface OldUnorderedListElement {
    object: "block";
    type: "unordered-list";
    nodes: OldNode[];
}
/** @public */
export interface OldListItemElement {
    object: "block";
    type: "list-item";
    nodes: OldNode[];
}
/** @public */
export interface OldListItemChildElement {
    object: "block";
    type: "list-item-child";
    nodes: OldNode[];
}
/** @public */
export type OldElement = OldParagraphElement | OldHeadingElement | OldLinkElement | OldKatexInlineElement | OldKatexBlockElement | OldOrderedListElement | OldUnorderedListElement | OldListItemElement | OldListItemChildElement;
/** @public */
export type OldNode = OldText | OldElement;
//# sourceMappingURL=state-migration-serializer.d.ts.map