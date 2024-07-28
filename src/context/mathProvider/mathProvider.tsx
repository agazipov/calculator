import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AdvancedExpressionEvaluator } from "../../utils/mathParser";
import { DUPLICATION, INITIAL_STATE_RESULT, KEYBORD_LISTENER } from "../../lib/constants";
import { formatNumber } from "../../lib/functions";
import { MathContext } from "./context";

const evaluator = new AdvancedExpressionEvaluator();

interface ProviderProps {
    children: React.ReactNode;
}

export const MathProvider: React.FC<ProviderProps> = ({ children }) => {
    const [input, setInput] = useState<string>('');
    const [result, setResult] = useState<string>(INITIAL_STATE_RESULT);

    useEffect(() => {
        const keypress = (e: KeyboardEvent) => {
            (document.activeElement as HTMLElement)?.blur();
            if (KEYBORD_LISTENER.find(symbol => symbol === e.key)) {
                if (e.key === 'Escape') {
                    handleClear();
                } else if (e.key === 'Enter') {
                    handleCalculate();
                } else if (e.key === 'Backspace') {
                    setInput(prev => prev.slice(0, -1));
                } else {
                    let eventKey = e.key;
                    if (e.key === '*') {
                        eventKey = '×';
                    }
                    if (e.key === '.') {
                        eventKey = ',';
                    }
                    handleButtonClick(eventKey);
                }
            }
        };

        window.addEventListener('keydown', keypress);
        return () => {
            window.removeEventListener('keydown', keypress);
        };
    }, [input]);

    const handleButtonClick = useCallback((value: string) => {
        setInput(prev => {
            if (prev.length === 15) {
                return prev;
            }
            if (DUPLICATION.includes(prev.slice(-1)) && DUPLICATION.includes(value)) {
                return prev;
            }
            return prev + value;
        });
    }, []);

    const handleCalculate = useCallback(() => {
        if (!input) return;
        try {
            const res = evaluator.evaluateExpression(input);
            const result = formatNumber(res);
            setResult(result.replace(/\./, ','));
        } catch (error) {
            setResult('Error');
        }
        setInput('');
    }, [input, evaluator]);

    const handleClear = useCallback(() => {
        setInput('');
        setResult(INITIAL_STATE_RESULT);
    }, []);

    const mathService = useMemo(() => ({
        input,
        result,
        handleButtonClick,
        handleCalculate,
        handleClear
    }), [input, result, handleButtonClick, handleCalculate, handleClear]);

    return (
        <MathContext.Provider value={mathService}>
            {children}
        </MathContext.Provider>
    );
};
