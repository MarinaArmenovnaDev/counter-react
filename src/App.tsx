import './App.css';
import { useEffect, useState } from 'react';
import { Button } from './Button.tsx';

export const App = () => {
    const [value, setValue] = useState<number>(0);

    useEffect(() => {
        const valueAsString = localStorage.getItem('counterValue');
        if (valueAsString) {
            setValue(JSON.parse(valueAsString));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('counterValue', JSON.stringify(value));
    }, [value]);

    const increment = () => {
        setValue((value) => value + 1);
    };

    const reset = () => {
        setValue(0);
    };

    const setHandler = () => {
        // Логика для кнопки "set"
    };

    return (
        <div className="app">
            <div className="container">
                <div className="valueSection">
                    <div className="settingValue">
                        <span>max value:</span>
                        <input type="number" className="settingInput" value={value}/>
                    </div>
                    <div className="settingValue">
                        <span>start value:</span>
                        <input type="number" className="settingInput" value={value} />
                    </div>
                </div>

                <div className="buttons">
                    <Button onClick={setHandler} className="btn" title="set" disabled={value < 0} />
                </div>
            </div>

            <div className="container">
                <div className="valueSection">
                    <input
                        type="text"
                        value={value}
                        className={value === 5 ? 'currentValueInput stop' : 'currentValueInput'}
                        readOnly
                    />
                </div>

                <div className="buttons">
                    <Button onClick={increment} className="btn" title="inc" disabled={value === 5} />
                    <Button onClick={reset} className="btn" title="reset" disabled={value === 0} />
                </div>
            </div>
        </div>
    );
};
