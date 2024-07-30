import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AdvancedExpressionEvaluator } from "../../utils/mathParser";
import { DUPLICATION, INITIAL_STATE, KEYBORD_LISTENER } from "../../lib/constants";
import { formatNumber } from "../../lib/functions";
import { MathContext, MathContextActions } from "./context";
import { IValue } from "../../types/types";

const evaluator = new AdvancedExpressionEvaluator();

interface ProviderProps {
    children: React.ReactNode;
}

export const MathProvider: React.FC<ProviderProps> = ({ children }) => {
    const [value, setValue] = useState<IValue>(INITIAL_STATE)

    useEffect(() => {
        const keypress = (e: KeyboardEvent) => {
            (document.activeElement as HTMLElement)?.blur();
            if (KEYBORD_LISTENER.find(symbol => symbol === e.key)) {
                if (e.key === 'Escape') {
                    handleClear();
                } else if (e.key === 'Enter') {
                    handleCalculate();
                } else if (e.key === 'Backspace') {
                    setValue(prev => ({ ...prev, input: prev.input.slice(0, -1) }));
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
    }, []);

    const handleButtonClick = useCallback((value: string) => {
        setValue(prev => {
            if (prev.input.length === 15) {
                return { ...prev };
            }
            if (DUPLICATION.includes(prev.input.slice(-1)) && DUPLICATION.includes(value)) {
                return { ...prev };
            }
            return { ...prev, input: prev.input + value };
        });
    }, []);

    const handleCalculate = useCallback(() => {
        setValue(prev => {
            try {
                if (!prev.input) return INITIAL_STATE;
                return {
                    input: '',
                    result: formatNumber(evaluator.evaluateExpression(prev.input)).replace(/\./, ',')
                };
            } catch (error: any) {
                return { input: '', result: error.message || 'Error' };
            }
        });
    }, [evaluator]);

    const handleClear = useCallback(() => {
        setValue(INITIAL_STATE);
    }, []);

    const mathService = useMemo(() => ({
        value
    }), [value]);

    const mathServiceActions = useMemo(() => ({
        handleButtonClick,
        handleClear,
        handleCalculate
    }), [handleButtonClick, handleClear, handleCalculate]);

    return (
        <MathContext.Provider value={mathService}>
            <MathContextActions.Provider value={mathServiceActions}>
                {children}
            </MathContextActions.Provider>
        </MathContext.Provider>
    );
};
