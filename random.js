//splitmix32 by someone (not me)
function splitmix32(a) {
    //a |= 0; a = a + 0x9e3779b9 | 0; this line increments a, but we don't need it
    var t = a ^ a >>> 16; t = Math.imul(t, 0x21f0aaad);
    t = t ^ t >>> 15; t = Math.imul(t, 0x735a2d97);
    return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
}

//a hash algorithm from a stackoverflow answer, modified to return only 4 first bytes
function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return h1 >>> 0;
}

const max32int = 2**32-1;
class Random {
    constructor(seed) {
        if (!seed) seed = Math.floor(Math.random()*max32int);
        if (typeof seed===`string`) seed=cyrb128(seed);
        this.seed = seed;
    }
    get() {
        const result = splitmix32(this.seed);
        this.seed |= 0;
        this.seed = this.seed + 0x9e3779b9 | 0;
        return result;
    }
}

export const nativeRandom = {get: Math.random}
function weightedPick(options, random) {
    if (!options) return undefined;
    random ??= Math.random();
    if (typeof options === 'object' && !Array.isArray(options)) {
        if (Object.values(options).every(e => typeof e === 'number')) options=Object.entries(options).map(([k, v]) => ({weight: v, value: k}))
    }
    if (!Array.isArray(options)) return options;
    const sum = options.reduce((prev, current) => prev + (current.weight ?? 1), 0);
    let carry = 0;
    for (const option of options) {
        const current = (option.weight ?? 1) / sum;
        if (carry + current > random) return option.value ?? option;
        carry += current;
    }

    //console.warn(`well ${JSON.stringify(options)}, ${random}`);
}

function shuffleOrder(arr, rand=nativeRandom) {
    for (let i = arr.length - 1; i > 0; i--) {
        let idx = Math.floor(rand.get() * i)
        let tmp = arr[idx];
        arr[idx] = arr[i];
        arr[i] = tmp;
    }
    return arr;
}


export {cyrb128, splitmix32, Random, weightedPick, shuffleOrder};