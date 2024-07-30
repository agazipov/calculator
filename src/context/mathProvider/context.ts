import React from "react";
import { IValue } from "../../types/types";

interface IMathService {
    value: IValue
}

interface IMathServiceActions {
    handleButtonClick: (value: string) => void;
    handleClear: () => void;
    handleCalculate: () => void;
}

export const MathContext = React.createContext<IMathService | null>(null);
export const MathContextActions = React.createContext<IMathServiceActions | null>(null);
