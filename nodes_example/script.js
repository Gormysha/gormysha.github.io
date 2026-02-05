import { templateRegistry } from "./genus/geneTemplates.js";
import { argTemplates, DNAFunction, generateSequence, generateTemplate, TGN } from "./gene.js";
import { geneTypes, typeCategories } from "./genus/geneTypes.js";
import { NodeEditor, NodeRegistry, numberInputField } from "./package/nodes.js";
import { Random } from "./random.js";
import { previewTarget } from "./terrain.js";

let namespace = `test`;
let reg = new NodeRegistry(namespace);
reg.registerNodes(Object.fromEntries(Object.entries(typeCategories).flatMap(([category, types]) => types.map(type => {
    let rand = new Random(category)
    let typeInfo = geneTypes[type];
    let elements = {
        output: {
            type: `template`,
            flow: `output`,
            label: `Output`,
            eval: (node) => {
                let result = { type };
                if (typeInfo.data) result.data = node.elements.data.getValue();
                if (typeInfo.args) result.args = Object.entries(node.elements).filter(e => e[0].startsWith(`arg`)).map(e => e[1].getValue());
                return result;
            }
        }
    };
    if (typeInfo.args) Array.from(typeInfo.args).forEach((e, i) => elements[`arg${i}`] = {
        type: `template`,
        flow: `input`,
        label: typeInfo.argNames?.[i] ?? (typeInfo.args.length > 1 ? `Argument ${i + 1}` : `Argument`)
    })
    if (typeInfo.data) elements.data = {
        type: typeInfo.data.type,
        label: `Data`,
        eval: (node) => parseFloat(node.elements.data.value)
    }
    return [type, {
        name: type[0].toUpperCase() + type.slice(1).split(`_`).join(` `),
        category: `Gene templates/${category}`,
        color: `#${Array.from({ length: 3 }, (_) => Math.floor(rand.get() * 256).toString(16).padStart(2, '0')).join('')}`,
        elements
    }]
}))))
reg.registerNodes({
    log: {
        name: 'Log',
        category: 'Miscellaneous/Standard',
        color: '#BB0000',
        elements: {
            input: {
                type: 'float',
                flow: 'input',
                label: 'Value',
                driver_only: true
            }
        },
        events: {
            update: (node) => {
                console.log(node.elements.input.getValue())
            }
        }
    }
})
reg.registerTypes({
    float: {
        name: 'Float',
        field: {
            create: numberInputField,
            options: {
                step: 0.01
            }
        },

        color: '#a1a1a1'
    },
    byte: {
        name: 'Byte',
        field: {
            create: numberInputField
        },

        color: '#584f5e'
    },
    template: {
        name: 'Template',
        color: '#00BB00'
    },
    sequence: {
        name: 'Sequence',
        color: '#628062',
        collection: true
    }
})
reg.registerTargets({
    previewTarget
})

function copyObj(obj) {
    if (typeof obj !== `object`) return obj;
    return Object.fromEntries(Object.entries(obj).map(([k, v]) =>
        [k, typeof v === `object` ? (Array.isArray(v) ? v.map(e => copyObj(e)) : copyObj(v)) : v]
    ))
}
let [layerOffset, nodeOffset] = [400, 300];
let counter = 0;
function templateToNodes(template) {
    const result = {};
    template = copyObj(template);

    let [width, height] = [0, 0];
    let [minY, maxY] = [0, 0];
    const move = (node, y) => {
        node.y += y;
        node.maxY += y;
        node.minY += y;


        for (let arg of node.args ?? []) move(arg, y);
    }
    const process = (obj, depth = 0) => {
        width = Math.max(width, depth * layerOffset);
        obj.y = (obj.idx ?? 0) * nodeOffset;
        obj.x = -depth * layerOffset
        if (!obj.args) return;
        let childrenHeight = obj.childrenHeight = (obj.args.length - 1) * nodeOffset;
        obj.args.forEach((e, i) => {
            e.idx = i;
            e.parent = obj;
            process(e, depth + 1);
            //if (obj.args.length > 1) move(e, (i / (obj.length - 1) - 0.5) * childrenHeight);
        });
        //obj.y = (obj.args[0].y + obj.args.at(-1).y)/2;
    }
    process(template);

    const resolve = (obj, depth = 0) => {
        if (!obj.args) {
            obj.minY = obj.maxY = obj.y;
            return;
        };
        obj.args.forEach((e, i, arr) => {
            resolve(e, depth + 1);

            if (i === 0) return;
            let [a, b] = [obj.args[i - 1], e];
            if (a.maxY > b.minY) {
                let diff = b.minY - a.maxY
                arr.slice(0, i).forEach(n => move(n, diff));
            }
        })

        //for (let child of obj.args) move(child, obj.y - totalHeight / 2 - obj.args[0].minY);
        obj.minY = obj.args[0].minY;
        obj.maxY = obj.args.at(-1).maxY;
        obj.y = (obj.minY + obj.maxY) / 2;
        minY = Math.min(minY, obj.minY);
        maxY = Math.max(maxY, obj.maxY);
    }
    resolve(template);

    height = maxY - minY;
    const add = (obj) => {
        let id = (counter++).toString();
        let elements = {
            ...Object.fromEntries((obj.args ?? []).map((e, i) => [`arg${i}`, {
                value: 0,
                drivers: [
                    [
                        add(e),
                        `output`
                    ]
                ]
            }]))
        };
        elements[`output`] = {
            "value": 0,
            "drivers": []
        }
        if (`data` in obj) elements.data = {
            value: obj.data,
            drivers: []
        };

        result[id] = {
            type: `${namespace}:${obj.type}`,
            uuid: id,
            pos: {
                x: obj.x + width / 2,
                y: obj.y + height / 2
            },
            elements
        }
        return id;
    }
    add(template);

    // result.height = height;
    // result.width = width;
    return result;
}
function sequenceToNodegroup(sequence) {
    let nodes = sequence.map((n) => templateToNodes(n));
    let heights = nodes.map((node) => Object.values(node).reduce((rec, n, i, arr) => {
        rec.min = Math.min(rec.min, n.pos.y);
        rec.max = Math.max(rec.min, n.pos.y);
        if (!rec.root) rec.root = n;
        rec.root = n.pos.x > rec.root.pos.x ? n : rec.root;
        return rec;
    }, { min: -nodeOffset / 2, max: nodeOffset / 2 }));
    let totalHeight = heights.reduce((p, c) => p + c.max - c.min, 0);
    nodes.reduce((carry, e, i) => {
        Object.values(e).forEach(n => n.pos.y += -heights[i].min + carry);
        return carry + heights[i].max - heights[i].min;
    }, -totalHeight / 2);
    const group = {
        nodes: {
            group_output: {
                type: `_group_output`,
                uuid: `group_output`,
                pos: {
                    y: 0,
                    x: Math.max(...heights.map(h => h.root.pos.x)) + layerOffset
                },
                elements: {
                    "Sequence": {
                        "value": 0,
                        "drivers": heights.map(n => [n.root.uuid, `output`])
                    }
                }
            },
            ...Object.fromEntries(nodes.reduce((prev, curr) => prev.concat(Object.entries(curr)), []))
        },
        sockets: {
            "entries": {
                "Sequence": {
                    "flow": "output",
                    "type": `${namespace}:sequence`,
                    "target": `${namespace}:previewTarget`
                }
            },
            "selected": "Sequence"
        }
    }
    return group;
}


