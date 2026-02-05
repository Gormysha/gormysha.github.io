import { Random, shuffleOrder } from "../random.js";

class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    dot(other) {
        return this.x * other.x + this.y * other.y;
    }
}


function MakePermutation(random) {
    let P = [];
    for (let i = 0; i < 256; i++) {
        P.push(i);
    }
    shuffleOrder(P, random);
    for (let i = 0; i < 256; i++) {
        P.push(P[i]);
    }

    return P;
}
let defaultPerm = MakePermutation();
let seededPermutations = {};

function GetConstantVector(v) {
    let h = v & 3;
    if (h == 0) return new Vector2(1.0, 1.0);
    else if (h == 1) return new Vector2(-1.0, 1.0);
    else if (h == 2) return new Vector2(-1.0, -1.0);
    else return new Vector2(1.0, -1.0);
}

function Fade(t) {
    return ((6 * t - 15) * t + 10) * t * t * t;
}

function Lerp(t, a1, a2) {
    return a1 + t * (a2 - a1);
}

function Noise2D(x, y, seed) {
    let X = Math.floor(x) & 255;
    let Y = Math.floor(y) & 255;

    let xf = x - Math.floor(x);
    let yf = y - Math.floor(y);

    let topRight = new Vector2(xf - 1.0, yf - 1.0);
    let topLeft = new Vector2(xf, yf - 1.0);
    let bottomRight = new Vector2(xf - 1.0, yf);
    let bottomLeft = new Vector2(xf, yf);
    
    if (seed && !seededPermutations[seed]) seededPermutations[seed] = new Random(seed);
    let P = seed ? seededPermutations[seed] : defaultPerm;
    let valueTopRight = P[P[X + 1] + Y + 1];
    let valueTopLeft = P[P[X] + Y + 1];
    let valueBottomRight = P[P[X + 1] + Y];
    let valueBottomLeft = P[P[X] + Y];

    let dotTopRight = topRight.dot(GetConstantVector(valueTopRight));
    let dotTopLeft = topLeft.dot(GetConstantVector(valueTopLeft));
    let dotBottomRight = bottomRight.dot(GetConstantVector(valueBottomRight));
    let dotBottomLeft = bottomLeft.dot(GetConstantVector(valueBottomLeft));

    let u = Fade(xf);
    let v = Fade(yf);

    let noise = Lerp(
        u,
        Lerp(v, dotBottomLeft, dotTopLeft),
        Lerp(v, dotBottomRight, dotTopRight)
    );
    noise += 1.0;
    noise *= 0.5;
    return noise;
}

function OctaveNoise(x, y, octaves, persistence, seed) {
    let result = 0;
    let frequency = 1;
    let amplitude = 1;
    let max = 0;
    //console.warn(`got args: ${x}, ${y}, ${octaves}, ${persistence}`)
    for (let i = 0; i < octaves; i++) {
        result += Noise2D(x * frequency, y * frequency, seed) * amplitude;
        max += amplitude;
        amplitude *= persistence;
        frequency *= 2;
    }
    if (max===0) return 0;
    return result / max;
}

export {OctaveNoise};