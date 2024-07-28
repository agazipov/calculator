import React from 'react';
import Buttons from '../Buttons/Buttons';
import Inputs from '../Inputs/Inputs';
import * as styles from './style.module.scss';

const Calculator: React.FC = () => {
    return (
        <div className={styles.calculator__outline}>
            <div className={styles.calculator__body}>
                <Inputs />
                <Buttons />
            </div>
        </div>
    );
};

export default Calculator;