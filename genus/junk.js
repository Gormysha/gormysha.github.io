import { argTemplates, TGN } from "../gene.js";
import { Triplet } from "../utils/triplet.js";
import { templateRegistry } from "./geneTemplates.js";

// export const junkTemplate = [
//         {
//             type: `mask`,
//             args: [
//                 TGN.const(0),
//                 {
//                     type: `multiply`,
//                     args: [
//                         argTemplates.heightmap,
//                         //{strip: mat.reduce(0) },
//                         {
//                             type: `constant`,
//                             data: 64
//                         }
//                     ]
//                 },
//                 {
//                     type: `palette`,
//                     args: [
//                         TGN.def(`paletteSize`, {
//                             type: `constant`,
//                             data: [2, 6]
//                         }),
//                         {
//                             type: `triplet_distance`,
//                             args: [
//                                 {
//                                     type: `constant`,
//                                     data: new Triplet([
//                                         Math.floor(Math.random()*255),
//                                         Math.floor(Math.random()*255),
//                                         Math.floor(Math.random()*255)
//                                     ]).value
//                                 },
//                                 {
//                                     type: `input`,
//                                     data: 4
//                                 }
//                             ]
//                         },
//                         //{wrapper: true, content: [`input`, argTemplates.basic.map(e => e.type === `input` ? {...e, data: [3, 4], weight: 2} : e)]},
//                         TGN.const(1)
//                     ]
//                 },
//                 {
//                     type: `add`,
//                     args: [
//                         {
//                             type: `multiply`,
//                             args: [
//                                 argTemplates.heightmap,
//                                 TGN.var(`paletteSize`)
//                             ]
//                         },
//                         TGN.const(1)
//                     ]
//                 }
//             ]
//         }
//     ]
export const junkTemplate = [
    {
        type: `mask`,
        args: [
            TGN.const(0),
            {
                type: `add`,
                args: [
                    {
                        type: `constant`,
                        data: [20, 140]
                    },
                    {
                        type: `multiply`,
                        args: [
                            templateRegistry.average,
                            {
                                type: `constant`,
                                data: [10, 70]
                            }
                        ]
                    }
                ]
            },
            {
                type: `palette`,
                args: [
                    TGN.def(`paletteSize`, {
                        type: `constant`,
                        data: [2, 6]
                    }),
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
                            }
                        ]
                    },
                    TGN.const(1)
                ]
            },
            {
                type: `abs`,
                args: [
                    templateRegistry.average
                ]
            }
        ]
    }
]