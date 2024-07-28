import React from 'react';
import Calculator from '../components/Calculator/Calculator';
import * as styles from './style.module.scss';
import { MathProvider } from '../context/mathProvider/mathProvider';

const App: React.FC = () => {
    return (
        <MathProvider>
            <div className={styles.app}>
                <Calculator />
            </div>
        </MathProvider>
    );
};

export default App;