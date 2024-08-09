import { extensionOfCalculator, newOperations } from "../src/plugins/extensionOfCalculator";
import { ExpressionEvaluator } from "../src/utils/mathParser";

describe('ExpressionEvaluator', () => {
    let evaluator: ExpressionEvaluator;

    beforeEach(() => {
        extensionOfCalculator(newOperations);
        evaluator = ExpressionEvaluator.getInstance();
    });

    test('should evaluate simple expressions correctly', () => {
        expect(evaluator.evaluateExpression('2+3')).toBe(5);
        expect(evaluator.evaluateExpression('2*3')).toBe(6);
        expect(evaluator.evaluateExpression('6/2')).toBe(3);
        expect(evaluator.evaluateExpression('5-3')).toBe(2);
    });

    test('should handle parentheses correctly', () => {
        expect(evaluator.evaluateExpression('(2+3)*4')).toBe(20);
        expect(evaluator.evaluateExpression('2*(3+4)')).toBe(14);
        expect(evaluator.evaluateExpression('(6/2)+3')).toBe(6);
        expect(evaluator.evaluateExpression('5-(3+1)')).toBe(1);
    });

    test('should handle unary minus correctly', () => {
        expect(evaluator.evaluateExpression('-3+5')).toBe(2);
        expect(evaluator.evaluateExpression('5+(-3)')).toBe(2);
        expect(evaluator.evaluateExpression('-5*(-2)')).toBe(10);
        expect(evaluator.evaluateExpression('-5-(-2-8)')).toBe(5);
        expect(evaluator.evaluateExpression('-(-(-(-5)))')).toBe(5);
    });

    test('should throw error for mismatched parentheses', () => {
        expect(() => evaluator.evaluateExpression('(2+3')).toThrow('SyntaxError');
        expect(() => evaluator.evaluateExpression('2+3)')).toThrow('SyntaxError');
        expect(() => evaluator.evaluateExpression('2+3)(')).toThrow('SyntaxError');
    });

    test('should throw error for division by zero', () => {
        expect(() => evaluator.evaluateExpression('5/0')).toThrow('Division by zero');
    });

    test('should handle complex expressions correctly', () => {
        expect(evaluator.evaluateExpression('3+5*(2-8)/3')).toBe(-7);
        expect(evaluator.evaluateExpression('(3+5)*(2-8)/3')).toBe(-16);
    });

    test('should handle new operators correctly', () => {
        expect(evaluator.evaluateExpression('150%')).toBe(1.5);
        expect(evaluator.evaluateExpression('(200%)+8')).toBe(10);
        expect(evaluator.evaluateExpression('√9')).toBe(3);
        expect(evaluator.evaluateExpression('6+(√16)/2')).toBe(8);
        expect(() => evaluator.evaluateExpression('3^3')).toThrow('Unknown operation');
    });

    test('should throw error for duplicate operators', () => {
        expect(() => evaluator.evaluateExpression('2++3')).toThrow('Duplicate operators');
        expect(() => evaluator.evaluateExpression('2**3')).toThrow('Duplicate operators');
        expect(() => evaluator.evaluateExpression('6//2')).toThrow('Duplicate operators');
        expect(() => evaluator.evaluateExpression('5--3')).toThrow('Duplicate operators');
    });
});