class Triplet {
    constructor(c) {
        let vector = typeof c === `number` ? [Math.floor(c / 65536), Math.floor((c % 65536) / 256), c % 256] : c;
        let value = Array.isArray(c) ? c[2] + 256 * c[1] + 65536 * c[0] : c;
        Object.assign(this, { vector, value });
    }
}

export {Triplet}