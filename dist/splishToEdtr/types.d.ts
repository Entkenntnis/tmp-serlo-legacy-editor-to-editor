export declare enum Plugin {
  AlphabetSort = "@serlo-org/alphabet-sort",
  Anchor = "@serlo-org/anchor",
  Blockquote = "@serlo-org/blockquote",
  Equations = "@serlo-org/equations",
  Geogebra = "@serlo-org/geogebra",
  H5p = "@serlo-org/h5p",
  Highlight = "@serlo-org/highlight",
  Hint = "@serlo-org/hint",
  Image = "@splish-me/image",
  Injection = "@serlo-org/injection",
  InputExercise = "@serlo-org/input-exercise",
  License = "@serlo-org/license",
  MatchingExercise = "@serlo-org/matching-exercise",
  ScMcExercise = "@serlo-org/sc-mc-exercise",
  Solution = "@serlo-org/solution",
  Spoiler = "@serlo-org/spoiler",
  StepByStep = "@serlo-org/step-by-step",
  Table = "@serlo-org/table",
  Text = "@splish-me/slate",
}
export declare type Legacy = LegacyRow[] | string;
export declare type LegacyRow = {
  col: number;
  content: string;
}[];
export declare type Splish = {
  id?: string;
  cells: Cell[];
};
export declare type Row = Splish;
export declare type Cell = RowCell | ContentCell;
declare type RowCell = {
  id?: string;
  size?: number;
  rows: Row[];
};
export declare type ContentCell<S = unknown> = {
  id?: string;
  size?: number;
  inline?: null;
  content: {
    plugin: SplishPlugin;
    state: S;
  };
};
export declare function isContentCell(cell: Cell): cell is ContentCell;
declare type SplishPlugin = {
  name: Plugin | "code";
  version?: string;
};
export declare type Edtr = RowsPlugin | LayoutPlugin | OtherPlugin;
export declare type RowsPlugin = {
  plugin: "rows";
  state: Edtr[];
};
export declare type LayoutPlugin = {
  plugin: "layout";
  state: {
    child: Edtr;
    width: number;
  }[];
};
export declare type OtherPlugin = {
  plugin:
    | "anchor"
    | "article"
    | "blockquote"
    | "error"
    | "exercise"
    | "geogebra"
    | "highlight"
    | "image"
    | "important"
    | "injection"
    | "inputExercise"
    | "spoiler"
    | "scMcExercise"
    | "solution"
    | "table"
    | "text"
    | "video";
  state: unknown;
};
export declare function isSplish(content: Legacy | Splish): content is Splish;
export declare function isEdtr(
  content: Legacy | Splish | Edtr
): content is Edtr;
export {};
//# sourceMappingURL=types.d.ts.map
