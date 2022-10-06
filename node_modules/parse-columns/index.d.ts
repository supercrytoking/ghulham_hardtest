export type TrnasformerFunction = (element: string, header: string, columnIndex: number, rowIndex: number) => any;

export interface Options {
    separator?: string;
    headers?: string[];
    transform?: TrnasformerFunction;
}

export type Result = {
    [key: string]: any;
}[];

/**
 * Parse text columns, like the output of unix commands
 *
 * @param input Text columns to parse
 * @param options
 */
export default function(input: string, options: Options): Result;
