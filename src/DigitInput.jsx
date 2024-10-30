import React, {useEffect, useRef, useState} from 'react';

const DigitInput = ({length, value, onChange, onSubmit}) => {
    const [digits, setDigits] = useState(Array(length).fill(''));
    const [focusIndex, setFocusIndex] = useState(0);
    const inputRefs = Array(length).fill(0).map(() => useRef());

    // Reset digits when length changes
    useEffect(() => {
        setDigits(Array(length).fill(''));
        setFocusIndex(0);
        // Focus first input on mount and length change
        setTimeout(() => inputRefs[0].current?.focus(), 100);
    }, [length]);

    // Update parent value when digits change
    useEffect(() => {
        onChange(digits.join(''));
    }, [digits, onChange]);

    const handleDigitChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;

        const newDigits = [...digits];
        newDigits[index] = value;
        setDigits(newDigits);

        if (value && index < length - 1) {
            inputRefs[index + 1].current?.focus();
            setFocusIndex(index + 1);
        }
    };

    const handleKeyDown = (index, e) => {
        switch (e.key) {
            case 'Backspace':
                if (!digits[index] && index > 0) {
                    e.preventDefault();
                    inputRefs[index - 1].current?.focus();
                    setFocusIndex(index - 1);
                }
                break;
            case 'ArrowLeft':
                if (index > 0) {
                    e.preventDefault();
                    inputRefs[index - 1].current?.focus();
                    setFocusIndex(index - 1);
                }
                break;
            case 'ArrowRight':
                if (index < length - 1) {
                    e.preventDefault();
                    inputRefs[index + 1].current?.focus();
                    setFocusIndex(index + 1);
                }
                break;
            case 'Enter':
                if (digits.every(d => d !== '')) {
                    onSubmit?.();
                }
                break;
            default:
                break;
        }
    };

    // Handle paste
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
        const newDigits = [...digits];

        for (let i = 0; i < Math.min(pastedData.length, length); i++) {
            newDigits[i] = pastedData[i];
        }

        setDigits(newDigits);
        if (pastedData.length >= length) {
            inputRefs[length - 1].current?.focus();
            setFocusIndex(length - 1);
        } else {
            inputRefs[Math.min(pastedData.length, length - 1)].current?.focus();
            setFocusIndex(Math.min(pastedData.length, length - 1));
        }
    };

    return (
        <div className="flex flex-wrap gap-2 justify-center items-center max-w-full px-4">
            {digits.map((digit, index) => (
                <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="digit-input"
                    aria-label={`Digit ${index + 1}`}
                />
            ))}
        </div>
    );
};

export default DigitInput;
