import { arithTypes, geneTypes, inputEnum, inputTypes, logicTypes, normalTypes, rootTypes, typeEnum } from "./genus/geneTypes.js";
import { dataTypes, letters, placeholderLetters, Strip } from "./genus/dataTypes.js";
import { cyrb128, Random } from "./random.js";
import { VMath } from "./utils/vmath.js";
import { Color } from "./utils/color.js";


function weightedPick(options, random) {
    if (!options) return undefined;
    if (!Array.isArray(options)) return options;
    const sum = options.reduce((prev, current) => prev + (current.weight ?? 1), 0);
    let carry = 0;
    for (const option of options) {
        const current = (option.weight ?? 1) / sum;
        if (carry + current > random) return option;
        carry += current;
    }
}

const defaultDistributionOptions = {
    degree: 1,
    range: [0, 1],
    floor: false,
    bias: 0
}
function distribute(value, options = defaultDistributionOptions) {
    Object.entries(defaultDistributionOptions).forEach(([key, value]) => options[key] = options[key] ?? value);
    const { range, floor, bias, degree } = options;
    const amplitude = (range[1] - range[0]);
    if (degree !== 1) {
        let x = value;
        let t = bias / amplitude;
        if (t === 1) value = 1 - Math.pow(1 - x, degree);
        else if (t === 0) value = Math.pow(x, degree);
        else value = x > t ? Math.pow((x - t) / (1 - t), degree) * (1 - t) + t : -Math.pow((t - x) / t, degree) * t + t
    }
    let result = range[0] + value * amplitude;
    //if (floor) result = Math.floor(result);
    return result;
}
const argTemplates = {};
class TemplatePool {
    constructor(defaults) {
        this.weights = [];
        if (defaults) {
            this.weights.push(...argTemplates[defaults])
        }
    }
    replace(template) {
        this.weights = this.weights.filter((e) => e.type !== template.type);
        this.weights.push(template);
        return this;
    }
    resolve() {
        return this.weights;
    }
    push(template) {
        this.weights.push(template instanceof TemplatePool ? template.resolve() : template);
        return this;
    }
    add(type, weight, args, data) {
        this.weights.push({ type, weight, args, data })
        return this;
    }
    static of(types) {
        return types.map((key) => ({ type: key, weight: 1 }))
    }
    static without(types) {
        return TemplatePool.of(typeEnum.filter(e => types.indexOf(e) === -1));
    }
    static more(type, weight) {
        return [...this.commons.default, this.commons[type].forEach(e => e.weight *= weight)];
    }
    static fromMap(map) {
        return [...Object.entries(map).map(([key, value]) => ({ type: key, weight: value }))];
    }
    static makeInt(min, max) {
        return [...this.commons.default, {
            type: `constant`,
            data: [
                {
                    type: `float`,
                    weights: [
                        {
                            range: [min, max],
                            floor: true
                        }
                    ]
                }
            ],
            weight: 20
        }]
    }
    static commons = {
        default: TemplatePool.of(typeEnum).filter(e => e !== `fillPixel`),
        immediate: TemplatePool.of([`constant`, `input`])
    }
}

