import React from "react";

interface IMathService {
    input: string;
    result: string;
}

interface IMathServiceActions {
    handleButtonClick: (value: string) => void;
    handleClear: () => void;
}

interface IMathServiceCalculate {
    handleCalculate: () => void;
}

export const MathContext = React.createContext<IMathService | null>(null);
export const MathContextActions = React.createContext<IMathServiceActions | null>(null);
export const MathContextCalculate = React.createContext<IMathServiceCalculate | null>(null);