import * as R from "ramda";
import { isContentCell } from "./types";
import { convertPlugin } from "./convertPlugins";
export { Plugin, isSplish, isEdtr, } from "./types";
export function convertRow(row) {
    // no cells, then end the recursion
    if (!row.cells.length)
        return [];
    // if more than one cell, than convert to special plugin 'layout'
    if (row.cells.length > 1) {
        return [
            {
                plugin: "layout",
                state: row.cells.map((cell) => {
                    return {
                        width: cell.size || 12,
                        child: {
                            plugin: "rows",
                            state: convertCell(cell),
                        },
                    };
                }),
            },
        ];
    }
    // otherwise continue with converting the only cell
    return convertCell(row.cells[0]);
}
function convertCell(cell) {
    if (isContentCell(cell)) {
        return [convertPlugin(cell)];
    }
    else {
        return R.reduce((plugins, row) => R.concat(plugins, convertRow(row)), [], cell.rows);
    }
}
//# sourceMappingURL=index.js.map