export class TGN {
    static int(range, bias, degree = 2) {
        const data = [
            range,
            true
        ]
        if (typeof bias !== `undefined`) data.push(bias, degree);
        return {
            type: `constant`,
            data: data,
            weight: 1
        }
    }
    static wrap(template, content) {
        return Object.fromEntries(Object.entries(template).map(([k, v]) => {
            if (k !== `args`) return [k, v];

            return v.map(e => TGN.wrap(e, content) ?? content)
        }))
    }
    static replace(type, source, replacer) {
       return Object.fromEntries(Object.entries(source).map(([k, v]) => {
            if (k !== `args`) return [k, v];

            return v.map(e => e.type === type ? replacer : TGN.replace(type, e, replacer));
        }))
    }
    static float(range, bias, degree) {
        const result = TGN.int(range, bias, degree);
        result.data[1] = false;
        return result;
    }
    static const(value, weight = 1) {
        return { type: `constant`, data: value, weight }
    }
    static ranged(min, max, bias, degree) {
        const result = {
            type: `multiply`,
            args: [
                argTemplates.normal,
                TGN.float([min, max], bias, degree)
            ]
        }
        return result;
    }
    static input(options = [0, inputEnum.length]) {
        let data = (typeof options === `string` ? Math.max(inputEnum.indexOf(options), 0) : options);
        return { type: `input`, data };
    }
    static scaledInput(inputOptions, factor) {
        return TGN.scale(TGN.input(inputOptions), factor);
    }
    static scale(val, factor) {
        let args = [
            val,
            typeof factor === `number` ? { type: `constant`, data: factor } : factor
        ]
        return {
            type: `multiply`,
            args
        }
    }
    static def(name, val) {
        return {
            type: `define`,
            args: [
                val
            ],
            alias: name
        }
    }
    static var(name) {
        return {
            type: `retrieve`,
            alias: name
        }
    }
    static color(r, g, b) {
        return {
            type: `color`,
            args: [
                TGN.const(r),
                TGN.const(g),
                TGN.const(b)
            ]
        }
    }
    static ofWeight(obj, weight) {
        obj.weight = weight;
        return obj;
    }
    static weightedPool(poolId, weight) {
        let target = argTemplates[poolId];
        if (!target) return;
        if (!Array.isArray(target)) target = [target];
        return target.map(e => {
            let copy = Object.assign({}, e);
            copy.weight ??= 1;
            copy.weight *= weight;
            return copy;
        })
    }
    static makePool(pool, map = {}) {
        if (!Array.isArray(pool)) pool = [pool];
        return pool.map(e => {
            let copy = typeof e === `string` ? { type: e } : Object.assign({}, e);
            copy.weight ??= 1;
            if (map.weight) copy.weight *= map.weight;
            if (map.depth_factor) copy.depth_factor = map.depth_factor;
            return copy;
        })
    }
    static addProps(target, obj) {
        Object.assign(target, obj);
        return target;
    }
}

function weights(defaults = `default`) {
    const result = new TemplatePool(defaults);
    return result;
}

export const universalTypes = [...inputTypes, ...arithTypes, ...normalTypes, ...logicTypes];
argTemplates.basic = [
    {
        type: `input`,
        depth_factor: 0.875,
        data: [0, 2],
        weight: 2
    },
    {
        type: `constant`,
        weight: 0.5,
        depth_factor: 0.9
    },
    `add`,
    `subtract`,
    `multiply`,
    `divide`,
    `abs`,
    `mod`,
    `power`,
    `floor`,
    `sin`,
    `cos`,
    `tan`,
    `cot`,
    `noise`,
    `random`,
    `sponge`
]
argTemplates.default = [
    {
        type: `constant`,
        weight: 4
    },
    {
        type: `input`,
        data: [0, 2],
        weight: 4
    },
    ...TemplatePool.fromMap({
        add: 2,
        subtract: 1,
        multiply: 2,
        divide: 1,
        power: 2,
        mod: 2,
        abs: 1,
        sin: 1,
        cos: 1,
        tan: 1,
        cot: 1,
        noise: 2
    })
] //weighted enum of default types
argTemplates.dual = [argTemplates.default, argTemplates.default]
argTemplates.single = [argTemplates.default]
argTemplates.noise = [
    {
        type: `noise`,
        args: [
            weights(`basic`).add(`input`, 30, undefined, [`x`, `y`]).resolve(),
            weights(`basic`).add(`input`, 30, undefined, [`x`, `y`]).resolve(),
            undefined, undefined, undefined
        ]
    }
]

argTemplates.paletteSorterLogic = [
    {
        type: `and`,
        args: [
            argTemplates.paletteSorterLogic,
            argTemplates.paletteSorterLogic
        ],
        depth_factor: 1.25
    },
    {
        type: `or`,
        args: [
            argTemplates.paletteSorterLogic,
            argTemplates.paletteSorterLogic
        ],
        depth_factor: 1.25
    },
    {
        type: `not`,
        args: [
            argTemplates.paletteSorterLogic,
            argTemplates.paletteSorterLogic
        ],
        depth_factor: 1.25
    },
    {
        type: `noise`,
        depth_factor: 0.9
    },
    {
        type: `.`,
        depth_factor: 0.9
    }
]
argTemplates.palette = {
    type: `palette`,
    args: [
        [
            TGN.ofWeight(TGN.int([1, 10], 1, 1.5), 30)
        ],
        [
            //...TGN.wrap(argTemplates.default, [`color`, `color_distance`, `block_color`])
        ],
        [
            {
                macro: `logic`,
                args: [
                    [
                        ...argTemplates.default,
                        ...TGN.makePool([`block_rarity`, `block_color`, `color`])
                    ]
                ]
            }
        ]
    ]
}
argTemplates.general = {
    type: `mask`,
    args: [
        [
            TGN.const(0, 30),
            ...argTemplates.basic
        ],
        {
            type: `add`,
            args: [
                TGN.int([0, 128], 64, 2.5),
                {
                    type: `multiply`,
                    args: [
                        TGN.int([0, 128], 32, 2.5),
                        undefined
                    ]
                }
            ]
        },
        {
            type: `palette`,
            args: [
                TGN.const(1),
                TGN.const(-1),
                TGN.const(1)
            ]
        },
        TGN.const(0)
    ]
}

