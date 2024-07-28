import { useContext } from "react";
import { MathContext } from "./context";

export const useMathClick = () => {
  const context = useContext(MathContext);
  if (!context) {
    throw new Error("useMathClick must be used within a MathProvider");
  }
  return context.handleButtonClick;
};

export const useMathClear = () => {
  const context = useContext(MathContext);
  if (!context) {
    throw new Error("useMathClear must be used within a MathProvider");
  }
  return context.handleClear;
};

export const useMathCalculated = () => {
  const context = useContext(MathContext);
  if (!context) {
    throw new Error("useMathCalculated must be used within a MathProvider");
  }
  return context.handleCalculate;
};

export const useMathInput = () => {
  const context = useContext(MathContext);
  if (!context) {
    throw new Error("useMathInput must be used within a MathProvider");
  }
  return context.input;
};

export const useMathResult = () => {
  const context = useContext(MathContext);
  if (!context) {
    throw new Error("useMathResult must be used within a MathProvider");
  }
  return context.result;
};