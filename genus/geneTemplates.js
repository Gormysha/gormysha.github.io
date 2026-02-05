import { argTemplates, TGN } from "../gene.js";

export const templateRegistry = {};
export const templateGenerators = {};

const coordinateInputRange = [0, 2];
export const INPUT = templateRegistry.planar_input = {
    type: `multiply`,
    args: [
        {
            type: `input`,
            data: coordinateInputRange
        },
        {
            type: `define`,
            alias: `input_scaling`,
            args: [
                {
                    type: `constant`,
                    data: 0.01
                }
            ]
        }
    ]
}
INPUT.with = (data) => JSON.parse(JSON.stringify(INPUT).replace(JSON.stringify(coordinateInputRange), data));

templateGenerators.sum = (template, adder={}, phaser = Math.PI * 2, appendix=[]) => ({
    wrapper: true,
    resetDepth: true,
    content: [
        {
            type: `multiply`,
            args: [
                TGN.wrap(template, {
                    type: `add`,
                    args: [
                        {
                            type: `add`,
                            args: [
                                {
                                    type: `multiply`,
                                    args: [
                                        INPUT.with(0),
                                        [
                                            {
                                                type: `constant`
                                            },
                                            {
                                                type: `constant`,
                                                data: 0
                                            }
                                        ]
                                    ]
                                },
                                {
                                    type: `multiply`,
                                    args: [
                                        INPUT.with(1),
                                        [
                                            {
                                                type: `constant`
                                            },
                                            {
                                                type: `constant`,
                                                data: 0
                                            }
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            type: `constant`,
                            data: Array.isArray(phaser) ? phaser : [0, phaser]
                        }
                    ]
                }),
                [
                    {
                        type: `constant`,
                        data: [-0.5, 0.5],
                        weight: 10
                    },
                    {
                        type: `constant`,
                        data: 0,
                        weight: 2,
                        depth_factor: 0.6
                    }
                ]
            ],
            weight: 1,
            depth_factor: 0.6
        },
        {
            type: `add`, //generates the terms
            weight: 10,
            depth_factor: 1.7,
            ...adder
        },
        ...appendix
    ]
})
templateRegistry.trig_sum = {
    wrapper: true,
    resetDepth: true,
    content: [
        {
            type: `multiply`,
            args: [
                {
                    type: `sin`,
                    args: [
                        {
                            type: `add`,
                            args: [
                                {
                                    type: `add`,
                                    args: [
                                        {
                                            type: `multiply`,
                                            args: [
                                                INPUT.with(0),
                                                [
                                                    {
                                                        type: `constant`
                                                    },
                                                    {
                                                        type: `constant`,
                                                        data: 0
                                                    }
                                                ]
                                            ]
                                        },
                                        {
                                            type: `multiply`,
                                            args: [
                                                INPUT.with(1),
                                                [
                                                    {
                                                        type: `constant`
                                                    },
                                                    {
                                                        type: `constant`,
                                                        data: 0
                                                    }
                                                ]
                                            ]
                                        }
                                    ]
                                },
                                {
                                    type: `constant`,
                                    data: [0, Math.PI * 2]
                                }
                            ]
                        }
                    ]
                },
                [
                    {
                        type: `constant`,
                        data: [0, 1],
                        weight: 10
                    },
                    {
                        type: `constant`,
                        data: 0,
                        weight: 2,
                        depth_factor: 0.6
                    }
                ]
            ],
            weight: 1,
            depth_factor: 0.6
        },
        {
            type: `add`,
            weight: 10,
            depth_factor: 1.7
        }
    ]
}
templateRegistry.average = {
    wrapper: true,
    resetDepth: true,
    content: [
        {
            type: `multiply`,
            weight: 10,
            depth_factor: 1.7
        },
        {
            ...templateRegistry.planar_input,
            weight: 1,
            depth_factor: 0.6
        },
        {
            type: `add`,
            weight: 10,
            depth_factor: 1.7
        },
        {
            type: `constant`,
            weight: 1,
            depth_factor: 0.6
        },
        ...[`sin`, `cos`, `tan`, `cot`, `floor`, `abs`].map(t => ({
            type: t,
            weight: 5,
            depth_factor: 0.85
        })),
        {
            type: `mod`,
            weight: 3,
            depth_factor: 0.9
        },
        {...templateRegistry.trig_sum, weight: 3}
    ]
}