import { Plugin } from "../splishToEdtr/types";
import renderMarkdown from "./markdownToHtml";
const markdownToSlate = (markdown) => ({
    content: {
        plugin: { name: Plugin.Text, version: "0.0.0" },
        state: {
            importFromHtml: renderMarkdown(markdown),
        },
    },
});
export default markdownToSlate;
//# sourceMappingURL=markdownToSlate.js.map