import React from 'react';
import * as styles from './style.module.scss';
import { useMathValue } from '../../context/mathProvider/hooks';

const Inputs: React.FC = () => {
    const { value } = useMathValue();

    return (
        <div className={styles.inputs}>
            <div className={styles.inputs__input}>{value.input}</div>
            <div className={styles.inputs__result}>{value.result}</div>
            <div className={styles.inputs__dash}></div>
        </div>
    );
};

export default Inputs;