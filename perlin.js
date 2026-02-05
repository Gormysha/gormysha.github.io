class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    dot(other) {
        return this.x * other.x + this.y * other.y;
    }
}

export function Shuffle(tab) {
    for (let e = tab.length - 1; e > 0; e--) {
        let index = Math.round(Math.random() * (e - 1)),
            temp = tab[e];

        tab[e] = tab[index];
        tab[index] = temp;
    }
}

function MakePermutation() {
    let P = [];
    for (let i = 0; i < 256; i++) {
        P.push(i);
    }
    Shuffle(P);
    for (let i = 0; i < 256; i++) {
        P.push(P[i]);
    }

    return P;
}
let P = MakePermutation();

function GetConstantVector(v) {
    let h = v & 3;
    if (h == 0) return new Vector2(1.0, 1.0);
    else if (h == 1) return new Vector2(-1.0, 1.0);
    else if (h == 2) return new Vector2(-1.0, -1.0);
    else return new Vector2(1.0, -1.0);
}

export function Fade(t) {
    return ((6 * t - 15) * t + 10) * t * t * t;
}

function Lerp(t, a1, a2) {
    return a1 + t * (a2 - a1);
}

export function Noise2D(x, y) {
    let X = Math.floor(x) & 255;
    let Y = Math.floor(y) & 255;

    let xf = x - Math.floor(x);
    let yf = y - Math.floor(y);

    let topRight = new Vector2(xf - 1.0, yf - 1.0);
    let topLeft = new Vector2(xf, yf - 1.0);
    let bottomRight = new Vector2(xf - 1.0, yf);
    let bottomLeft = new Vector2(xf, yf);

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

export function OctaveNoise(x, y, octaves, persistence) {
    let result = 0;
    let frequency = 1;
    let amplitude = 1;
    let max = 0;
    for (let i = 0; i < octaves; i++) {
        result += Noise2D(x * frequency, y * frequency) * amplitude;
        max += amplitude;
        amplitude *= persistence;
        frequency *= 2;
    }
    return result / max;
}

//3d
function MakePermutation3D() {
    let P3 = [];
    for (let i = 0; i < 256; i++) {
        P3.push(i);
    }
    Shuffle(P3);
    for (let i = 0; i < 256; i++) {
        P3.push(P3[i]);
    }
    for (let i = 0; i < 256; i++) {
        P3.push(P3[i]);
    }

    return P3;
}
let P3 = MakePermutation3D();

class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    dot(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }
}

function GetConstantVector3D(v) {
    let h = v & 7;
    if (h == 0) return new Vector3(1.0, 1.0, 1.0);
    else if (h == 1) return new Vector3(-1.0, 1.0, 1.0);
    else if (h == 2) return new Vector3(-1.0, -1.0, 1.0);
    else if (h == 4) return new Vector3(1.0, -1.0, 1.0);
    else if (h == 5) return new Vector3(1.0, 1.0, -1.0);
    else if (h == 6) return new Vector3(-1.0, 1.0, -1.0);
    else if (h == 7) return new Vector3(-1.0, -1.0, -1.0);
    else return new Vector3(1.0, -1.0, -1.0);
}

export function Noise3D(x, y, z) {
    let X = Math.floor(x) & 255;
    let Y = Math.floor(y) & 255;
    let Z = Math.floor(z) & 255;

    let xf = x - Math.floor(x);
    let yf = y - Math.floor(y);
    let zf = z - Math.floor(z);

    let topRightU = new Vector3(xf - 1.0, yf - 1.0, zf - 1.0);
    let topLeftU = new Vector3(xf, yf - 1.0, zf - 1.0);
    let bottomRightU = new Vector3(xf - 1.0, yf, zf - 1.0);
    let bottomLeftU = new Vector3(xf, yf, zf - 1.0);
    let topRightD = new Vector3(xf - 1.0, yf - 1.0, zf);
    let topLeftD = new Vector3(xf, yf - 1.0, zf);
    let bottomRightD = new Vector3(xf - 1.0, yf, zf);
    let bottomLeftD = new Vector3(xf, yf, zf);

    // Старый вариант
    // let valueTopRightD = P[P[X + 1] + Y + 1 + Z];
    // let valueTopLeftD = P[P[X] + Y + 1 + Z];
    // let valueBottomRightD = P[P[X + 1] + Y + Z];
    // let valueBottomLeftD = P[P[X] + Y + Z];
    // let valueTopRightU = P[P[X + 1] + Y + 1 + Z + 1];
    // let valueTopLeftU = P[P[X] + Y + 1 + Z + 1];
    // let valueBottomRightU = P[P[X + 1] + Y + Z + 1];
    // let valueBottomLeftU = P[P[X] + Y + Z + 1];

    let valueTopRightU = P3[P3[P3[X + 1] + Y + 1] + Z + 1];
    let valueTopLeftU = P3[P3[P3[X] + Y + 1] + Z + 1];
    let valueBottomRightU = P3[P3[P3[X + 1] + Y] + Z + 1];
    let valueBottomLeftU = P3[P3[P3[X] + Y] + Z + 1];
    let valueTopRightD = P3[P3[P3[X + 1] + Y + 1] + Z];
    let valueTopLeftD = P3[P3[P3[X] + Y + 1] + Z];
    let valueBottomRightD = P3[P3[P3[X + 1] + Y] + Z];
    let valueBottomLeftD = P3[P3[P3[X] + Y] + Z];

    let dotTopRightD = topRightD.dot(GetConstantVector3D(valueTopRightD));
    let dotTopLeftD = topLeftD.dot(GetConstantVector3D(valueTopLeftD));
    let dotBottomRightD = bottomRightD.dot(GetConstantVector3D(valueBottomRightD));
    let dotBottomLeftD = bottomLeftD.dot(GetConstantVector3D(valueBottomLeftD));
    let dotTopRightU = topRightU.dot(GetConstantVector3D(valueTopRightU));
    let dotTopLeftU = topLeftU.dot(GetConstantVector3D(valueTopLeftU));
    let dotBottomRightU = bottomRightU.dot(GetConstantVector3D(valueBottomRightU));
    let dotBottomLeftU = bottomLeftU.dot(GetConstantVector3D(valueBottomLeftU));

    let u = Fade(xf);
    let v = Fade(yf);
    let q = Fade(zf);

    let dLerp = Lerp(
        u,
        Lerp(v, dotBottomLeftD, dotTopLeftD),
        Lerp(v, dotBottomRightD, dotTopRightD)
    );
    let uLerp = Lerp(
        u,
        Lerp(v, dotBottomLeftU, dotTopLeftU),
        Lerp(v, dotBottomRightU, dotTopRightU)
    );
    let noise = Lerp(
        q,
        dLerp,
        uLerp
    )
    noise += 1.0;
    noise *= 0.5;
    return noise;
}