import split from "./legacyToSplish/split";
import transform from "./legacyToSplish/transform";
import { isSplish, convertRow, } from "./splishToEdtr";
export function convert(content) {
    if (!content)
        return { plugin: "rows", state: [] };
    const splish = isSplish(content)
        ? content
        : convertLegacyToSplish(content, "");
    return convertSplishToEdtrIO(splish);
}
export function convertLegacyToSplish(content, id) {
    const cells = split(transform(content));
    return {
        ...cells,
        id,
    };
}
export function convertSplishToEdtrIO(content) {
    return {
        plugin: "rows",
        state: convertRow(content),
    };
}
export { isSplish, isEdtr, } from "./splishToEdtr";
//# sourceMappingURL=index.js.map