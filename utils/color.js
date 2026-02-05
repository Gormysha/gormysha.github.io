export class Color {
    static toHSV(a) {
        if (a.x) a=Color.fromVector(a);
        let {r, g, b} = a;
        let v = Math.max(r, g, b);
        let c = v - Math.min(r, g, b);
        let s = v>0 ? c/v : 0;
        let h=1/6;
        if (r===g && r===b) h*=0;
        else if (r === v) h*=(g-b)/c;
        else if (g === v) h*=(b-r)/c+2;
        else if (b === v) h*=(r-g)/c+4;
        
        h=h%1
        if (h<0) h+=1;
        return {h, s, v};
    }
    static toRGB(a) {
        let {h, s, v} = a;
        let c = s*v;
        let i = h*6;
        let x = c*(1-Math.abs(i%2-1));
        let r0, g0, b0;
        switch (Math.floor(i)%6) {
            case 0: r0=c, g0=x, b0=0; break;
            case 1: r0=x, g0=c, b0=0; break;
            case 2: r0=0, g0=c, b0=x; break;
            case 3: r0=0, g0=x, b0=c; break;
            case 4: r0=x, g0=0, b0=c; break;
            case 5: r0=c, g0=0, b0=x; break;
        }
        let m = v-c;
        let [r, g, b] = [r0+m, g0+m, b0+m];
        return {r, g, b};
    }
    static verbose(v) {
        return {
            red: v.r,
            green: v.g,
            blue: v.b
        }
    }
    static fromVector(v) {
        return {
            r: v.x,
            g: v.y,
            b: v.z
        }
    }
    static toVector(c) {
        return {
            x: c.r ?? c.h,
            y: c.g ?? c.s,
            z: c.b ?? c.v
        }
    }
    static add(a, b) {
        return {
            r: (a.r ?? 0) + (b.r ?? 0),
            g: (a.g ?? 0) + (b.g ?? 0),
            b: (a.b ?? 0) + (b.b ?? 0)
        }
    }
    static scale(c, a) {
        return {
            r: (c.r ?? 0) * a,
            g: (c.g ?? 0) * a,
            b: (c.b ?? 0) * a
        }
    }
}