argTemplates.density = {
    type: `less`,
    args: [
        {
            type: `random`
        },
        {
            type: `noise`
        }
    ]
}

TGN.wrap = function (base, template) {
    if (!Array.isArray(base)) base = [base];
    return base.map((e) => {
        if (typeof e === `string`) e = { type: e };
        let copy = Object.assign({}, e);
        if (copy.args) copy.args = copy.args.map(arg => arg ? this.wrap(arg, template) : template);
        else copy.args = Array(geneTypes[copy.type]).fill(template);
        return copy;
    })
}


export class Gene {
    constructor(gene = generateStrip({ type: `constant`, data: 0 })) {
        let typeId = Strip.parseInt(gene.slice(1, 4));
        if (typeId < typeEnum.length) this.type = typeEnum[typeId];
        else this.type = `dummy`
        //console.log(this.type, gene)
        const typeInfo = geneTypes[this.type];
        if (!typeInfo) console.log(this.type);
        if (typeInfo.data) {
            const dataInfo = dataTypes[typeInfo.data.type];
            if (!dataInfo) console.log(typeInfo)
            const size = dataInfo.size * 4;
            this.data = dataInfo.parse(gene.slice(4, 4 + size));
        }
        this.eval = (function (ctx) {
            //if (this.lastEvaluated && this.type===`mask`) console.log(`delay: ${Date.now()-this.lastEvaluated}`);
            this.lastValue = typeInfo.eval.call(this, ctx)
            //console.warn(`evaluating: ${this.type}`)
            return this.lastValue;
        }).bind(this);
        // this.eval = typeInfo.eval.bind(this);
        this.args = Array.from({ length: typeInfo.args?.length });
    }
    toTemplate(depth = 0) {
        if (depth > 32) return { type: `input`, data: 0 }
        const result = { type: this.type };
        const typeInfo = geneTypes[this.type];
        if (typeInfo.args) {
            result.args = Array.from(typeInfo.args, (_, i) => this.args[i].toTemplate(depth + 1));
        }
        if (this.data !== undefined) result.data = this.data;
        return result;
    }
    getRange(sampleSize, ctx) {
        if (!this.sampleRange) {
            const currentInput = Object.assign({}, ctx.input);
            let min = ctx.range?.max ?? Infinity, max = ctx.range?.min ?? -Infinity
            for (let i = 0; i < sampleSize ** 2; i++) {
                const [x, y] = [i % sampleSize, Math.floor(i / sampleSize)];
                ctx.input = { ...ctx.input, x, y }
                let sample = this.eval(ctx);
                if (!isFinite(sample)) continue;
                min = Math.min(min, sample);
                max = Math.max(max, sample);
            }
            this.sampleRange = { min, max };
            Object.assign(ctx.input, currentInput);
        }
        return this.sampleRange;
    }
}

export class EvaluationSample {
    constructor(sampleData) {
        this.size = {
            x: sampleData.length,
            y: sampleData[0].length
        }
        this.data = sampleData;

    }

    getIterator() {
        return Array.from({ length: this.size.x * this.size.y }, (_, i) => {
            const [x, y] = [
                i % this.size.x,
                Math.floor(i / this.size.x)
            ]
            return [x, y, this.data[x][y]];
        })
    }
}

const defaultContext = {
    input: {
        x: 0,
        z: 0
    },
    scale: 1,
    blockList: [{ id: `minecraft:sponge` }, { id: `minecraft:stone` }]
}

