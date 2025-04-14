import './App.css';
import { useEffect, useState } from 'react';
import { Button } from './Button.tsx';

type Settings = {
    max: number;
    start: number;
};

type CounterState = {
    settings: Settings;
    current: number;
    isApplied: boolean;
};

export const App = () => {
    const [state, setState] = useState<CounterState>({
        settings: { max: 5, start: 0 },
        current: 0,
        isApplied: true
    });

    // Загрузка сохраненных значений
    useEffect(() => {
        const savedSettings = localStorage.getItem('counterSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            setState(prev => ({
                ...prev,
                settings,
                current: settings.start,
                isApplied: true
            }));
        }
    }, []);

    // Сохранение настроек
    useEffect(() => {
        if (state.isApplied) {
            localStorage.setItem('counterSettings', JSON.stringify(state.settings));
        }
    }, [state.settings, state.isApplied]);

    const increment = () => {
        setState(prev => ({ ...prev, current: prev.current + 1 }));
    };

    const reset = () => {
        setState(prev => ({ ...prev, current: prev.settings.start }));
    };

    const applySettings = () => {
        if (!isSettingsInvalid) {
            setState(prev => ({
                ...prev,
                current: prev.settings.start,
                isApplied: true
            }));
        }
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const max = +e.target.value;
        setState(prev => ({
            ...prev,
            settings: { ...prev.settings, max },
            isApplied: false
        }));
    };

    const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const start = +e.target.value;
        setState(prev => ({
            ...prev,
            settings: { ...prev.settings, start },
            isApplied: false
        }));
    };

    const { settings: { max, start }, current, isApplied } = state;
    const isSettingsInvalid = start < 0 || start >= max;
    const isSetDisabled = isSettingsInvalid || isApplied;

    return (
        <div className="app">
            <div className="container">
                <div className="valueSection">
                    <div className="settingValue">
                        <span>max value:</span>
                        <input
                            type="number"
                            className={`settingInput ${isSettingsInvalid ? 'error' : ''}`}
                            value={max}
                            onChange={handleMaxChange}
                        />
                    </div>
                    <div className="settingValue">
                        <span>start value:</span>
                        <input
                            type="number"
                            className={`settingInput ${isSettingsInvalid ? 'error' : ''}`}
                            value={start}
                            onChange={handleStartChange}
                        />
                    </div>
                </div>

                <div className="buttons">
                    <Button
                        onClick={applySettings}
                        className="btn"
                        title="set"
                        disabled={isSetDisabled}
                    />
                </div>
            </div>

            <div className="container">
                <div className="valueSection">
                    {isSettingsInvalid ? (
                        <div className="error-message">Enter correct value!</div>
                    ) : !isApplied ? (
                        <div className="info-message">Enter values and press "set"</div>
                    ) : (
                        <input
                            type="text"
                            value={current}
                            className={current === max ? 'currentValueInput stop' : 'currentValueInput'}
                            readOnly
                        />
                    )}
                </div>

                <div className="buttons">
                    <Button
                        onClick={increment}
                        className="btn"
                        title="inc"
                        disabled={current === max || !isApplied || isSettingsInvalid}
                    />
                    <Button
                        onClick={reset}
                        className="btn"
                        title="reset"
                        disabled={current === start || !isApplied || isSettingsInvalid}
                    />
                </div>
            </div>
        </div>
    );
};
