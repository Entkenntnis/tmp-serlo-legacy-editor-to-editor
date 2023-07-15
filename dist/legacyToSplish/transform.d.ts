import { Legacy } from "../splishToEdtr/types";
declare const transform: (input: Legacy) => {
    cells: {
        rows: {
            cells: {
                size: number;
                raw: string;
            }[];
        }[];
    }[];
};
export default transform;
//# sourceMappingURL=transform.d.ts.map