const nodeEditor = new NodeEditor(document.getElementById('df_editor'), reg);

const defaultSeq = [{
    type: `mask`,
    args: [
        TGN.const(0),
        {
            type: `multiply`,
            args: [
                {
                    type: `constant`,
                    data: [1, 32]
                },
                argTemplates.heightmap
            ]
        },
        {
            type: `palette`,
            args: [
                {
                    type: `constant`,
                    data: [1, 10]
                },
                {
                    wrapper: true, resetDepth: true, content: [
                        {
                            type: `multiply`,
                            args: [
                                TGN.const(-1),
                                undefined
                            ],
                            weight: 20,
                            depth_factor: 100
                        },
                        {
                            type: `triplet_distance`,
                            args: [
                                {
                                    type: `triplet`,
                                    args: [
                                        `constant`,
                                        `constant`,
                                        `constant`
                                    ]
                                },
                                {
                                    type: `input`,
                                    data: 4
                                }
                            ],
                            weight: 30,
                            depth_factor: 3
                        },
                        {
                            ...templateRegistry.average,
                            weight: 10,
                            depth_factor: 3
                        },
                        argTemplates.heightmap
                    ]
                },
                TGN.const(1)
            ]
        },
        {
            type: `abs`,
            args: argTemplates.heightmap
        }
    ]
}];
nodeEditor.toolbarContent.push({
    type: 'button',
    title: `Generate`,
    action: () => {
        nodeEditor.openModal('', [
            {
                type: `checkbox`,
                label: `Generate random`,
                value: true,
                conditions: [
                    [
                        true,
                        { type: `text`, label: `Seed` }
                    ],
                    [
                        false,
                        { type: `text`, label: `Strip` }
                    ]
                ]
            },
            { type: `text`, label: `Nodegroup name`, value: `Template` }
        ], (result) => {
            let file = JSON.parse(JSON.stringify(nodeEditor.exportFile()));
            let [isRandom, seed, nodegroup] = result;
            const rand = new Random(seed);
            let temp;
            if (isRandom) temp = generateSequence(defaultSeq, rand, { maxDepth: 4 });
            else temp = new DNAFunction(seed).toTemplate();
            //console.log(temp);
            let nodes = sequenceToNodegroup(temp)
            file.nodeGroups.entries[nodegroup] = nodes
            //console.log(nodes);
            nodeEditor.importFile(file, false);
        })
        // let file = JSON.parse(JSON.stringify(nodeEditor.exportFile()));
        // const rand = new Random(`test`);
        // let temp_generated = generateSequence(defaultSeq, rand);
        // //let temp = new DNAFunction(`CAAATAAGAGAAGTGAATCGCAAATAAAAAAAAAAATAAGAAAACAAAACGCCCAGGGCTAATGAATACAAATAAAAAAAAAAATAATAAACTAATAAACAAGCAAGATAAGAAAAATGTCAAATAGAAAAAAAAATAATAAATAATGCAAAAAAAAAAAAAAAATCA`)
        // //    .toTemplate()
        // let temp = temp_generated;
        // console.log(temp);
        // let nodes = sequenceToNodegroup(temp)
        // file.nodeGroups.entries.testGroup = nodes
        // console.log(nodes);
        // nodeEditor.importFile(file, false);
    }
})
nodeEditor.updateToolbar();
nodeEditor.nodeGroupTemplate = sequenceToNodegroup([{
    type: `mask`,
    args: [
        {
            type: `constant`,
            data: 0
        },
        {
            type: `constant`,
            data: 1
        },
        {
            type: `palette`,
            args: [
                {
                    type: `constant`,
                    data: 1
                },
                {
                    type: `constant`,
                    data: 1
                },
                {
                    type: `constant`,
                    data: 1
                }
            ]
        },
        {
            type: `constant`,
            data: 0
        }
    ]
}])