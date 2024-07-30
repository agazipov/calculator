import React, { memo } from 'react';
import Button from '../Button/Button';
import { KEYBORD } from '../../lib/constants';
import * as styles from './style.module.scss';
import { useMathAction, useMathCalculate } from '../../context/mathProvider/hooks';

const Buttons: React.FC = memo(() => {
    const { handleButtonClick, handleClear } = useMathAction();
    const { handleCalculate } = useMathCalculate();
    
    console.log('render');

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
});

export default Buttons;