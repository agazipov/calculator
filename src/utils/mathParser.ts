export interface Operation {
    symbol: string;
    precedence: number;
    evaluate(stack: number[]): number[];
}

export class ExpressionEvaluator {
    private static instance: ExpressionEvaluator;
    private operations: { [key: string]: Operation };

    private constructor() {
        this.operations = {
            '+': {
                symbol: '+',
                precedence: 1,
                evaluate: (stack) => {
                    let b = stack.pop() ?? 0;
                    let a = stack.pop() ?? 0;
                    stack.push(a + b);
                    return stack;
                }
            },
            '-': {
                symbol: '-',
                precedence: 1,
                evaluate: (stack) => {
                    let b = stack.pop() ?? 0;
                    let a = stack.pop() ?? 0;
                    stack.push(a - b);
                    return stack;
                }
            },
            '*': {
                symbol: '*',
                precedence: 2,
                evaluate: (stack) => {
                    let b = stack.pop() ?? 0;
                    let a = stack.pop() ?? 0;
                    stack.push(a * b);
                    return stack;
                }

            },
            '/': {
                symbol: '/',
                precedence: 2,
                evaluate: (stack) => {
                    let b = stack.pop() ?? 0;
                    let a = stack.pop() ?? 0;
                    if (b === 0) throw new Error('Division by zero');
                    stack.push(a / b);
                    return stack;
                }
            },
        };
    }

    public static getInstance(): ExpressionEvaluator {
        if (!ExpressionEvaluator.instance) {
            ExpressionEvaluator.instance = new ExpressionEvaluator();
        }
        return ExpressionEvaluator.instance;
    }

    public registerOperation(operation: Operation) {
        this.operations[operation.symbol] = operation;
    }

    private isOperator(c: string): boolean {
        return c in this.operations;
    }

    private replaceSymbol(expression: string): string {
        return expression.replace(/,/g, '.').replace(/×/g, '*');
    }

    private duplicationChek(expression: string): string {
        for (let i = 0; i < expression.length - 1; i++) {
            if (this.isOperator(expression[i]) && this.isOperator(expression[i + 1])) {
                throw new Error('Duplicate operators');
            }
        }
        return expression;
    }

    private infixToPostfix(expression: string): string[] {
        if (!expression.trim()) {
            throw new Error('Expression is empty');
        }

        let output: string[] = [];
        let operators: string[] = [];
        let bracketCount = 0;

        for (let i = 0; i < expression.length; i++) {
            let c = expression[i];

            if (/\d/.test(c) || c === '.') {
                let num = c;
                while (i + 1 < expression.length && (/\d/.test(expression[i + 1]) || expression[i + 1] === '.')) {
                    num += expression[++i];
                }
                output.push(num);
            } else if (c === '(') {
                bracketCount++;
                if (!this.isOperator(expression[i - 1]) && i !== 0) {
                    operators.push('*');
                }
                operators.push(c);
            } else if (c === ')') {
                bracketCount--;
                if (bracketCount < 0) {
                    throw new Error('SyntaxError');
                }
                while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                    output.push(operators.pop() ?? '');
                }
                operators.pop();
            } else if (this.isOperator(c)) {
                if (c === '-' && (i === 0 || expression[i - 1] === '(') || this.isOperator(expression[i - 1])) {
                    output.push('0');
                }
                while (operators.length > 0 && operators[operators.length - 1] !== '(' && this.operations[operators[operators.length - 1]].precedence >= this.operations[c].precedence) {
                    output.push(operators.pop() ?? '');
                }
                operators.push(c);
            } else {
                throw new Error('Unknown operation');
            }
        }

        if (bracketCount !== 0) {
            throw new Error('SyntaxError');
        }

        while (operators.length > 0) {
            output.push(operators.pop() ?? '');
        }

        return output;
    }

    private evaluatePostfix(postfix: string[]): number {
        let stack: number[] = [];
        for (let token of postfix) {
            if (!isNaN(parseFloat(token))) {
                stack.push(parseFloat(token));
            } else {
                let operation = this.operations[token];
                operation.evaluate(stack);
            }
        }

        return stack.pop() ?? 0;
    }

    public evaluateExpression(expression: string): number {
        expression = this.replaceSymbol(expression);
        expression = this.duplicationChek(expression);
        let postfix = this.infixToPostfix(expression);
        return this.evaluatePostfix(postfix);
    }
}
