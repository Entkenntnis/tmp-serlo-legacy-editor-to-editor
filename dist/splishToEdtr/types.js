export var Plugin;
(function (Plugin) {
    Plugin["AlphabetSort"] = "@serlo-org/alphabet-sort";
    Plugin["Anchor"] = "@serlo-org/anchor";
    Plugin["Blockquote"] = "@serlo-org/blockquote";
    Plugin["Equations"] = "@serlo-org/equations";
    Plugin["Geogebra"] = "@serlo-org/geogebra";
    Plugin["H5p"] = "@serlo-org/h5p";
    Plugin["Highlight"] = "@serlo-org/highlight";
    Plugin["Hint"] = "@serlo-org/hint";
    Plugin["Image"] = "@splish-me/image";
    Plugin["Injection"] = "@serlo-org/injection";
    Plugin["InputExercise"] = "@serlo-org/input-exercise";
    Plugin["License"] = "@serlo-org/license";
    Plugin["MatchingExercise"] = "@serlo-org/matching-exercise";
    Plugin["ScMcExercise"] = "@serlo-org/sc-mc-exercise";
    Plugin["Solution"] = "@serlo-org/solution";
    Plugin["Spoiler"] = "@serlo-org/spoiler";
    Plugin["StepByStep"] = "@serlo-org/step-by-step";
    Plugin["Table"] = "@serlo-org/table";
    Plugin["Text"] = "@splish-me/slate";
})(Plugin || (Plugin = {}));
export function isContentCell(cell) {
    const c = cell;
    return typeof c.content !== "undefined";
}
export function isSplish(content) {
    return content.cells !== undefined;
}
export function isEdtr(content) {
    return content.plugin !== undefined;
}
//# sourceMappingURL=types.js.map