import React from "react";

interface IMathService {
    input: string;
    result: string;
    handleButtonClick: (value: string) => void;
    handleCalculate: () => void;
    handleClear: () => void;
}

export const MathContext = React.createContext<IMathService | null>(null);