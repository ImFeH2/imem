import React, {useEffect, useRef, useState} from 'react';

const DigitInput = ({length, value, onChange, onSubmit}) => {
    const [digits, setDigits] = useState(Array(length).fill(''));
    const [focusIndex, setFocusIndex] = useState(0);
    const inputRefs = Array(length).fill(0).map(() => useRef());
    const submitTimeoutRef = useRef(null);

    // Reset when length changes
    useEffect(() => {
        setDigits(Array(length).fill(''));
        setFocusIndex(0);
        // Focus first input on mount and length change
        setTimeout(() => inputRefs[0].current?.focus(), 100);
    }, [length]);

    // Update parent value when digits change
    useEffect(() => {
        const newValue = digits.join('');
        onChange(newValue);

        // Clear any pending submit timeout
        if (submitTimeoutRef.current) {
            clearTimeout(submitTimeoutRef.current);
        }

        // 当所有数字都输入完成时，延迟一帧后自动提交
        if (newValue.length === length && !digits.includes('')) {
            submitTimeoutRef.current = setTimeout(() => {
                onSubmit?.();
            }, 0);
        }
    }, [digits, length, onChange, onSubmit]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (submitTimeoutRef.current) {
                clearTimeout(submitTimeoutRef.current);
            }
        };
    }, []);

    const handleDigitChange = (index, value) => {
        // 只允许输入数字
        if (!/^\d*$/.test(value)) return;

        const newDigits = [...digits];

        // 处理粘贴的多个数字
        if (value.length > 1) {
            const pastedDigits = value.split('');
            for (let i = 0; i < length - index; i++) {
                if (i < pastedDigits.length) {
                    newDigits[index + i] = pastedDigits[i];
                }
            }
            setDigits(newDigits);

            // 设置焦点到最后一个输入框或粘贴后的下一个位置
            const nextIndex = Math.min(index + pastedDigits.length, length - 1);
            inputRefs[nextIndex].current?.focus();
            setFocusIndex(nextIndex);
            return;
        }

        // 处理单个数字输入
        newDigits[index] = value;
        setDigits(newDigits);

        // 如果输入了数字，自动跳到下一个输入框
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
                    const newDigits = [...digits];
                    newDigits[index - 1] = '';
                    setDigits(newDigits);
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
            default:
                if (/^\d$/.test(e.key) && digits[index] && index < length - 1) {
                    e.preventDefault();
                    handleDigitChange(index + 1, e.key);
                }
                break;
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
        handleDigitChange(focusIndex, pastedData);
    };

    return (
        <div
            className="flex flex-wrap gap-2 justify-center items-center max-w-full px-4"
            role="group"
            aria-label="Number input"
        >
            {digits.map((digit, index) => (
                <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`
                        w-16 h-20 text-3xl text-center 
                        bg-gray-100 dark:bg-slate-900/50 
                        border-2 border-gray-300 dark:border-slate-700
                        rounded-lg outline-none transition-all duration-300
                        text-gray-900 dark:text-slate-50
                        ${focusIndex === index
                        ? 'border-blue-500 ring-2 ring-blue-500/30 bg-blue-50 dark:bg-slate-800'
                        : 'hover:border-gray-400 dark:hover:border-slate-600'
                    }
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 
                        focus:bg-blue-50 dark:focus:bg-slate-800
                        sm:w-12 sm:h-16 sm:text-2xl
                    `}
                    aria-label={`Digit ${index + 1}`}
                />
            ))}
        </div>
    );
};

export default DigitInput;
