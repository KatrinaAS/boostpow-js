/// <reference types="node" />
import { UInt32Little } from './fields/uint32Little';
import { UInt32Big } from './fields/uint32Big';
import { UInt64Big } from './fields/uint64Big';
export declare class BoostPowMetadataModel {
    private tag;
    private minerPubKeyHash;
    private ExtraNonce1;
    private ExtraNonce2;
    private UserNonce;
    private additionalData;
    private constructor();
    static fromObject(params: {
        tag: string;
        minerPubKeyHash: string;
        extraNonce1: string;
        extraNonce2: string;
        userNonce: string;
        additionalData: string;
    }): BoostPowMetadataModel;
    static fromBuffer(params: {
        tag: Buffer;
        minerPubKeyHash: Buffer;
        extraNonce1: Buffer;
        extraNonce2: Buffer;
        userNonce: Buffer;
        additionalData: Buffer;
    }): BoostPowMetadataModel;
    getTag(): Buffer;
    getTagUtf8(): string;
    getTagString(): string;
    getMinerPubKeyHash(): Buffer;
    getMinerPubKeyHashUtf8(): string;
    userNonce(): UInt32Little;
    extraNonce1(): UInt32Big;
    extraNonce2(): UInt64Big;
    getAdditionalData(): Buffer;
    getAdditionalDataUtf8(): string;
    getAdditionalDataString(): string;
    toString(): string;
    getCoinbaseString(): string;
    hash(): any;
    hashAsBuffer(): any;
    toObject(): {
        tag: string;
        minerPubKeyHash: string;
        extraNonce1: string;
        extraNonce2: string;
        userNonce: string;
        additionalData: string;
    };
    toBuffer(): Buffer;
    toHex(): string;
}
