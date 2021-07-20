import * as bsv from 'bsv';
import { Int32Little } from './fields/int32Little';
import { UInt32Little } from './fields/uint32Little';
import { UInt16Little } from './fields/uint16Little';
import { Digest32 } from './fields/digest32';
import { BoostPowJobModel } from './boost-pow-job-model';
import { BoostPowMetadataModel } from './boost-pow-metadata-model';
import { BoostUtils } from './boost-utils';

export class BoostPowStringModel {
    private _blockheader;
    private _metadata;

    constructor(blockheader: bsv.BlockHeader, metadata?: BoostPowMetadataModel) {
        this._blockheader = blockheader;
        if (!this._blockheader.validProofOfWork()) {
            throw new Error('INVALID_POW');
        }

        if (metadata) {
            if (this._blockheader.merkleRoot !== metadata.hash.hex) {
                throw new Error('INVALID_METADATA');
            }
            this._metadata = metadata;
        }
    }

    // Use boosthash(), hash() and id() to all be equal to the string
    // remember, the string itself is the data and proof of work identity.
    get boostHash(): Digest32 {
        return this.hash;
    }

    get hash(): Digest32 {
        return Digest32.fromHex(this._blockheader.hash);
    }

    get id(): Digest32 {
        return this.hash;
    }

    get category(): Int32Little {
      return Int32Little.fromNumber(this._blockheader.version);
    }

    get magicNumber(): UInt16Little {
      return UInt16Little.fromNumber(BoostUtils.magicNumber(this.category.number));
    }

    get content(): Digest32 {
        return new Digest32(new Buffer(this.toObject().content,'hex').reverse());
    }

    get bits(): UInt32Little {
        return UInt32Little.fromNumber(this._blockheader.toObject().bits);
    }

    get metadataHash(): Digest32 {
        return new Digest32(new Buffer(this.toObject().metadataHash, 'hex').reverse());
    }

    get nonce(): UInt32Little {
        return UInt32Little.fromNumber(this._blockheader.nonce);
    }

    get time(): UInt32Little {
        return UInt32Little.fromNumber(this._blockheader.time);
    }
/*
    static nBitsHexToDifficultyNumber(nbits: string): number {
        return BoostUtils.getTargetDifficulty(parseInt(nbits, 16));
    }

    getTargetAsNumberBuffer(): any {
        const i = BoostUtils.difficulty2bits(this.difficulty());
        return Buffer.from(i.toString(16), 'hex').reverse();
    }

    static difficultyNumberToNBitsHex(diff: number): string {
        const bitsInt32 = BoostUtils.difficulty2bits(diff);
        return bitsInt32.toString(16);
    }*/

    static validProofOfWorkFromBuffer(buf): boolean {
        const blockheader = bsv.BlockHeader.fromBuffer(buf);

        if (blockheader.validProofOfWork()) {
            return true;
        }
        return false;
    }

    static validProofOfWorkFromString(str): boolean {
        const blockheader = bsv.BlockHeader.fromString(str);

        if (blockheader.validProofOfWork()) {
            return true;
        }
        return false;
    }

    static validProofOfWorkFromObject(obj): boolean {
        const spoofedObj = {
            prevHash: obj.content,
            bits: obj.bits,
            version: obj.category,
            merkleRoot: obj.metadataHash,
            time: obj.time,
            nonce: obj.nonce,
        }
        const blockheader = bsv.BlockHeader.fromObject(spoofedObj);

        if (blockheader.validProofOfWork()) {
            return true;
        }
        return false;
    }
    /**
     * Check whether each element is a valid BoostPowString (POW!)
     *
     * If even a single entry is not valid, then an exception will be thrown and parsing of everything fails.
     *
     * Initially we can be strict because we should expect careful usage and passing of data.
     *
     * @param arrayOfPotentialBoostPowStrings Array of objects that have toString() defined
     */
    static fromStringArray(arrayOfPotentialBoostPowStrings: any[]): Array<BoostPowStringModel> {
        // How cool is that!?
        const boostPowStrings: BoostPowStringModel[] = [];
        for (const candidate of arrayOfPotentialBoostPowStrings) {
            boostPowStrings.push(BoostPowStringModel.fromString(candidate));
        }
        return boostPowStrings;
    }

    static fromBuffer (buf) {
        return new BoostPowStringModel(bsv.BlockHeader.fromBuffer(buf));
    }

    static fromString(str) {
        var buf = Buffer.from(str, 'hex')
        return new BoostPowStringModel(bsv.BlockHeader.fromBuffer(buf));
    }

    static fromHex(str) {
        var buf = Buffer.from(str, 'hex')
        return new BoostPowStringModel(bsv.BlockHeader.fromBuffer(buf));
    }

    static fromObject(obj) {
        const spoofedObj = {
            prevHash: obj.content,
            bits: obj.bits,
            version: obj.category,
            merkleRoot: obj.metadataHash,
            time: obj.time,
            nonce: obj.nonce,
        }
        return new BoostPowStringModel(bsv.BlockHeader.fromObject(spoofedObj));
    }

    static from(str) {
        var buf = Buffer.from(str, 'hex')
        return new BoostPowStringModel(bsv.BlockHeader.fromBuffer(buf));
    }

    toBuffer () {
        return this._blockheader.toBufferWriter().concat()
    }

    toString () {
        return this._blockheader.toBuffer().toString('hex');
    }

    toHex () {
        return this._blockheader.toBuffer().toString('hex');
    }

    toObject () {
        const blockheaderObj = this._blockheader.toObject();
        const boostheaderObj = {
            hash: blockheaderObj.hash,
            content: blockheaderObj.prevHash,
            bits: blockheaderObj.bits,
            difficulty: this.difficulty,
            category: blockheaderObj.version,
            metadataHash: blockheaderObj.merkleRoot,
            time: blockheaderObj.time,
            nonce: blockheaderObj.nonce,
        };
        return boostheaderObj;
    }

    get difficulty() : number {
        return this._blockheader.getDifficulty();
    }

}
