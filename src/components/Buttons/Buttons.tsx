import React from 'react';
import Button from '../Button/Button';
import { KEYBORD } from '../../lib/constants';
import * as styles from './style.module.scss';
import { useMathCalculated, useMathClear, useMathClick } from '../../context/mathProvider/hooks';

const Buttons: React.FC = () => {
    const handleButtonClick = useMathClick();
    const handleClear = useMathClear();
    const handleCalculate = useMathCalculated();

    return (
        <div className={styles.buttons}>
            {KEYBORD.map(button => {
                return (
                    <Button
                        key={button}
                        label={button}
                        onClick={button !== 'C' ? handleButtonClick : handleClear}
                    />
                )
            })}
            <Button label='=' style={styles.custom} onClick={handleCalculate} />
        </div>
    );
};

export default Buttons;