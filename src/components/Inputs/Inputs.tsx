import React from 'react';
import * as styles from './style.module.scss';
import { useMathInput, useMathResult } from '../../context/mathProvider/hooks';

const Inputs: React.FC = () => {
    const input = useMathInput();
    const result = useMathResult();
    
    return (
        <div className={styles.inputs}>
            <div className={styles.inputs__input}>{input}</div>
            <div className={styles.inputs__result}>{result}</div>
            <div className={styles.inputs__dash}></div>
        </div>
    );
};

export default Inputs;