class DNAFunction {
    constructor(strip, mapper) {
        this.genes = [];
        this.trees = [];
        this.placeholders = [];
        let i = 0;
        //console.log(`====\nSTRIP====\n${strip}\n`);

        while (i < strip.length) {
            if (placeholderLetters.includes(strip[i])) {
                if (typeof mapper === 'function') this.genes.push(mapper(Strip.parseInt(strip.slice(i, i + 4), placeholderLetters)));
                else this.genes.push(new Gene());
                i += 4;
                continue;
            }
            const length = 4 * (Strip.parseInt(strip[i]) + 1);

            if (i + length > strip.length) break;
            const geneStrip = strip.slice(i, i + length);
            //console.log(`Gene at ${i}: ${gene}, with length ${length}`)
            const gene = new Gene(geneStrip);
            this.genes.push(gene);
            i += length;
        }
        this.nestGenes();

        this.context = {
            input: Object.fromEntries(inputEnum.map(k => [k, 0])),
            palettes: [],
            variables: [],
            fields: [],
            blockList: [],
            fill: (ctx, min, max, block) => 0
        }
    }
    calculate(context = this.context) {
        //this.nestGenes();
        this.trees.forEach(g => g.eval(context));
        context.variables = [];
    }
    nestGenes() {
        this.trees = [];
        for (const gene of this.genes) {

            const typeInfo = geneTypes[gene.type];
            const args = typeInfo.args ? this.popLast(typeInfo.args.length) : [];
            gene.degenerateness = (typeInfo.args?.length ?? args.length) - args.length;
            for (let i = 0; i < gene.degenerateness; i++) args.push(new Gene());

            args.forEach((g) => g.parent = gene);
            gene.args = args;
            gene.depth = args.length > 0 ? Math.max(...args.map(g => g.depth)) + 1 : 0;
            //const result = gene.eval(context);
            //if (log) console.log(`current args: ${args.length > 0 ? args.map(g => g.type).join(`, `) : `none`}, gene: ${gene.type}`)
            this.trees.push(gene);
        }
        return;
    }
    popLast(len) {
        const result = [];
        for (let i = 0; i < len; i++) {
            const element = this.trees.pop();
            if (typeof element !== `undefined`) result.push(element);
        }
        return result;
    }
    toStrip() {
        return sequenceStrip(this.toTemplate())
    }
    toTemplate() {
        return this.trees.map(g => g.toTemplate())
    }
    validate() {
        let encounters = new Set();
        const removeRecursion = (gene) => {
            if (encounters.has(gene)) {
                gene.type = `constant`;
                gene.data = 0;
            } else {
                encounters.add(gene);
                gene.args?.forEach(g => removeRecursion(g))
            }
        }
        this.trees.forEach(e => removeRecursion(e));
    }
}

class DNASequence {
    constructor(strip) {
        this.functions = [];
        let i = 0, currentStrip = '';
        //console.log(`====\nSTRIP====\n${strip}\n`);

        while (i < strip.length) {
            const length = 4 * (Strip.parseInt(strip[i]) + 1);
            if (i + length > strip.length) break;

            const type = typeEnum[Strip.parseInt(strip.slice(i + 1, i + 4))];
            currentStrip = currentStrip.concat(strip.slice(i, i + length));
            if (rootTypes.indexOf(type) !== -1) {
                this.functions.push(new DNAFunction(currentStrip))
                currentStrip = '';
            }

            i += length;
        }

        this.context = {
            input: {
                x: 0,
                z: 0,
                y: 0,
                scale: 1,
                color: 0
            },
            palettes: [],
            variables: [],
            fields: [],
            blockList: [],
            fill: (ctx, min, max, block) => 0
        }

    }
    calculate(context = this.context, log = false) {
        context.variables = [];
        for (const func of this.functions) {
            func.calculate(context, log);
        }
    }
    toStrip() {
        let currentStrip = ``;
        this.functions.forEach((f) => f.genes.forEach((g) => {
            const template = { type: g.type };
            if (g.data) template.data = g.data;
            currentStrip += generateStrip(template);
        }))
        return currentStrip;
    }
}

