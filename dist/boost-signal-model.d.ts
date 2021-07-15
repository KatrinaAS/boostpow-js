import { Int32Little } from './fields/int32Little';
import { UInt32Little } from './fields/uint32Little';
import { BoostPowStringModel } from './boost-pow-string-model';
import { BoostPowMetadataModel } from './boost-pow-metadata-model';
export declare class BoostSignalModel {
    private boostPowString;
    private boostPowMetadata;
    private boostJobId?;
    private boostJobProofId?;
    private constructor();
    getBoostJobId(): string | undefined;
    getBoostJobProofId(): string | undefined;
    getBoostPowString(): BoostPowStringModel;
    getBoostMetadata(): BoostPowMetadataModel;
    hash(): string;
    difficulty(): number;
    energy(): number;
    content(hex?: boolean): string;
    category(hex?: boolean): Int32Little;
    metadataHash(): string;
    time(): UInt32Little;
    nonce(): UInt32Little;
    tag(hex?: boolean): string | null;
    userNonce(hex?: boolean): string | null;
    additionalData(hex?: boolean): string | null;
    minerPubKeyHash(): string | null;
    toString(): string;
    toObject(): any;
}
