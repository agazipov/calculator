export class ExpressionEvaluator {
    precedence: { [key: string]: number };

    constructor() {
        this.precedence = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2,
        };
    }

    isOperator(c: string): boolean {
        return c in this.precedence;
    }

    replaceSymbol(expression: string): string {
        return expression.replace(/,/g, '.').replace(/×/g, '*');
    }

    infixToPostfix(expression: string): string[] {
        if (!expression.trim()) {
            throw new Error("Expression is empty");
        }

        let output: string[] = [];
        let operators: string[] = [];

        for (let i = 0; i < expression.length; i++) {
            let c = expression[i];

            if (/\d/.test(c) || c === '.') {
                let num = c;
                while (i + 1 < expression.length && (/\d/.test(expression[i + 1]) || expression[i + 1] === '.')) {
                    num += expression[++i];
                }
                output.push(num);
            } else if (c === '(') {
                operators.push(c);
            } else if (c === ')') {
                while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                    output.push(operators.pop() ?? '');
                }
                operators.pop();
            } else if (this.isOperator(c)) {
                while (operators.length > 0 && this.precedence[operators[operators.length - 1]] >= this.precedence[c]) {
                    output.push(operators.pop() ?? '');
                }
                operators.push(c);
            }
        }

        while (operators.length > 0) {
            output.push(operators.pop() ?? '');
        }

        return output;
    }

    evaluatePostfix(postfix: string[]): number {
        let stack: number[] = [];
        for (let token of postfix) {
            if (!isNaN(parseFloat(token))) {
                stack.push(parseFloat(token));
            } else {
                let b = stack.pop() ?? 0;
                let a = stack.pop() ?? 0;
                switch (token) {
                    case '+':
                        stack.push(a + b);
                        break;
                    case '-':
                        stack.push(a - b);
                        break;
                    case '*':
                        stack.push(a * b);
                        break;
                    case '/':
                        if (b === 0) throw new Error("Division by zero");
                        stack.push(a / b);
                        break;
                }
            }
        }

        return stack.pop() ?? 0;
    }

    evaluateExpression(expression: string): number {
        expression = this.replaceSymbol(expression);
        let postfix = this.infixToPostfix(expression);
        return this.evaluatePostfix(postfix);
    }
}

export class AdvancedExpressionEvaluator extends ExpressionEvaluator {
    constructor() {
        super();
        this.precedence['%'] = 3;
        this.precedence['√'] = 4;
    }

    evaluatePostfix(postfix: string[]): number {
        let stack: number[] = [];

        for (let token of postfix) {
            if (!isNaN(parseFloat(token))) {
                stack.push(parseFloat(token));
            } else {
                let b = stack.pop() ?? 0;
                let a = stack.pop() ?? 0;
                switch (token) {
                    case '+':
                        stack.push(a + b);
                        break;
                    case '-':
                        stack.push(a - b);
                        break;
                    case '*':
                        stack.push(a * b);
                        break;
                    case '/':
                        if (b === 0) throw new Error("Division by zero");
                        stack.push(a / b);
                        break;
                    case '%':
                        stack.push(a);
                        stack.push(b / 100);
                        break;
                    case '√':
                        stack.push(a);
                        stack.push(Math.sqrt(b));
                        break;
                }
            }
        }

        return stack.pop() ?? 0;
    }
}