argTemplates.input = [
    ...universalTypes,
    {
        type: `input`,
        weight: 500
    },
    {
        type: `constant`,
        weight: 100
    },
    ...[`noise`, `sin`, `cos`, `tan`, `cot`].map(e => ({ type: e, weight: 15 }))
]
function generateTemplate(template, random, context = { sequence: [] }, depth = 0) {
    //template meta
    let prevWrapper = context.wrapper ?? {};
    context.wrapper = Object.assign({}, prevWrapper);
    let isWrapper = false;
    if (template.resetDepth) depth = 0;
    let prevDepth = context.maxDepth ?? 6;
    context.maxDepth = template.maxDepth ?? prevDepth;
    if (template.wrapper) {
        context.wrapper[template.id ?? `main`] = template.content;
        //context.relativeDepth = depth;
        isWrapper = true;
    }
    if (template.content) template = template.content;

    //template arrayfication
    //if (depth > 8) template = argTemplates.input;
    if (depth > context.maxDepth && template.type !== `constant`) template = [{ type: `input`, weight: 3 }, `constant`];
    if (Array.isArray(template)) template = template.flat(1024);
    else template = [template];

    //reviewing the template
    let prevTTs = context.typeTemplates ?? {};
    context.typeTemplates = Object.assign({}, prevTTs);
    template = template.flatMap((e) => {
        if (typeof e === `undefined`) return [...(context.wrapper.main ?? [])];
        else if (typeof e === `string`) e = { type: e };
        else if (typeof e === `object`) e = Object.assign({}, e)
        e.weight ??= (context.typeTemplates[e.type]?.weight ?? 1);
        e.depth_factor ??= (context.typeTemplates[e.type]?.depth_factor ?? 1)
        if (e.type) context.typeTemplates[e.type] = Object.assign({}, e);
        if (e.depth_factor) e.weight /= (Math.pow(e.depth_factor, depth));
        if (e.nowrap) e.weight = 0;
        return [e];
    })

    //reducing template
    while (Array.isArray(template)) {
        template = weightedPick(template, random.get()) ?? context.wrapper.main;
    }
    if (template instanceof TemplatePool) template = JSON.parse(JSON.stringify(template.weights));
    if (typeof template === `string`) template = { type: template };
    if (template.type === `input` && typeof template.data === `string`) template.data = Math.max(inputEnum.indexOf(template.data), 0);
    if (`placeholder` in template) return generateTemplate(typeof template.placeholder === `string` ? context.matrix.find(e => e.name === template.placeholder) : context.matrix[template.placeholder], random, context, depth + 1);
    //if (template.macro in macroTypes) return generateTemplate(macroTypes[template.macro].expand(template.args), random, seq, depth);
    let obj = { type: template.type };
    if (template.alias) obj.alias = template.alias
    const defaults = geneTypes[obj.type];
    const baseTemplate = context.typeTemplates[obj.type];

    //reducing arguments
    if (template.content) return generateTemplate(template, random, context, depth+1);
    if (!defaults) console.log(template);
    
    if (defaults.args) obj.args = Array.from(defaults.args, (_, i) => {
        let override = template.args?.[i] ?? ((baseTemplate?.args?.[i] ?? defaults.args.template?.[i]) ?? (context.wrapper[`main`] ?? argTemplates.default));
        if (typeof override === `string`) override = { type: override };
        if (typeof override === `undefined`) override = (context.wrapper.main ?? { type: `constant` });
        return generateTemplate(override, random, context, depth + 1);
    })

    //reducing data
    // const isValue = (obj) => {
    //     return (!Array.isArray(obj) || (typeof obj !== `object`) || (obj?.[obj?.length - 1] === `#VALUE`)) && obj;
    // }
    if (defaults.data) {
        if (!Array.isArray(template.data) && (template.data !== undefined)) obj.data = template.data; else {
            let override = template.data ?? defaults.data.options;//(baseTemplate?.data ?? defaults.data.options);

            if (defaults.data.provider) {
                obj.data = defaults.data.provider({ template, random, context });
            } else if (!override) {
                obj.data = dataTypes[defaults.data.type].provide(undefined, random)
            } else {
                if (override.options) override = override.options;
                let props = defaults.data.options?.map((f, i) => {
                    let option = override[i] ?? f;
                    // if (option?.[option?.length - 1] === `#PICK`) {
                    //     option.pop();
                    //     option = weightedPick(option.map(e => e.weight ? e : { value: e, weight: 1 }), random.get()).value;
                    // }
                    return option;
                })
                obj.data = dataTypes[defaults.data.type].provide(props, random);
            };
        }
    }

    //this assembler style thing that probably illustrates my decline
    context.wrapper = prevWrapper;
    context.typeTemplates = prevTTs;
    context.maxDepth = prevDepth;
    //context.relativeDepth = 0;

    defaults.process?.({ obj, random, context, depth });
    //if (obj.alias) delete obj.alias;
    return obj;
}
function generateStrip(template, ctx) {
    if (typeof template === `string`) return template;
    try {
        JSON.stringify(template)
    } catch (e) {
        console.log(template);
        throw e;
    }
    if (!ctx) ctx = {
        variables: []
    };
    if (template.alias) {
        console.log(`var: ${JSON.stringify(template)}, ctx: ${JSON.stringify(ctx)}`)
        if (template.type === `define`) ctx.vergriables.push(template.alias);
        else if (ctx.variables.indexOf(template.alias) !== -1 || template.data === undefined)
            template.data = ctx.variables.indexOf(template.alias)
    }

    const templateType = geneTypes[template.type];

    let result = ``;
    let length = 0;
    result += Strip.fromInt(typeEnum.indexOf(template.type), 3);
    if (template.data !== undefined) {
        const typeInfo = dataTypes[templateType.data.type];
        if (template.type === `input` && typeof template.data === `string`) template.data = Math.max(inputEnum.indexOf(template.data), 0);
        result += typeInfo.construct(template.data);
        length += typeInfo.size;
    }
    result = letters[length] + result;
    //console.log(`${` - `.repeat(depth)}template: ${JSON.stringify(template)}\nstrip: ${result}`)
    let argStrip = ``;
    for (let i = 0; i < template.args?.length; i++) argStrip = generateStrip(template.args[i] ?? {
        type: `constant`,
        data: 0
    }, ctx) + argStrip
    result = argStrip + result;

    return result;
}

