import { convertOldSlate, htmlToSlate } from "./convertSlate";
import { Plugin } from "./types";
import { convertSplishToEdtrIO } from "..";
import { serializer } from "../state-migration-serializer";
export function convertPlugin(cell) {
    const { plugin, state } = cell.content;
    switch (plugin.name) {
        case Plugin.Blockquote:
            const blockquoteState = state;
            return {
                plugin: "important",
                state: convertSplishToEdtrIO(blockquoteState.child.state),
            };
        case Plugin.Image:
            const imageState = state;
            return {
                plugin: "image",
                state: {
                    alt: imageState.description,
                    link: imageState.href
                        ? {
                            href: imageState.href,
                            openInNewTab: false,
                        }
                        : undefined,
                    src: imageState.src,
                    maxWidth: undefined,
                },
            };
        case Plugin.Injection:
            const injectionState = state;
            return {
                plugin: "injection",
                state: injectionState.src,
            };
        case Plugin.Spoiler:
            const spoilerState = state;
            return {
                plugin: "spoiler",
                state: {
                    title: spoilerState.title,
                    content: convertSplishToEdtrIO(spoilerState.content.state),
                },
            };
        case Plugin.Text:
            const textState = state;
            if (textState.editorState) {
                return {
                    plugin: "text",
                    state: serializer.serialize(convertOldSlate(textState.editorState)),
                };
            }
            else {
                return {
                    plugin: "text",
                    state: serializer.serialize(htmlToSlate(textState.importFromHtml || "")),
                };
            }
        case Plugin.Table:
            const tableState = state;
            return {
                plugin: "table",
                state: tableState.src,
            };
        case Plugin.Geogebra:
            const geogebraState = state;
            return {
                plugin: "geogebra",
                state: geogebraState.src,
            };
        case "code":
            const code = state;
            return {
                plugin: "highlight",
                state: {
                    language: code.language,
                    code: code.src,
                    showLineNumbers: false,
                },
            };
        default:
            return {
                plugin: "error",
                state: {
                    plugin: plugin.name,
                    state: state,
                },
            };
    }
}
//# sourceMappingURL=convertPlugins.js.map