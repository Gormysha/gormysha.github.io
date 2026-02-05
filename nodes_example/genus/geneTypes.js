import { Triplet } from "../utils/triplet.js";
import { OctaveNoise } from "../utils/perlin.js";
import { VMath } from "../utils/vmath.js";
//import { generateStrip } from "../gene.js";
import { nativeRandom, Random } from "../random.js";

const inputTypes = [`constant`, `input`, `retrieve`, `random`]
const arithTypes = [`add`, `subtract`, `multiply`, `divide`, `power`, `mod`, `abs`, `floor`]
const logicTypes = [`equals`, `and`, `or`, `not`, `less`, `gate`]
const normalTypes = [`sin`, `cos`, `tan`, `cot`, `noise`, `sponge`, `normalize`]
const tripletTypes = [`triplet`, `triplet_distance`]
const specialTypes = [`palette`]
const rootTypes = [`mask`, `sponge_carver`, `define`, `feature`]
export const typeCategories = {Input: inputTypes, Arithmetic: arithTypes, Logic: logicTypes, Normal: normalTypes, Triplet: tripletTypes, Special: specialTypes, Root: rootTypes}
const typeEnum = [...inputTypes, ...arithTypes, ...normalTypes, ...logicTypes, ...specialTypes, ...tripletTypes, ...rootTypes];

const inputEnum = [`x`, `z`, `y`, `color`, `index`];