function generateSequence(template, rand, context = {}) {
    let sequence = [];
    let definitions = [];
    for (const action of template) {
        for (let i = 0; i < (action.repeat ?? 1); i++) {
            if (!action.chance || (rand.get() <= action.chance)) {
                if (action.type === `define`) definitions.push(action);
                else sequence.push(action);
            }
        }
    }

    sequence = [...definitions, ...sequence]
    const result = [];
    context.sequence ??= result;
    context.variables = [];
    for (const func of sequence) result.push(generateTemplate(func, rand, context))
    return result;
}
function sequenceStrip(sequence) {
    let context = { variables: [] };
    return sequence.flat(Infinity).map(f => generateStrip(f, context)).join('');
}

function createContext() {
    return {
        input: {
            x: 0,
            y: 0
        },
        scale: 1,
        palettes: [`minecraft:sponge`]
    }
}

// console.log(new DNAFunction(`CAAAAATAGAAAAAAACAAAAATAAGAAAAAAAAAT`).calculate());
//console.log(dataTypes.float.parse(dataTypes.float.construct(0.43797767465002835)));
const testWeights = [
    {
        type: `constant`,
        weight: 1
    }
]
// const ctx = { range: { min: 0, max: 256 }, input: { x: 3, y: 4 }, canvas: document.getElementsByTagName("canvas")[0].getContext("2d") }
// const testRand = new Random(`t4rwwegwegGG=-efss`)
// //const template = generateTemplate({type: `fillPixel`, args: [{ type: `multiply`, args: [{ type: `constant`, data: [64] }, { type: `sin`, args: [{ type: `add`, args: [{type: `input`, data: [`x`]}, {type: `input`, data: [`y`]}]}] }] }]})
// const template = generateTemplate({ type: `fillPixel`, weight: 1 }, testRand)
// console.log(JSON.stringify(template));
// const strip = generateStrip(template, testRand)
// const func = new DNAFunction(strip);
// func.calculate(ctx, true)
// for (let y = 0; y < 128; y++) {
//     for (let x = 0; x < 128; x++) {
//         ctx.input.x = x * multiplier;
//         ctx.input.z = y * multiplier;
//         func.calculate(ctx);
//     }
// }
// console.log(strip)

//cool seeds
//t4t4tbbbrsdvwef44cvsdvwefwefss
//t4rg44cvsdvwefwefss
//t4rwwegwegGG=-efss
//wege43400_@#/SDVgGG=-efss
//wwethg_NOIsERE||||||0=-efss
//wwesd__lines-TRE|egf5/@#||0=-efss

