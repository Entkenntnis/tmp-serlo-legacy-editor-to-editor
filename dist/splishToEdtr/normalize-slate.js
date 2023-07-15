import * as R from "ramda";
export function normalize(value) {
    return {
        ...value,
        document: value.document ? normalizeNode(value.document)[0] : undefined,
    };
}
function normalizeNode(node) {
    if (isBlock(node)) {
        if (node?.nodes?.some(isInline) && node?.nodes?.some(isBlock)) {
            // @ts-ignore
            return R.chain(normalizeNode, unwrapChildBlocks(node));
        }
        else {
            return [{ ...node, nodes: R.chain(normalizeNode, node.nodes ?? []) }];
        }
    }
    else if (isDocument(node)) {
        return [{ ...node, nodes: R.chain(normalizeNode, node.nodes ?? []) }];
    }
    else {
        return [node];
    }
}
export function unwrapChildBlocks(node) {
    if (node.nodes === undefined)
        return [node];
    const result = [];
    let nodesToInspect = node.nodes;
    while (nodesToInspect.length > 0) {
        const [inlineNodes, tailNodes] = R.splitWhen(isBlock, nodesToInspect);
        if (inlineNodes.length > 0)
            result.push({ ...node, nodes: inlineNodes });
        if (tailNodes.length > 0)
            result.push(tailNodes[0]);
        nodesToInspect = tailNodes.slice(1);
    }
    return result;
}
function isBlock(node) {
    return node?.object === "block";
}
function isDocument(node) {
    return node?.object === "document";
}
function isInline(node) {
    return node?.object === "inline" || node?.object === "text";
}
//# sourceMappingURL=normalize-slate.js.map