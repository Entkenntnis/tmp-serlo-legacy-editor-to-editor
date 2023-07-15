import { v4 } from "uuid";
import markdownToSlate from "./markdownToSlate";
import { Plugin } from "../splishToEdtr/types";
const createPlugins = ({ normalized, elements }) => {
    const split = normalized
        .split(/(§\d+§)/)
        .map((s) => s.trim())
        .filter((s) => s !== "");
    if (!split.length) {
        return [
            {
                cells: [markdownToSlate("")],
            },
        ];
    }
    return split.map((markdown) => {
        const elementIDMatch = /§(\d+)§/.exec(markdown);
        if (elementIDMatch !== null) {
            // explicitly cast the matched number for typescript
            const i = parseInt(elementIDMatch[1]);
            return {
                cells: [createPluginCell(elements[i])],
            };
        }
        else {
            return {
                cells: [markdownToSlate(markdown)],
            };
        }
    });
};
const createPluginCell = (elem) => {
    switch (elem.name) {
        case "table":
            return {
                content: {
                    plugin: {
                        name: Plugin.Table,
                        version: "0.0.0",
                    },
                    state: {
                        src: elem.src,
                    },
                },
            };
        case "spoiler":
            return {
                content: {
                    plugin: {
                        name: Plugin.Spoiler,
                        version: "0.0.0",
                    },
                    state: {
                        title: elem.title,
                        content: {
                            type: "@splish-me/editor-core/editable",
                            state: {
                                id: v4(),
                                cells: [
                                    {
                                        id: v4(),
                                        rows: createPlugins(elem.content),
                                    },
                                ],
                            },
                        },
                    },
                },
            };
        case "blockquote":
            return {
                content: {
                    plugin: {
                        name: Plugin.Blockquote,
                        version: "0.0.0",
                    },
                    state: {
                        child: {
                            type: "@splish-me/editor-core/editable",
                            state: {
                                id: v4(),
                                cells: [
                                    {
                                        id: v4(),
                                        rows: createPlugins(elem.content),
                                    },
                                ],
                            },
                        },
                    },
                },
            };
        case "injection":
            return {
                content: {
                    plugin: {
                        name: Plugin.Injection,
                        version: "0.0.0",
                    },
                    state: {
                        description: elem.description,
                        src: elem.src,
                    },
                },
            };
        case "geogebra":
            return {
                content: {
                    plugin: {
                        name: Plugin.Geogebra,
                        version: "0.0.0",
                    },
                    state: {
                        description: elem.description,
                        src: elem.src,
                    },
                },
            };
        case "image":
            return {
                content: {
                    plugin: {
                        name: Plugin.Image,
                        version: "0.0.0",
                    },
                    state: {
                        description: elem.description,
                        title: elem.title,
                        src: elem.src,
                        href: elem.href
                            ? elem.href
                            : undefined,
                    },
                },
            };
        case "code":
            return {
                content: {
                    plugin: {
                        name: "code",
                    },
                    state: {
                        language: elem.language,
                        src: elem.src,
                    },
                },
            };
    }
};
export default createPlugins;
//# sourceMappingURL=createPlugin.js.map