const gts = {};
gts.x_input = [
    undefined,
    {
        type: `input`,
        weight: 100,
        depth_factor: 0.8,
        data: 0
    }
]
gts.y_input = [
    undefined,
    {
        type: `input`,
        weight: 100,
        depth_factor: 0.8,
        data: 1
    }
]
gts.naturalConst = [
    {
        type: `multiply`,
        args: [
            {
                type: `constant`,
                data: 256
            },
            [
                {
                    type: `constant`,
                    weight: 200
                },
                undefined
            ]
        ]
    }
]
export const GW = {
    wrapper: true,
    content: [
        {
            type: `constant`,
            weight: 50,
            depth_factor: 0.9
        },
        {
            type: `input`,
            weight: 50,
            depth_factor: 0.9
        },
        {
            type: `add`,
            weight: 25,
            depth_factor: 1.15
        },
        {
            type: `subtract`,
            weight: 25,
            depth_factor: 1.15
        },
        {
            type: `multiply`,
            weight: 25,
            depth_factor: 1.15
        },
        {
            type: `divide`,
            weight: 25,
            depth_factor: 1.15
        },
        {
            type: `power`,
            weight: 50,
            depth_factor: 1.15,
            args: [
                [
                    undefined,
                    {
                        type: `constant`,
                        data: 10,
                        weight: 100
                    },
                    {
                        type: `normalize`,
                        weight: 300
                    }
                ],
                [
                    undefined,
                    {
                        type: `multiply`,
                        args: [
                            {
                                type: `constant`,
                                data: -3
                            },
                            [
                                {
                                    type: `normalize`,
                                    weight: 10
                                },
                                {
                                    type: `constant`,
                                    weight: 30
                                }
                            ]
                        ],
                        weight: 100
                    }
                ]
            ]
        },
        {
            type: `mod`,
            weight: 50,
            depth_factor: 1.1
        },
        {
            type: `abs`,
            weight: 50,
            depth_factor: 1
        },
        {
            type: `floor`,
            weight: 50,
            depth_factor: 1
        },
        {
            type: `sin`,
            weight: 50,
            depth_factor: 1
        },
        {
            type: `cos`,
            weight: 50,
            depth_factor: 1
        },
        {
            type: `tan`,
            weight: 50,
            depth_factor: 1
        },
        {
            type: `cot`,
            weight: 50,
            depth_factor: 1
        },
        {
            type: `noise`,
            weight: 100,
            depth_factor: 1.1,
            args: [
                gts.x_input,
                gts.y_input,
                [
                    undefined,
                    {
                        type: `power`,
                        weight: 500,
                        args: [
                            [
                                {
                                    type: `constant`,
                                    data: 10,
                                    weight: 10
                                },
                                {
                                    type: `normalize`,
                                    weight: 3
                                }
                            ],
                            {
                                type: `multiply`,
                                args: [
                                    {
                                        type: `constant`,
                                        data: -3
                                    },
                                    [
                                        {
                                            type: `normalize`,
                                            weight: 10
                                        },
                                        {
                                            type: `constant`,
                                            weight: 30
                                        }
                                    ]
                                ]
                            }
                        ]
                    }
                ],
                [
                    undefined,
                    {
                        type: `power`,
                        weight: 300,
                        args: [
                            [
                                {
                                    type: `constant`,
                                    data: 10,
                                    weight: 10
                                },
                                {
                                    type: `normalize`,
                                    weight: 3
                                }
                            ],
                            {
                                type: `multiply`,
                                args: [
                                    {
                                        type: `constant`,
                                        data: -3
                                    },
                                    [
                                        {
                                            type: `normalize`,
                                            weight: 10
                                        },
                                        {
                                            type: `constant`,
                                            weight: 30
                                        }
                                    ]
                                ]
                            }
                        ]
                    }
                ],
                [
                    undefined,
                    {
                        type: `multiply`,
                        weight: 200,
                        args: [
                            {
                                type: `constant`
                            },
                            {
                                type: `constant`,
                                data: 10
                            }
                        ]
                    }
                ]
            ]
        },
        {
            type: `random`,
            weight: 50,
            depth_factor: 0.95
        },
        {
            type: `sponge`,
            weight: 0,
            args: [
                gts.x_input,
                gts.y_input,
                gts.naturalConst
            ]
        },
        {
            type: `normalize`,
            weight: 10
        }
    ]
}
argTemplates.heightmap = {
    wrapper: true,
    content: [
        // ...argTemplates.basic,
        // ...argTemplates.default,
        {
            type: `noise`,
            args: [
                TGN.scaledInput(`x`, 0.01),
                TGN.scaledInput(`z`, 0.01),
                { type: `constant`, data: [0.001, 10] },
                { type: `constant`, data: [0.5, 2] },
                { type: `constant`, data: [1, 4] }
            ],
            weight: 2
        },
        // TGN.ofWeight(TGN.var(`x'`), 3),
        // TGN.ofWeight(TGN.var(`z'`), 3)
        ...universalTypes,
        TGN.addProps(TGN.scale(TGN.input([0, 2]), 0.01), { weight: 3, depth_factor: 0.84 }),

    ]
}


