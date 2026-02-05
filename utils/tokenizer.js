export const defaultOperators = { '+': 11, '-': 11, '*': 12, '/': 12, '==': 8, '^': 13, '&&': 4, '||': 3, '[]': 15, '>': 9, '<':9, '>=': 9, '<=': 9 };
export const defaultFunctions = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '^': (a, b) => a ** b,
    '==': (a, b) => a === b,
    '>': (a, b) => a > b,
    '<': (a, b) => a < b,
    '>=': (a, b) => a >= b,
    '<=': (a, b) => a <= b
}
export const vectorFunctions = {
    '+': toComponentWise(defaultFunctions['+']),
    '-': toComponentWise(defaultFunctions['-']),
    '*': (a, b) => {
        if (a.length === 1 || b.length === 1) {
            let e = [a, b].find(t => t.length === 1);
            for (let i = 1; i < Math.max(a.length, b.length); i++) e[i] = e[0];
        }
        return toComponentWise(defaultFunctions['*'])(a, b);
    },
    '/': (a, b) => {
        if (b.length === 1) b = Array.from(a, (_, i) => b);
        return toComponentWise(defaultFunctions['/'])(a, b);
    },
    '^': toComponentWise(defaultFunctions['^']),
    '[]': (a, b) => Array.isArray(a) ? a[b] : a,
    'dot': (a, b) => vectorFunctions['*'](a, b).reduce((prev, curr) => prev + curr, 0)
}

function toComponentWise(srcFunc) {
    let targetFunc = (...args) => Array.from({
        length: Math.max(...args.map(a => a.length))
    }, (_, i) => srcFunc(...args.map(a => a[i] ?? 0)));
    Object.defineProperty(targetFunc, "length", { value: srcFunc.length });
    return targetFunc;
}

export class ExpressionParser {
    constructor(operators = { ...defaultOperators }, functions = { ...defaultFunctions }) {
        this.operators = operators;
        this.functions = functions;
    }

    parse(expStr) {
        if (typeof expStr !== 'string') return;
        expStr = expStr.trim();
        const tokens = [];
        const operators = this.operators;
        const stack = [];
        const [isOpening, isClosing] = [/[\(\[]/, /[\)\]]/]
        for (let i = 0; i < expStr.length; i++) {
            const c = expStr[i];
            if (/\d/.test(c) || c === '.') {
                let j = i + 1;
                while (/\d/.test(expStr[j]) && j < expStr.length || expStr[j] === '.') j++;
                tokens.push(parseFloat(expStr.slice(i, j)));
                i = j - 1;
            }
            else if (/[a-z]/i.test(c)) {
                let j = i + 1;
                while (!Object.keys(operators).concat([`(`, `)`]).find(e => e.startsWith(expStr[j])) && j < expStr.length) j++;
                let k;
                let identifier = expStr.slice(i, j);
                if (expStr[j] === `(`) {
                    k = j + 1;
                    let depth = 0;
                    const args = [];
                    let sliceStart = k;
                    while (expStr[k] !== ')' || depth > 0) {
                        if (isOpening.test(expStr[k])) depth++;
                        else if (isClosing.test(expStr[k])) depth--;
                        if (k >= expStr.length) return undefined;
                        if (expStr[k] === ',' && depth===0) {
                            args.push(expStr.slice(sliceStart, k));
                            sliceStart=k+1;
                        }
                        k++;
                    };
                    args.push(expStr.slice(sliceStart, k));
                    args.forEach(e => tokens.push(...this.parse(e)));

                } else if (expStr[j] === `[`) {
                    k = i + 1;
                    while (expStr[k] !== ']' && k < expStr.length) k++;
                    tokens.push(...this.parse(expStr.slice(j + 1, k)), identifier);
                    identifier = '[]';
                    i = k;
                } else k = j - 1;
                tokens.push(identifier);
                i = k;
            }
            else if (c === '(') stack.push(c);
            else if (c === ')') {
                while (stack.at(-1) !== '(') {
                    if (stack.length > 0) tokens.push(stack.pop());
                    else return undefined;
                }
                stack.pop();
            } else if (c === '[') {
                let k = i + 1;
                let depth = 0;
                while (expStr[k] !== ']' || depth > 0) {
                    if (isOpening.test(expStr[k])) depth++;
                    else if (isClosing.test(expStr[k])) depth--;
                    if (k >= expStr.length) return undefined;
                    k++;
                };
                const components = expStr.slice(i + 1, k).split(`,`).map(e => this.parse(e));
                tokens.push(components);
                i = k;
            }

            else {
                let op;
                for (let j = 2; j > 0; j--) if ((op = expStr.substr(i, j)) in operators) break; else op = false;
                if (!op) continue;
                while (stack.at(-1) in operators && (operators[stack.at(-1)] > operators[op] || (operators[stack.at(-1)] === operators[op] && op !== '^'))) tokens.push(stack.pop());
                stack.push(op);
            }
        }
        while (stack.length > 0) tokens.push(stack.pop());
        return tokens;
    }

    evaluate(expression, variables) {
        let stack = [0];
        if (typeof variables !== `object`) variables = {}
        const functions = this.functions;
        for (const token of expression) {
            if (token in variables) stack.push(variables[token]);
            else if (typeof token === `number`) stack.push(token);
            else if (Array.isArray(token)) stack.push(token.map(e => this.evaluate(e, variables)));
            else if (token in functions) {
                const func = functions[token] ?? ((a) => a);
                const args = Array.from(func, () => stack.pop()).reverse();
                stack.push(func(...args));
            }
        }
        return stack.pop();
    }

    //too much of hardcoded stuff here
    applyFunc(token, ...args) {
        let func = this.functions[token];
        if (token === `[]`) return func(...args);
        args = args.map(e => Array.isArray(e) ? e : [e]);
        if (token === `*`) args = args.map((e, _, arr) => {
            if (e.length === 1) for (let i = 1; i < Math.max(...arr.map(a => a.length)); i++) e[i] = e[0];
            //for scalars to work properly
        })
        return Array.from({ length: Math.max(...args.map(e => e.length)) }, (_, i) => func(...args.map(e => e[i] ?? 0)));

    }
}