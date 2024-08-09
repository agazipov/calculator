import { ExpressionEvaluator, Operation } from "../utils/mathParser";

export function extensionOfCalculator(newOperations: Operation[]): string[] {
    const evaluator = ExpressionEvaluator.getInstance();
    const EXTENDS_KEYBORD: string[] = [];
    newOperations.forEach((operation) => {
        evaluator.registerOperation(operation);
        EXTENDS_KEYBORD.push(operation.symbol);
    });
    return EXTENDS_KEYBORD;
}

// Для добавления новой операции следует добавить в массив с операциями нужную вам операцию
// в виде объекта с типом "Operation"
// Пример:
// {
//     symbol: '^',                         - символ операции
//     precedence: 4,                       - вес операции (определяет порядок выполнении, чем больше тем важнее)
//     evaluate: (stack) => {               - функция операции (если оператор унарный, то переменную "а" следует вернуть
//         let b = stack.pop() ?? 0;        в стек через "stack.push(a)" перед операцией с переменной "b")
//         let a = stack.pop() ?? 0;
//         stack.push(Math.pow(a, b));
//         return stack;
//     }
// }

export const newOperations: Operation[] = [
    {
        symbol: '%',
        precedence: 3,
        evaluate: (stack) => {
            let b = stack.pop() ?? 0;
            let a = stack.pop() ?? 0;
            stack.push(a);
            stack.push(b / 100);
            return stack;
        }
    },
    {
        symbol: '√',
        precedence: 4,
        evaluate: (stack) => {
            let b = stack.pop() ?? 0;
            let a = stack.pop() ?? 0;
            stack.push(a);
            stack.push(Math.sqrt(b));
            return stack;
        }
    },
]