const evalArgs = (args, context) => args.map(arg => {
    if (typeof arg.eval !== `function`) {
        console.log(`w`);
    }
    const result = arg.eval(context);
    return result;
})
const getBlock = (ctx, palette, block) => {
    palette = Math.floor(palette);
    block = Math.floor(block) + 1; //because 0 is reserved for air, we got to start from 1
    let targetPalette = ctx.palettes?.[palette];
    //console.warn(JSON.stringify(targetPalette), block)
    if (block < 0) return { id: `minecraft:air`, color: [0, 0, 0] };
    else if (block === 0) return 0;
    else return targetPalette?.[(block - 1)%targetPalette?.length] ?? { id: 'minecraft:stone', color: [255, 255, 255] }
}
const geneTypes = {
    dummy: {
        args: { length: 1 },
        eval: function (ctx) { return this.args[0].eval(ctx) }
    },
    constant: {
        data: {
            type: `float`,
            options: [-Infinity, Infinity]
        },
        eval: function (ctx) { return this.data }
    },
    input: {
        data: {
            type: `byte`,
            options: [0, inputEnum.length]
        },
        eval: function (ctx) { return Object.values(ctx.input)[this.data] }//ctx.input[inputEnum[this.data]] }
    },
    add: {
        args: { length: 2 },
        eval: function (ctx) { const args = evalArgs(this.args, ctx); return args[0] + args[1] }
    },
    subtract: {
        args: { length: 2 },
        eval: function (ctx) { const args = evalArgs(this.args, ctx); return args[0] - args[1] }
    },
    multiply: {
        args: { length: 2 },
        eval: function (ctx) {
            const args = evalArgs(this.args, ctx); return args[0] * args[1]
        }
    },
    divide: {
        args: { length: 2 },
        argNames: [`Dividend`, `Divisor`],
        eval: function (ctx) { const args = evalArgs(this.args, ctx); return args[0] / args[1] }
    },
    power: {
        args: { length: 2 },
        argNames: [`Base`, `Exponent`],
        eval: function (ctx) { const args = evalArgs(this.args, ctx); return Math.sign(args[0]) * (Math.abs(args[0]) ** args[1]) }
    },
    mod: {
        args: { length: 2 },
        argNames: [`Dividend`, `Divisor`],
        eval: function (ctx) { const args = evalArgs(this.args, ctx); return args[1] ? (args[0] % args[1]) : args[0] }
    },
    snap: {
        args: { length: 2 },
        argNames: [`Value`, `Step`],
        eval: function (ctx) { const args = evalArgs(this.args, ctx); return args[1] ? Math.floor(args[0] / args[1]) * args[1] : args[0] }
    },
    abs: {
        args: { length: 1 },
        eval: function (ctx) { return Math.abs(this.args[0].eval(ctx)) }
    },
    floor: {
        args: { length: 1 },
        eval: function (ctx) { return Math.floor(this.args[0].eval(ctx)) }
    },
    sin: {
        args: { length: 1 },
        eval: function (ctx) { return Math.sin(this.args[0].eval(ctx)) }
    },
    cos: {
        args: { length: 1 },
        eval: function (ctx) {
            return Math.cos(this.args[0].eval(ctx))
        }
    },
    tan: {
        args: { length: 1 },
        eval: function (ctx) { return Math.tan(this.args[0].eval(ctx)) }
    },
    cot: {
        args: { length: 1 },
        eval: function (ctx) { return 1 / Math.tan(this.args[0].eval(ctx)) }
    },
    noise: {
        args: { length: 5 },
        argNames: [`X`, `Y`, `Frequency`, `Persistence`, `Octaves`],
        eval: function (ctx) {
            const [x, y, fq, pers, octs] = evalArgs(this.args, ctx);
            return OctaveNoise(x * fq, y * fq, octs, pers, ctx.id);
        }
    },
    random: {
        eval: function (ctx) {
            return ctx.random?.get();
        }
    },
    sponge: {
        args: { length: 3 },
        argNames: [`X`, `Y`, `Max size`],
        eval: function (ctx, d = 0) {
            let [x, y, maxSize] = evalArgs(this.args, ctx);

            maxSize -= maxSize % 3;
            x = x % (maxSize * 2 / 3);
            y = y % (maxSize * 2 / 3);

            maxSize /= 3 ** d;
            maxSize = Math.floor(maxSize);
            //console.log(d, maxSize)
            if (maxSize < 3) return 1;
            x = x % maxSize;
            y = y % maxSize;
            // x = Math.floor(x / (3 ** d));
            // y = Math.floor(y / (3 ** d));
            if ((Math.floor(3 * x / maxSize) === 1) && (Math.floor(3 * y / maxSize) === 1)) return 0;
            return this.eval(ctx, d + 1);
        }
    },
    sponge_carver: {
        args: { length: 3 },
        // eval: function (ctx, min=0, max=0) {
        //     if (!max) max = this.args[0];
        //     let range = Math.floor((max-min)/3)*3;
        //     ctx.clear(ctx, min + range/3 + 1, min + range*2/3);
        //     if (range > 3) {
        //         this.eval(ctx, min, min+range/3);
        //         this.eval(ctx, min + range*2/3, min + range);
        //     }
        // }
        eval: function (ctx, d = 0) {
            if (d > 10) return;
            let [x, y, maxSize] = evalArgs(this.args, ctx);
            let total = maxSize;
            maxSize -= maxSize % 3;
            // x += Math.floor(x/maxSize) * maxSize / 3
            // y += Math.floor(y/maxSize) * maxSize / 3
            x = x % (maxSize * 2 / 3);
            y = y % (maxSize * 2 / 3);

            maxSize /= 3 ** d;
            maxSize = Math.floor(maxSize);
            //console.log(d, maxSize)
            if (maxSize < 3) return;
            // x = Math.floor(x / (3 ** d));
            // y = Math.floor(y / (3 ** d));
            x = x % maxSize;
            y = y % maxSize;
            if ((Math.floor(3 * x / maxSize) === 1) || (Math.floor(3 * y / maxSize) === 1)) {
                for (let i = 0; i < total / maxSize; i++) {
                    ctx.fill?.(ctx, (i + 1 / 3) * maxSize + 1, (i + 2 / 3) * maxSize, `minecraft:air`);
                }
            };
            this.eval(ctx, d + 1);
        }
    },
    palette: {
        args: { length: 3 },
        argNames: [`Size`, `Sorter`, `Condition`],
        eval: function (ctx) {
            if ((this.paletteIndex !== undefined) && !ctx.recalculatePalettes) return this.paletteIndex;
            this.paletteIndex ??= ctx.palettes.length;

            const size = Math.floor(this.args[0].eval(ctx));
            const [, sorter, condition] = this.args;
            const palette = [];
            const currentInput = Object.assign({}, ctx.input);
            ctx.blockList.forEach((e, i) => {
                if (typeof e !== `object`) return;
                //ctx.input.x = ctx.input.z = i;
                ctx.paletteCandidate = e;
                ctx.input.color = new Triplet(e.color).value;
                ctx.input.index = e.index;
                e.score = sorter.eval(ctx);
            })
            const blockList = ctx.blockList.toSorted((a, b) => a.score - b.score);
            ctx.input = currentInput;
            for (const block of blockList) {
                if (palette.length >= size) break;
                ctx.paletteCandidate = block;
                ctx.input.index = block.index;
                if (condition.eval(ctx)) palette.push(block);
            }
            ctx.palettes.splice(this.paletteIndex, 1, palette);
            return this.paletteIndex;
        }
    },
    block_rarity: {
        eval: function (ctx) { return ctx.paletteCandidate.rarity }
    },
    block_color: {
        eval: function (ctx) {
            const c = ctx.paletteCandidate.color;
            return c[2] + 256 * c[1] + 65536 * c[0];
        }
    },
    triplet: {
        args: { length: 3 },
        argNames: [`X`, `Y`, `Z`],
        eval: function (ctx) {
            const args = evalArgs(this.args, ctx);
            return new Triplet(args).value
        }
    },
    triplet_distance: {
        args: { length: 2 },
        eval: function (ctx) {
            const colors = evalArgs(this.args, ctx).map(e => new Triplet(e).vector);
            if (!colors[0] || !colors[1]) return 0; //a temporary measure, need to find why they can be undefined
            return Math.sqrt([0, 1, 2].reduce((prev, i) => prev + (colors[0][i] - colors[1][i]) ** 2, 0))
        }
    },
    equals: {
        args: { length: 2 },
        eval: function (ctx) { const args = evalArgs(this.args, ctx); return Boolean(args[0] === args[1]) }
    },
    less: {
        args: { length: 2 },
        eval: function (ctx) { const args = evalArgs(this.args, ctx); return Boolean(args[0] < args[1]) }
    },
    and: {
        args: { length: 2 },
        eval: function (ctx) { const args = evalArgs(this.args, ctx); return Boolean(args[0] && args[1]) }
    },
    or: {
        args: { length: 2 },
        eval: function (ctx) { const args = evalArgs(this.args, ctx); return Boolean(args[0] || args[1]) }
    },
    not: {
        args: { length: 1 },
        eval: function (ctx) { const args = evalArgs(this.args, ctx); return Boolean(!args[0]) }
    },
    mask: {
        // data: {
        //     type: `byte`
        // }, i don't know why it's there, it doesn't seem to be used
        args: { length: 4 },
        argNames: [`Base`, `Height`, `Palette index`, `Block index`],
        eval: function (ctx) {
            const args = evalArgs(this.args, ctx);
            //console.warn(JSON.stringify(args));
            if (args[1] < args[0]) return;
            //console.log(JSON.stringify(ctx.palettes));
            const block = getBlock(ctx, args[2], args[3]);
            //console.warn(args[2], args[3], JSON.stringify(block));
            if (block) ctx.fill?.(ctx, args[0], args[1], block);
            //ctx.fill.pushVolume({action: mc.CompoundBlockVolumeAction.Add, volume: new mc.BlockVolume({x: ctx.input.x, y: 0, z: ctx.input.z}, {x: ctx.input.x, y: 8*this.args[0], z: ctx.input.z})})
        }
    },
    // function: {
    //     data: {
    //         type: `byte`,
    //         options: [0, 1]
    //     },
    //     eval: function (ctx) {
    //         ctx.functions?.[this.data]?.(ctx);
    //     }
    // },
    feature: {
        args: { length: 6 }, //origin y, offset triplet, size triplet, palette, block, condition
        eval: function (ctx) {
            if (!this.args[5].eval(ctx)) return;
            ctx.feature_origin = {
                x: ctx.input.x,
                y: this.args[0].eval(ctx),
                z: ctx.input.z
            }
            const currentInput = Object.assign({}, ctx.input);
            ctx.input.scale = 1;
            const [offset, size] = this.args.slice(1, 3).map(e => {
                const v = new Triplet(e.eval(ctx)).vector;
                return { x: v[0], y: v[1], z: v[2] }
            });
            const palette = this.args[3].eval(ctx);
            for (let x = 0; x < size.x; x++) {
                for (let z = 0; z < size.z; z++) {
                    for (let y = 0; y < size.y; y++) {
                        Object.assign(ctx.input, VMath.subtract({ x, y, z }, offset));
                        const block = getBlock(ctx, palette, this.args[4].eval(ctx));
                        const pos = VMath.add(ctx.feature_origin, ctx.input);
                        if (block) {
                            Object.assign(ctx.input, pos);
                            ctx.fill?.(ctx, pos.y, pos.y, block);
                        }
                    }
                }
            }
            ctx.input = currentInput;
        }
    },
    define: {
        args: { length: 1 },
        eval: function (ctx) {
            return ctx.variables?.push(this.args[0].eval(ctx)) - 1;
        },
        process: (options) => {
            const { obj, random, context, depth } = options;
            if (depth === 0) return;
            obj.type = `retrieve`;
            if (context.variables.indexOf(obj.alias)===-1) {
                //console.warn(`new var: `,obj.alias);
                context.variables.push(obj.alias);
            }
            //let argStrip = generateStrip(obj.args[0]);
            let index = context.sequence.findIndex((e) => {
                if (e.type !== `define`) return;
                if (
                    //generateStrip(e.args[0]) === argStrip ||
                    (e.alias === obj.alias && e.alias !== undefined)
                ) return true;
            });
            if (index !== -1) obj.data = index;
            else {
                obj.data = context.sequence.reduce((prev, current) => prev + (current.type === `define`), 0);
                let result = { type: `define`, args: [obj.args[0]] };
                context.sequence.splice(obj.data, 0, result);
            }
            delete obj.args;
        }
    },
    retrieve: {
        data: {
            type: `byte`,
            provider: (options) => {
                const { context, random } = options;
                return Math.floor(random.get() * context.sequence.reduce((prev, current) => prev + (current.type === `define`), 0))
            }
        },
        eval: function (ctx) {
            return ctx.variables?.[this.data] ?? 0;
        },
        process: (options) => {
            const { obj, random, context, depth } = options;
            //console.warn(`retrieving var: ${obj.alias}`);
            //if (!context.variables) console.warn(context);
            //console.warn(`current vars: ${context.variables}, index: ${context.variables?.indexOf(obj.alias)}`)
            if (obj.alias) obj.data = context.variables?.indexOf(obj.alias);
        }
    },
    normalize: {
        args: { length: 1 },
        eval: function (ctx) {
            return this.args[0].eval(ctx);
            // const target = this.args[0];
            // const range = target.getRange(256, ctx);
            // if (range.max === range.min) return 0.5;
            // else return (target.eval(ctx) - range.min) / (range.max - range.min);
            // return target.eval(ctx);
        }
    },
    gate: {
        args: { length: 2 },
        eval: function (ctx) {
            const [condition, target] = this.args;
            return condition.eval(ctx) ? target.eval(ctx) : 0;
        }
    }
}

export { typeEnum, geneTypes, inputEnum, rootTypes, arithTypes, tripletTypes, inputTypes, logicTypes, normalTypes, specialTypes }