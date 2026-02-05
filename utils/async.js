import * as mc from '@minecraft/server';

export function sleep(ticks) {
    return new Promise((resolve, reject) => {
        mc.system.runTimeout(resolve, ticks);
    })
}

export function scheduleJob(generator) {
    return new Promise((resolve, reject) => {
        mc.system.runJob(function* () {
            yield* generator;

            resolve();
        }())
    })
}