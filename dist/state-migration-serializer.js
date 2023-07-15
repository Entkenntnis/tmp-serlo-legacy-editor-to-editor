/** @public */
export const serializer = {
    deserialize(serialized) {
        return {
            object: "value",
            document: {
                object: "document",
                nodes: (serialized || []).map(deserializeNode),
            },
        };
        function deserializeNode(node) {
            if (isNewElement(node)) {
                return deserializeElement(node);
            }
            return deserializeText(node);
            function deserializeElement(element) {
                switch (element.type) {
                    case "p": {
                        const oldElement = {
                            object: "block",
                            type: "paragraph",
                            nodes: element.children.map(deserializeNode),
                        };
                        return oldElement;
                    }
                    case "h": {
                        const oldElement = {
                            object: "block",
                            // The type assertion is necessary for api-extractor
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                            type: `@splish-me/h${element.level}`,
                            nodes: element.children.map(deserializeNode),
                        };
                        return oldElement;
                    }
                    case "a": {
                        const oldElement = {
                            object: "inline",
                            type: "@splish-me/a",
                            data: {
                                href: element.href,
                            },
                            nodes: element.children.map(deserializeNode),
                        };
                        return oldElement;
                    }
                    case "math": {
                        if (element.inline) {
                            const oldElement = {
                                object: "inline",
                                type: "@splish-me/katex-inline",
                                data: {
                                    formula: element.src,
                                    inline: true,
                                },
                                isVoid: true,
                                nodes: element.children.map(deserializeNode),
                            };
                            return oldElement;
                        }
                        const oldElement = {
                            object: "block",
                            type: "@splish-me/katex-block",
                            data: {
                                formula: element.src,
                                inline: false,
                            },
                            isVoid: true,
                            nodes: element.children.map(deserializeNode),
                        };
                        return oldElement;
                    }
                    case "ordered-list": {
                        const oldElement = {
                            object: "block",
                            type: "ordered-list",
                            nodes: element.children.map(deserializeNode),
                        };
                        return oldElement;
                    }
                    case "unordered-list": {
                        const oldElement = {
                            object: "block",
                            type: "unordered-list",
                            nodes: element.children.map(deserializeNode),
                        };
                        return oldElement;
                    }
                    case "list-item": {
                        const oldElement = {
                            object: "block",
                            type: "list-item",
                            nodes: element.children.map(deserializeNode),
                        };
                        return oldElement;
                    }
                    case "list-item-child": {
                        const oldElement = {
                            object: "block",
                            type: "list-item-child",
                            nodes: element.children.map(deserializeNode),
                        };
                        return oldElement;
                    }
                }
            }
            function deserializeText(text) {
                const marks = [];
                if (text.em) {
                    marks.push({ object: "mark", type: "@splish-me/em" });
                }
                if (text.strong) {
                    marks.push({ object: "mark", type: "@splish-me/strong" });
                }
                if (text.code) {
                    marks.push({ object: "mark", type: "code" });
                }
                if (text.color !== undefined) {
                    marks.push({
                        object: "mark",
                        type: "@splish-me/color",
                        data: { colorIndex: text.color },
                    });
                }
                return {
                    object: "text",
                    text: text.text,
                    marks: marks,
                };
            }
        }
    },
    serialize(deserialized) {
        const nodes = removeLeaves(deserialized && deserialized.document
            ? deserialized.document.nodes
            : []);
        if (!nodes)
            return [];
        return nodes.map(serializeNode);
        function serializeNode(node) {
            if (node.object === "text") {
                return serializeText(node);
            }
            return serializeElement(node);
            function serializeElement(element) {
                switch (element.type) {
                    case "paragraph": {
                        const newElement = {
                            type: "p",
                            children: element.nodes.map(serializeNode),
                        };
                        return newElement;
                    }
                    case "@splish-me/h1": {
                        const newElement = {
                            type: "h",
                            level: 1,
                            children: element.nodes.map(serializeNode),
                        };
                        return newElement;
                    }
                    case "@splish-me/h2": {
                        const newElement = {
                            type: "h",
                            level: 2,
                            children: element.nodes.map(serializeNode),
                        };
                        return newElement;
                    }
                    case "@splish-me/h3": {
                        const newElement = {
                            type: "h",
                            level: 3,
                            children: element.nodes.map(serializeNode),
                        };
                        return newElement;
                    }
                    case "@splish-me/h4": {
                        const newElement = {
                            type: "h",
                            level: 4,
                            children: element.nodes.map(serializeNode),
                        };
                        return newElement;
                    }
                    case "@splish-me/h5": {
                        const newElement = {
                            type: "h",
                            level: 5,
                            children: element.nodes.map(serializeNode),
                        };
                        return newElement;
                    }
                    case "@splish-me/h6": {
                        const newElement = {
                            type: "h",
                            level: 6,
                            children: element.nodes.map(serializeNode),
                        };
                        return newElement;
                    }
                    case "@splish-me/a": {
                        const newElement = {
                            type: "a",
                            href: element.data.href,
                            children: element.nodes.map(serializeNode),
                        };
                        return newElement;
                    }
                    case "@splish-me/katex-block": {
                        const newElement = {
                            type: "math",
                            src: element.data.formula,
                            inline: false,
                            children: element.nodes.map(serializeNode),
                        };
                        return newElement;
                    }
                    case "@splish-me/katex-inline": {
                        const newElement = {
                            type: "math",
                            src: element.data.formula,
                            inline: true,
                            children: element.nodes.map(serializeNode),
                        };
                        return newElement;
                    }
                    case "ordered-list": {
                        const newElement = {
                            type: "ordered-list",
                            children: element.nodes.map(serializeNode),
                        };
                        return newElement;
                    }
                    case "unordered-list": {
                        const newElement = {
                            type: "unordered-list",
                            children: element.nodes.map(serializeNode),
                        };
                        return newElement;
                    }
                    case "list-item": {
                        const newElement = {
                            type: "list-item",
                            children: element.nodes.map(serializeNode),
                        };
                        return newElement;
                    }
                    case "list-item-child": {
                        const newElement = {
                            type: "list-item-child",
                            children: element.nodes.map(serializeNode),
                        };
                        return newElement;
                    }
                }
            }
            function serializeText(text) {
                const newText = {
                    text: text.text,
                };
                const marks = text.marks || [];
                marks.forEach((mark) => {
                    switch (mark.type) {
                        case "@splish-me/strong":
                            newText.strong = true;
                            return;
                        case "@splish-me/em":
                            newText.em = true;
                            return;
                        case "@splish-me/color":
                            newText.color = mark.data.colorIndex;
                            return;
                        case "code":
                            newText.code = true;
                            return;
                    }
                });
                return newText;
            }
        }
    },
};
function isNewElement(node) {
    return node.children !== undefined;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function removeLeaves(nodes) {
    if (!nodes) {
        return [];
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    const cleanedNodes = nodes.reduce((acc, node) => {
        /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
        if (node.leaves) {
            // we don't need the node itself, as we expect it to be a text node
            return [
                ...acc,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call
                ...node.leaves.map((leave) => ({
                    ...leave,
                    object: "text",
                })),
            ];
        }
        else {
            const cleanedNode = node.nodes
                ? {
                    ...node,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    nodes: removeLeaves(node.nodes),
                }
                : node;
            return [...acc, cleanedNode];
        }
        /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
    }, []);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return cleanedNodes;
}
//# sourceMappingURL=state-migration-serializer.js.map