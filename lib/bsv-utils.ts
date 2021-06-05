import * as bsv from 'bsv';
import {Buffer} from "buffer";
import {OpCode} from "bsv";

export class BsvUtils {
    static checkChunkMinimalPush(chunk: {buf: Buffer, len: number, opCodeNum: number}): boolean {
        if(!chunk.buf)
        {
            return true;
        }
        if(chunk.buf.length ===0) {
            return chunk.opCodeNum===OpCode.fromString("OP_0").toNumber();
        }
        if(chunk.buf.length===1 && chunk.buf[0]>=1 && chunk.buf[0]<=16) {
            return chunk.opCodeNum=== (OpCode.fromString("OP_1").toNumber()+chunk.buf[0]-1);
        }
        if(chunk.buf.length==1 && chunk.buf[0] === 0x81) {
            return chunk.opCodeNum ===OpCode.fromString("OP_1NEGATE").toNumber();
        }
        if(chunk.buf.length<=75) {
            return chunk.opCodeNum === chunk.buf.length;
        }
        if(chunk.buf.length<=255) {
            return chunk.opCodeNum === OpCode.fromString("OP_PUSHDATA1").toNumber();
        }
        if(chunk.buf.length<=65535) {
            return chunk.opCodeNum === OpCode.fromString("OP_PUSHDATA2").toNumber();
        }
        return true;
    }
}