//possibly should make a list of presets with a hight chance
//to be added/multiplied with more randomized genes
argTemplates.presets = [
    {
        type: `noise`,
        args: [
            { type: `input`, data: 0 },
            { type: `input`, data: 1 },
            { type: `constant`, data: [3, 10] },
            { type: `constant`, data: [0.5, 2] },
            { type: `constant` }
        ],
        weight: 1
    }
]

export const DIM_SEQ_TEMPLATE = [{
    type: `mask`,
    args: [
        TGN.const(0),
        //TGN.const(128),
        {
            type: `multiply`,
            args: [
                TGN.const(128),
                {
                    type: `cos`,
                    args: [
                        {
                            type: `multiply`,
                            args: [
                                TGN.const(0.1),
                                {
                                    type: `input`,
                                    data: 0
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            type: `palette`,
            args: [
                TGN.def(`paletteSize`, TGN.const(4)),
                TGN.const(1),
                TGN.const(1)
            ]
        },
        TGN.const(1)
    ]
}]

const typeColorUnits = typeEnum.map(type => {
    let rand = new Random(cyrb128(`${type}_shift`));
    let vec = Object.fromEntries([`x`, `y`, `z`].map((a) => {
        let r = 0;
        for (let i = 0; i < 8; i++) r += rand.get();
        return [a, r / 4 - 1]
    }))
    return VMath.normalize(vec);
})
export function getStripCoefficients(strip) {
    const func = new DNAFunction(strip);
    let result = [];
    for (let i = 0; i < typeEnum.length; i++) {
        result.push(func.genes.filter(g => g.type === typeEnum[i]).length);
    }
    return result;
}
export function getStripCoords(strip) {
    let coefficients = getStripCoefficients(strip);
    let coords = { x: 0, y: 0, z: 0 };
    for (let i = 0; i < typeEnum.length; i++) coords = VMath.add(coords, VMath.scale(typeColorUnits[i], Math.sin(coefficients[i] * Math.PI / 8)));
    //[`x`, `y`, `z`].forEach(a => coords[a] = Math.sin(coords[a]));
    return coords;
}
export function getStripColor(strip) {
    let coords = getStripCoords(strip);
    let [h, s, v] = [coords.x % 1 + 1 * (coords.x < 0), Math.abs(Math.sin(coords.y * Math.PI / 2)), Math.abs(Math.sin(coords.z * Math.PI / 2))];
    let result = Color.toRGB({ h, s, v });
    return result;
}

// export const test_matrix = [
//     {
//         entries: universalTypes.map(t => {
//             const info = geneTypes[t];
//             let result = ``;
//             result += `XXXX`.repeat(info.args?.length??0);
//             let data = dataTypes[info.data?.type];
//             result += letters[data?.size ?? 0];
//             result += Strip.fromInt(typeEnum.indexOf(t), 3);
//             if (data) result += data.options?.map(o => Strip.fromInt(0, 4, placeholderLetters));
//             let obj = {strip: result, weight: 1};
//             if (inputTypes.includes(t)) obj.depth_multiplier = 2;
//             return obj;
//         }),
//     }
// ];
// export class TemplateMatrix {
//     constructor(entries, random) {
//         this.entries = entries;
//         this.random = random;
//     }
//     reduce(v, depth=0) {
//         let template = this.entries[v];
//         if (template.resetDepth) depth=0;
//         let options = template.entries.map(e => ({...e, weight: e.weight * Math.pow(e.depth_multiplier ?? 1, depth) + (e.depth_increment ?? 0)*depth}))
//         let strip = weightedPick(options, this.random.get()).strip;
//         let result = ``;
//         for (let i = 0; i < strip.length; i+=4) {
//             if (placeholderLetters.includes(strip[i])) {
//                 let value = Strip.parseInt(strip.slice(i, i+4), placeholderLetters);
//                 result+=this.reduce(value, depth+1);
//             } else result+=strip.slice(i, i+4);
//         }
//         return result;
//     }
// }

export { DNAFunction, DNASequence, generateStrip, generateTemplate, generateSequence, sequenceStrip, argTemplates, createContext };