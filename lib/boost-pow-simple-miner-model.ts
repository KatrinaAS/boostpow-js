import { BoostPowJobModel } from './boost-pow-job-model';
import { BoostPowJobProofModel } from './boost-pow-job-proof-model';
import * as randomBytes from 'randombytes';
import * as cryptoRandomString from 'crypto-random-string';

export class BoostPowSimpleMinerModel {
    /**
     * Start mining the Boost Job
     * @param debug Whether to log output
     */
    static startMining(job: BoostPowJobModel, jobProof: BoostPowJobProofModel, debugLevel = 0, increment?: Function, cancel?: Function) {
        let boostPowString;
        let counter = jobProof.getNonceNumber();
        let extra_nonce_2 = jobProof.getExtraNonce2Number();

        let max_big_int = BigInt('9223372036854775807');

        while (true) {
            boostPowString = BoostPowJobModel.tryValidateJobProof(job, jobProof);

            if (boostPowString) break;

            if (counter == 0x7fffffff) {
                counter = 0;
                if (extra_nonce_2 == max_big_int) extra_nonce_2 = BigInt(0);
                extra_nonce_2 = extra_nonce_2 + BigInt(1);
                jobProof.setExtraNonce2(extra_nonce_2);

            } else counter++;

            jobProof.setNonce(counter);

            if (counter % 500000 === 0 ) {
                if (debugLevel >= 1) {
                    console.log('Hashes checked: ', counter);
                }
                if (increment) {
                    increment(counter);
                }
            }
            if (cancel) {
                if (cancel()) {
                    return;
                }
            }
        }

        if (debugLevel >= 1) {
            console.log('Boost Pow String found: ',
                boostPowString.toString(),
                ', job: ', job.toObject(),
                ', jobProof: ', jobProof.toObject()
            );
        }
        
        return {
            boostPowString: boostPowString,
            boostPowJob: job,
            boostPowJobProof: jobProof,
        };
    }
}