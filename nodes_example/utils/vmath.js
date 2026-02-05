export class Vector {
    constructor(v) {
        Object.entries(v).forEach(([k, v]) => this[k] = v);
    }

    add(v) {
        new Set([...Object.keys(this), ...Object.keys(v)]).forEach((k) => this[k] += v[k]??0, this);
        return this;
    }

    subtract(v) {
        this.add(Object.fromEntries(Object.entries(v).map(([k, v]) => [k, -v])));
        return this;
    }

    scale(a) {
        Object.keys(this).forEach((k) => this[k] *= a);
        return this;
    }

    divide(a) {
        Object.keys(this).forEach((k) => this[k] /= a);
        return this;
    }

    floor() {
        Object.entries(this).forEach(([k, v]) => this[k] = Math.floor(v));
        return this;
    }

    withPrecision(digits) {
        let fac = Math.pow(10, digits);
        return this.scale(fac).floor().divide(fac);
    }
}

export class VMath {
    static coalesce(v={}) {
        return {
            x: isNaN(v.x) ? 0 : v.x,
            y: isNaN(v.y) ? 0 : v.y,
            z: isNaN(v.z) ? 0: v.z
        }
    }
    static entrywise(func, ...args) {
        return Object.fromEntries(
            Array.from(new Set(...args.map(a => Object.keys(a))))
            .map(k => [k, func(...args.map(a => a[k] ?? 0))])
        )
    }
    static isWithinVolume(from, to, vector) {
        return [`x`, `y`, `z`].every(a => vector[a] >= Math.min(from[a], to[a]) && vector[a] <= Math.max(from[a], to[a])); //why is bitwise and there
    }
    static toRGB(v) {
        return {
            red: v.x,
            green: v.y,
            blue: v.z
        }
    }
    static subtract(a, b) {
        a=this.coalesce(a);
        b=this.coalesce(b);
        return {
            x: a.x - b.x,
            y: a.y - b.y,
            z: a.z - b.z
        }
    }
    static add(a, b, ...other) {
        a=this.coalesce(a);
        b=this.coalesce(b);
        let result = {
            x: a.x + b.x,
            y: a.y + b.y,
            z: a.z + b.z
        }
        if (other) other.forEach(v => result=VMath.add(result, v));
        return result;
    }

    static multiply(a, b) {
        a=this.coalesce(a);
        b=this.coalesce(b);
        return {
            x: a.x*b.x,
            y: a.y*b.y,
            z: a.z*b.z
        }
    }
    static aligned(axis, length) {
        const v = { x: 0, y: 0, z: 0 };
        v[axis] = length;
        return v;
    }
    static styled(style) {
        return {
            from: {
                x: style.left,
                y: style.top
            },
            to: {
                x: style.right,
                y: style.bottom
            },
            delta: {
                x: style.right + style.left,
                y: style.top + style.bottom
            }
        }
    }
    static norm(a) {
        return Math.sqrt(a.x ** 2 + a.y ** 2 + a.z ** 2)
    }
    static distance(a, b) {
        return VMath.norm(VMath.subtract(a, b));
    }
    static scale(v, a) {
        return {
            x: a * v.x,
            y: a * v.y,
            z: a * v.z
        }
    }
    static toObjective(a, b) {
        return {
            origin: {
                x: Math.min(a.x, b.x),
                y: Math.min(a.y, b.y),
                z: Math.min(a.z, b.z)
            },
            size: {
                x: Math.abs(a.x - b.x),
                y: Math.abs(a.y - b.y),
                z: Math.abs(a.z - b.z)
            }
        }
    }
    static dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }
    static cross(a, b) {
        return {
            x: a.y*b.z-a.z*b.y,
            y: a.z*b.x-a.x*b.z,
            z: a.x*b.y-a.y*b.z
        }
    }
    static normalize(v) {
        return VMath.scale(v, 1 / VMath.norm(v));
    }
    static equals(a, b) {
        if (typeof a !== `object` || typeof b !== `object`) return false;
        return Object.entries(a).every(([k, v]) => b[k] === v);
    }
    static floor(v) {
        return {
            x: Math.floor(v.x),
            y: Math.floor(v.y),
            z: Math.floor(v.z)
        }
    }
    static ceil(v) {
        return {
            x: Math.ceil(v.x),
            y: Math.ceil(v.y),
            z: Math.ceil(v.z)
        }
    }
    static round(v) {
        return {
            x: Math.round(v.x),
            y: Math.round(v.y),
            z: Math.round(v.z)
        }
    }
}

export class Matrix {
    constructor(arr) {
        this.dimensions = [];
        for (let e = arr; Array.isArray(e) && this.dimensions.length < 128; e=e[0]) this.dimensions.push(e.length);
        const formArr = (data, depth=0) => Array.from(
            {length: this.dimensions[depth]},
            (_, i) => depth===this.dimensions.length-1 ? data[i] ?? 0 : formArr(data[i] ?? [], depth+1)
        );
        this.entries = formArr(arr);
        this.data = this.entries.flat(Infinity);
    }

    getEntry(...indexes) {
        return indexes.reduce((prev, curr, i) => prev + curr*(this.dimensions[i]??0)/this.dimensions.reduceRight((prod, size, n)=>n>=i?prod*size:prod, 1), 0)
    }
}