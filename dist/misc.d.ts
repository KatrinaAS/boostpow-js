/// <reference types="node" />
interface Content {
    hex(): string;
    string(trimLeadingNulls: boolean): string;
    buffer(): Buffer;
}
