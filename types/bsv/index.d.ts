// Type definitions for bsv 2.0
// Project: https://github.com/moneybutton/bsv
// Definitions by: Katrina Knight <https://github.com/me>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'bsv' {
    import * as Buffer from "buffer";

    class Ach {
        static encrypt(messageBuf: Buffer, cipherKeyBuf: Buffer, ivBuf: Buffer): Buffer;
        static asyncEncrypt(messageBuf: Buffer, cipherKeyBuf: Buffer, ivBuf: Buffer): Promise<Buffer>;
        static decrypt(encBuf: Buffer, cipherKeyBuf: Buffer): Buffer;
        static asyncDecrypt(encBuf: Buffer, cipherKeyBuf: Buffer): Promise<Buffer>;
    }

    class Address extends Struct {
        constructor(versionByteNum?: number,hashBuf?: Buffer,constants?:{pubKeyHash:number,payToScriptHash: number});
        fromBuffer(buf: Buffer): Address;
        fromPubKeyHashBuf(buf: Buffer): Address;
        static fromPubKeyHashBuf(buf:Buffer): Address;
        fromPubKey(pubKey: PubKey):Address;
        static fromPubKey(pubKey: PubKey): Address;
        asyncFromPubKey(pubKey: PubKey): Promise<Address>;
        static asyncFromPubKey(pubKey: PubKey): Promise<Address>;
        fromPrivKey(privKey: PrivKey): Address;
        static fromPrivKey(privKey: PrivKey): Address;
        asyncFromPrivKey(privKey: PrivKey): Promise<Address>;
        static asyncFromPrivKey(privKey: PrivKey): Promise<Address>;
        fromRandom(): Address;
        static fromRandom(): Address;
        asyncFromRandom(): Promise<Address>;
        static asyncFromRandom(): Promise<Address>;
        fromString(str: string): Address;
        static fromString(str: string): Address;
        asyncFromString(str: string): Promise<Address>;
        static asyncFromString(str: string): Promise<Address>;
        static isValid(addrstr: string): boolean;
        isValid(): boolean;
        toTxOutScript(): Script;
        fromTxInScript(script: Script): Address;
        fromTxOutScript(script: Script): Address;
        toBuffer(): Buffer;
        toJSON(): {hashBuf?: string, versionbyteNum?: number};
        fromJSON(json: {hashBuf?: string, versionbyteNum?: number}): Address;
        toString(): string;
        asyncToString(): Promise<string>;
        validate(): Address;


    }
    namespace Address {
        export class Mainnet extends Address {
            constructor(versionByteNum?: number,hashBuf?: Buffer);
        }
        export class Testnet extends Address {
            constructor(versionByteNum?: number,hashBuf?: Buffer);
        }
    }

    class Aes {
        static encrypt(messageBuf: Buffer, keyBuf: Buffer): Buffer;
        static decrypt(encBuf: Buffer, keyBuf: Buffer): Buffer;
        static buf2Words(buf: Buffer) : [number];
        static words2Buf(words: [number]): Buffer;
    }

    class Aescbc {
        static encrypt(messageBuf: Buffer, cipherKeyBuf: Buffer, ivBuf: Buffer, concatIvBuf?: Buffer): Buffer;
        static decrypt(encBuf: Buffer, keyBuf: Buffer,ivBuf?: Buffer): Buffer;
    }

    class Base58Check extends Struct {
        constructor(buf?: Buffer);
        fromHex(hex: string): Base58Check;
        toHex(): string;
        static decode(s: string): Buffer;
        static encode(buf: Buffer): string;
        fromBuffer(buf: Buffer): Base58Check;
        fromString(str: String): Base58Check;
        toBuffer(): Buffer;
        toString(): string;
    }

    class Base58 extends Struct {
        constructor(buf?: Buffer);
        fromHex(hex: string): Base58;
        toHex(): string;
        static encode(buf: Buffer): string;
        static decode(str: String): Buffer;
        fromBuffer(buf: Buffer): Base58;
        fromString(str: String): Base58;
        toBuffer(): Buffer;
        toString(): String;
    }

    class Bip32 extends Struct {
        constructor(versionBytesNum?:number,depth?:number,parentFingerPrint?: Buffer, childIndex?: number, chainCode?: Buffer, privKey?: PrivKey, pubKey?: PubKey, constants?: {pubKey: number, privKey: number},PrivKeyClass?: typeof PrivKey);
        fromRandom(): Bip32;
        static fromRandom(): Bip32;
        fromString(str: string): Bip32;
        asyncFromString(str: string): Promise<Bip32>;
        fromSeed(bytes: Buffer): Bip32;
        static fromSeed(bytes: Buffer): Bip32;
        asyncFromSeed(bytes: Buffer): Promise<Bip32>;
        static asyncFromSeed(bytes: Buffer): Promise<Bip32>;
        fromBuffer(buf: Buffer): Bip32;
        fromFastBuffer(buf: Buffer): Bip32;
        derive(path: string): Bip32;
        asyncDerive(path: string): Promise<Bip32>;
        deriveChild(i: number): Bip32;
        toPublic(): Bip32;
        toBuffer(): Buffer;
        toFastBuffer(): Buffer;
        toString(): string;
        asyncToString(): Promise<string>;
        toJSON(): string;
        fromJSON(json: string): Bip32;
        isPrivate(): boolean;
    }

    namespace Bip32 {
        export class Mainnet extends Bip32 {
            constructor(versionBytesNum:number,depth:number,parentFingerPrint: Buffer, childIndex: number, chainCode: Buffer, privKey: PrivKey, pubKey: PubKey);
            constructor();
        }
        export class Testnet extends Bip32 {
            constructor(versionBytesNum:number,depth:number,parentFingerPrint: Buffer, childIndex: number, chainCode: Buffer, privKey: PrivKey, pubKey: PubKey);
            constructor();
        }
    }

    class Bip39 extends Struct {
        constructor(mnemonic: string, seed: Buffer, wordlist: [string]);
        constructor();
        toBw(bw: Bw) : Bw;
        fromBr(br: Br) : Bip39;
        fromRandom(bits?: number): Bip39;
        static fromRandom(bits?: number): Bip39;
        asyncFromRandom(bits?: number): Promise<Bip39>;
        static asyncFromRandom(bits?: number): Promise<Bip39>;
        fromEntropy(buf: Buffer): Bip39;
        static fromEntropy(buf: Buffer): Bip39;
        asyncFromEntropy(buf: Buffer): Promise<Bip39>;
        static asyncFromEntropy(buf: Buffer): Promise<Bip39>;
        fromString(mnemonic: string): Bip39;
        toString(): string;
        toSeed(passphrase?: string): Buffer;
        asyncToSeed(passphrase?: string): Promise<Buffer>;
        entropy2Mnemonic(buf: Buffer): string;
        check(): boolean;
        mnemonic2Seed(passphrase?: string): Buffer;
        isValid(passphrase?: string): boolean;
        static isValid(mnemonic:string, passphrase?:string): boolean;
    }

    class Bn extends Struct {
        constructor(n: Bn| string|number, base?:number, endian?:string);
        constructor();
        fromHex(hex:string,opts?:{endian:string}): Bn;
        toHex(opts?:{endian:string}): string;
        toJSON(): string;
        fromJSON(str: string): Bn;
        fromNumber(n: number): Bn;
        toNumber(): number;
        fromString(str: string, base: string): Bn;
        fromBuffer(buf: Buffer, opts?:{endian: string}): Bn;
        static fromBuffer(buf: Buffer, opts?:{endian: string}): Bn;
        toBuffer(opts: {size:number,endian:string}): Buffer;
        toString(base?: number, padding?: number): string;
        toFastBuffer(opts: {size:number,endian:string}): Buffer;
        static toFastBuffer(opts: {size:number,endian:string}): Buffer;
        fromFastBuffer(buf: Buffer, opts?:{endian: string}): Bn;
        static fromFastBuffer(buf: Buffer, opts?:{endian: string}): Bn;
        fromSm(buf: Buffer, opts: {endian: string}): Bn;
        toSm(opts: {endian: string}): Buffer;
        fromBits(bits:number, opts:{strict: boolean}): Bn;
        toBits(): number;
        fromScriptNumBuffer(buf: Buffer, fRequireMinimal?: boolean, nMaxNumSize?: number|undefined): Bn;
        toScriptNumBuffer(buf:Buffer): Buffer;
        neg(): Bn;
        add(bn: Bn|string|number): Bn;
        sub(bn: Bn|string|number): Bn;
        mul(bn: Bn|string|number): Bn;
        mod(bn: Bn|string|number): Bn;
        umod(bn: Bn): Bn;
        invm(bn: Bn|string|number): Bn;
        div(bn: Bn|string|number): Bn;
        ushln(bn: Bn): Bn;
        ushrn(bn: Bn): Bn;
        cmp(bn: Bn|string|number): number;
        eq(bn: Bn|string|number): boolean;
        neq(bn: Bn|string|number): boolean;
        gt(bn: Bn|string|number): boolean;
        geq(bn: Bn|string|number): boolean;
        lt(bn: Bn|string|number): boolean;
        leq(bn: Bn|string|number): boolean;

    }

    class Br extends Struct {
        constructor(buf: Buffer);
    }
    class Bw extends Struct {

    }

    class Ecdsa extends Struct {

    }

    class Hash {
        static sha256(buf: Buffer): Buffer;
    }
    class HashCache extends Struct {

    }
    class KeyPair extends Struct {

    }

    class OpCode extends Struct {
        constructor(num: number);
        fromNumber(num: number): OpCode;
        static fromNumber(num: number): OpCode;
        toNumber(): number;
        fromString(str: String): OpCode;
        static fromString(str: String): OpCode;
        toString(): string;

    }
    class PrivKey {

    }

    class PubKey {

    }

    class Script {
        chunks: [{buf: Buffer, len: number, opCodeNum: number}];
        constructor(chunks: [{buf: Buffer, len: number, opCodeNum: number}]);
        constructor();
        fromJSON(json: string): Script;
        toJSON(): string;
        fromBuffer(buf: Buffer): Script;
        toBuffer(): Buffer;
        fromString(str: String): Script;
        toString(): string;
        fromBitcoindString(str: String): Script;
        static fromBitcoindString(str: String): Script;
        toBitcoindString(): string;
        fromAsmString(str: string) : Script;
        static fromAsmString(str: string) : Script;
        toAsmString(): string;
        _chunkToString(chunk: {buf: Buffer, len: number, opCodeNum: number}, type?: unknown): string;
        fromOpReturnData(dataBuf: Buffer): Script;
        static fromOpReturnData(dataBuf: Buffer): Script;
        fromSafeData(dataBuf: Buffer): Script;
        static fromSafeData(dataBuf: Buffer): Script;
        fromSafeDataArray(dataBufs: [Buffer]): Script;
        static fromSafeDataArray(dataBufs: [Buffer]): Script;
        getData(): Buffer;
        fromPubKeyHash(hashBuf: Buffer): Script;
        static fromPubKeyHash(hashBuf: Buffer): Script;
        static sortPubKeys(pubKeys: [PubKey]): number;
        fromPubKeys(m: number, pubKeys: [PubKey], sort?: boolean): Script;
        static fromPubKeys(m: number, pubKeys: [PubKey], sort?: boolean): Script;
        removeCodeseperators(): Script;
        isPushOnly(): boolean;
        isNonSpendable(): boolean;
        isOpReturn(): boolean;
        isSafeDataOut(): boolean;
        isPubKeyHashOut(): boolean;
        isPubKeyHashIn(): boolean;
        isScriptHashOut(): boolean;
        isScriptHashIn(): boolean;
        isMultiSigOut(): boolean;
        isMultiSigIn(): boolean;
        findAndDelete(script: Script): Script;
        writeScript(script: Script): Script;
        static writeScript(script: Script): Script;
        writeString(str: String): Script;
        static writeString(str: String): Script;
        writeOpCode(opCodeNum: number): Script;
        static writeOpCode(opCodeNum: number): Script;
        setChunkOpCode(i: number, opCodeNum: number): Script;
        writeBn(bn: Bn): Script;
        static writeBn(bn: Bn): Script;
        writeNumber(number: number): Script;
        static writeNumber(number: number): Script;
        setChunkBn(i: number, bn: Bn): Script;
        writeBuffer(buf: Buffer): Script;
        static writeBuffer(buf: Buffer): Script;
        setChunkBuffer(i: number, buf: Buffer): Script;
    }

    class Sig extends Struct {

    }

    class Struct {

    }


    class Tx extends Struct {
        txOuts: [TxOut];
        txOutsVi: VarInt;
        txIns: [TxIn];
        txInsVi: VarInt;
        constructor(versionBytesNum: number, txInsVi: VarInt,txIns: [TxIn],txOutsVi: VarInt,txOuts: [TxOut], nLockTime: number);
        constructor();
        fromJSON(json: {txIns: [{}], txOuts: [{}], versionByteNum: number, txInsVi: {}, txOutsVi: {}, nLockTime: number}): Tx;
        toJSON(): {txIns: [{}], txOuts: [{}], versionByteNum: number, txInsVi: {}, txOutsVi: {}, nLockTime: number};
        fromBr(br: Br): Tx;
        toBw(bw: Bw): Bw;
        hashPrevouts(): Buffer;
        hashSequence(): Buffer;
        hashOutputs(): Buffer;
        sighash(nHashType: number,nIn: number, subScript: Script, valueBn: Bn, flags?: number, hashCache?: HashCache): Buffer;
        asyncSighash(nHashType: number, nIn: number, subScript: Script, valueBn: Bn, flags?: number, hashCache?: HashCache): Promise<Buffer>;
        sighashPreimage(nHashType: number,nIn: number, subScript: Script, valueBn: Bn, flags?: number, hashCache?: HashCache): Buffer;
        asyncSighashPreimage(nHashType: number,nIn: number, subScript: Script, valueBn: Bn, flags?: number, hashCache?: HashCache): Promise<Buffer>;
        sign(keyPair: KeyPair, nHashType?: number, nIn?: number, subScript?: Script, valueBn?: Bn, flags?: number, hashCache?: HashCache): Sig;
        asyncSign(keyPair: KeyPair, nHashType?: number, nIn?: number, subScript?: Script, valueBn?: Bn, flags?: number, hashCache?: HashCache): Promise<Sig>;
        verify(sig: Sig, pubKey: PubKey, nIn: number, subScript: Script, enforceLowS?: boolean, valueBn?: Bn, flags?: number, hashCache?: HashCache): boolean;
        asyncVerify(sig: Sig, pubKey: PubKey, nIn: number, subScript: Script, enforceLowS?: boolean, valueBn?: Bn, flags?: number, hashCache?: HashCache): Promise<boolean>;
        hash(): Buffer;
        asyncHash(): Buffer;
        id(): Br;
        asyncId(): Promise<Br>;
        // todo: Add in the appropriate type
        addTxIn(txHashBuf: TxIn|{}, txOutNum: {}, script: Script, nSequence: number): Tx;
        addTxOut(valueBn: Bn, script: Script): Tx;
        sort(): Tx;
    }

    class TxIn extends Struct {
        constructor(txHashBuf: Buffer, txOutNum: number, scriptVi: VarInt, script: Script, nSequence: number);
        constructor();
        setScript(script: Script) :TxIn;
        fromProperties(txHashBuf: Buffer, txOutNum: number, script: Script, nSequence: number): TxIn;
        static fromProperties(txHashBuf: Buffer, txOutNum: number, script: Script, nSequence: number): TxIn;
        fromJSON(json: {txHashBuf: string, scriptVi: {buf: string},txOutNum: number,script:string,nSequence: number }): TxIn;
        toJSON(): {txHashBuf: string, scriptVi: {buf: string},txOutNum: number,script:string,nSequence: number };
        fromBr(br: Br): TxIn;
        toBw(bw: Bw): Bw;
        fromPubKeyHashTxOut(txHashBuf: Buffer, txOutNum: number, txOut: TxOut, pubKey: PubKey): TxIn;
        hasNullInput() : boolean;
        setNullInput(): void;
    }

    class TxOut extends Struct {
        script: Script;
        valueBn: VarInt;
        constructor(valueBn: Bn, scriptVi: VarInt,script: Script);
        constructor();
        setScript(script:Script): TxOut;
        fromProperties(valueBn: Bn, script: Script): TxOut;
        static fromProperties(valueBn: Bn, script: Script): TxOut;
        fromJSON(json: {valueBn: {},scriptVi:{buf: string},script: string}): TxOut;
        toJSON(): {valueBn: {},scriptVi:{buf: string},script: string};
        fromBr(br: Br): TxOut;
        toBw(bw: Bw): Bw;

    }

    class VarInt extends Struct {
        toNumber(): number;
    }



}
