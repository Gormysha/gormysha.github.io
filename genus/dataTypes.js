const letters = [`A`, `T`, `G`, `C`];
const placeholderLetters = [`X`, `Y`, `Z`, `W`];
const dataTypes = {
    float: {
        size: 3,
        parse: (data) => {
            if (data === `AAAAAAAAAAAA`) return 0;
            const num = Strip.parseInt(data);
            const bin = (num | parseInt(`1${'0'.repeat(24)}`, 2)).toString(2).slice(1);
            const sign = (bin[0] === `1`) ? -1 : 1;
            const exponent = parseInt(bin.slice(1, 8), 2) - 64;
            const fraction = bin.slice(8).split(``).reduce((prev, current, i) => prev += (2 ** (-i - 1)) * parseInt(current), 0);
            return sign * (fraction + 1) * (2 ** exponent);
        },
        construct: (data) => {
            if (data === 0) return `AAAAAAAAAAAA`;
            const sign = (data < 0) ? `1` : `0`;
            data = Math.abs(data);

            let exponent = Math.floor(Math.log2(data));
            let normalized = data / (2 ** exponent);

            exponent += 64;
            if (exponent < 0) {
                exponent = 0;
                normalized = 0;
            } else if (exponent > 127) {
                exponent = 127;
                normalized = 1.999;
            }

            exponent = (exponent).toString(2).padStart(7, '0');
            data = normalized - 1;
            let fraction = ``;
            for (let i = 0; i < 16; i++) {
                if ((data *= 2) >= 1) {
                    fraction += `1`;
                    data -= 1;
                } else {
                    fraction += `0`;
                }
            }
            const result = `${sign}${exponent}${fraction}`;
            return result.split(``).reduce((prev, current, idx, arr) => (idx % 2) === 1 ? prev + letters[parseInt(`${arr[idx - 1]}${current}`, 2)] : prev, ``);
        },
        provide: (props, random) => {
            // let settings;
            // if (props) {
            //     const [range, floor, bias, degree] = props
            //     settings = { range, floor, bias, degree }
            // }
            // const val = distribute(random.get(), settings)
            let result = random.get();
            if (isFinite(props[0]) && isFinite(props[1])) {
                props[0] ??= 0;
                props[1] ??= 1
                result = props[0] + result * (props[1] - props[0])
            } else result = Math.tan(Math.PI*(result-0.5));
            return result;
        }
    },
    input: {
        size: 1,
        parse: (data) => Strip.parseInt(data),
        construct: (prop) => {
            //const value = weightedPick(props[0], random) ?? inputEnum[distribute(random.get(), { floor: true, range: [0, inputEnum.length] })];
            return Strip.fromInt(inputEnum.indexOf(prop))
        },
        provide: (props, random) => {
            return weightedPick(props, random.get())
        }
    },
    byte: {
        size: 1,
        parse: (data) => Strip.parseInt(data),
        construct: (value) => Strip.fromInt(value),
        provide: (props = [0, 1], random) => {
            const [min = 0, max = 1] = props;
            const rand = random.get();
            return min + Math.floor(rand * (max - min));
        }
    }
}

class Strip {
    static reducePlaceholders(strip, reducer) {
        let result=``;
        for (let i = 0; i < strip.length; i+=4) {
            if (placeholderLetters.includes(strip[i])) {
                let value = Strip.parseInt(strip.slice(i, i+4), placeholderLetters);
                result+=reducer(value);
            }
        }
        return result;
    }

    static parseInt(strip, symbols=letters) {
        let r = 0;
        for (let i = 0; i < strip.length; i++) {
            const char = strip[strip.length - 1 - i];
            r += symbols.indexOf(char) * (4 ** i);
        }
        return r;
    }
    static fromInt(int, len = 4, symbols=letters) {
        let r = [];
        if (Math.floor(int / (4 ** len)) !== 0) int = Math.floor(int / (4 ** (Math.log(int) / Math.log(4) - len)));
        for (let i = 0; i < len; i++) {
            r.unshift(symbols[int % 4]);
            int = Math.floor(int / 4);
        }
        return r.join(``);
    }
    toString() {

    }
}

class Template {
    constructor(data) {
        this.data=data;
    }
    toJSON() {
        return {
            strips: this.data
        }
    }
}


class TemplateMatrix {
    constructor(data) {
        this.entries=data;
    }
    reduceEntry(index) {
        if (typeof index === `string`) index=Strip.parseInt(index, placeholderLetters);
        let entry = this.getEntry(index);

    }
    getEntry(index) {
        return this.entries[index];
    }
    toJSON() {
        return
    }
}

export { dataTypes, Strip, letters, placeholderLetters }