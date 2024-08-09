import React, { memo } from 'react';
import Button from '../Button/Button';
import { KEYBORD } from '../../lib/constants';
import { useMathAction } from '../../context/mathProvider/hooks';
import * as styles from './style.module.scss';
import { EXTENDS_KEYBORD } from '../../context/mathProvider/mathProvider';

const Buttons: React.FC = memo(() => {
    const { handleButtonClick, handleClear, handleCalculate } = useMathAction();
    const KEY = EXTENDS_KEYBORD.concat(KEYBORD);

    return (
        <div className={styles.buttons}>
            <Button label='C' onClick={handleClear} />
            {KEY.map(button => {
                return (
                    <Button
                        key={button}
                        label={button}
                        onClick={handleButtonClick}
                    />
                )
            })}
            <Button label='=' style={styles.custom} onClick={handleCalculate} />
        </div>
    );
});

export default Buttons;