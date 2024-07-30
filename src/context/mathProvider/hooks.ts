import { useContext } from "react";
import { MathContext, MathContextActions } from "./context";

export const useMathValue = () => {
  const context = useContext(MathContext);
  if (!context) {
    throw new Error("useMathValue must be used within a MathProvider");
  }
  return context;
};

export const useMathAction = () => {
  const context = useContext(MathContextActions);
  if (!context) {
    throw new Error("useMathAction must be used within a MathProvider");
  }
  return context;
};