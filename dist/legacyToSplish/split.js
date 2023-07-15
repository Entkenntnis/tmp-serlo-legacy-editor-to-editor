import createPlugins from "./createPlugin";
import normalizeMarkdown from "./normalizeMarkdown";
const splitMarkdown = (markdown) => createPlugins(normalizeMarkdown(markdown));
function isLeaf(cell) {
    const c = cell;
    return typeof c.raw !== "undefined";
}
function splitCell(cell) {
    if (isLeaf(cell)) {
        return {
            size: cell.size,
            rows: splitMarkdown(cell.raw),
        };
    }
    else {
        const { rows = [] } = cell;
        return {
            ...cell,
            rows: rows.map(splitRow),
        };
    }
}
function splitRow(row) {
    return {
        ...row,
        cells: row.cells.map(splitCell),
    };
}
function split(input) {
    return {
        ...input,
        cells: input.cells.map(splitCell),
    };
}
export default split;
//# sourceMappingURL=split.js.map