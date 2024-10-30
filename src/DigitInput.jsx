import React, {useEffect, useRef, useState} from 'react';

const DigitInput = ({length, value, onChange, onSubmit}) => {
    const [digits, setDigits] = useState(Array(length).fill(''));
    const [focusIndex, setFocusIndex] = useState(0);
    const inputRefs = Array(length).fill(0).map(() => useRef());

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

        // 当所有数字都输入完成时，自动提交
        if (newValue.length === length && !digits.includes('')) {
            onSubmit?.();
        }
    }, [digits, length, onChange, onSubmit]);

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
                // 如果当前输入框为空且不是第一个，删除前一个数字并跳转到前一个输入框
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
                // 向左移动焦点
                if (index > 0) {
                    e.preventDefault();
                    inputRefs[index - 1].current?.focus();
                    setFocusIndex(index - 1);
                }
                break;
            case 'ArrowRight':
                // 向右移动焦点
                if (index < length - 1) {
                    e.preventDefault();
                    inputRefs[index + 1].current?.focus();
                    setFocusIndex(index + 1);
                }
                break;
            default:
                // 如果输入的是数字，但当前输入框已有数字，则尝试在下一个输入框输入
                if (/^\d$/.test(e.key) && digits[index] && index < length - 1) {
                    e.preventDefault();
                    handleDigitChange(index + 1, e.key);
                }
                break;
        }
    };

    // 处理粘贴事件
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
        handleDigitChange(focusIndex, pastedData);
    };

    return (
        <div className="flex flex-wrap gap-2 justify-center items-center max-w-full px-4" role="group"
             aria-label="Number input">
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
                    className={`digit-input ${focusIndex === index ? 'ring-2 ring-blue-500/50' : ''}`}
                    aria-label={`Digit ${index + 1}`}
                />
            ))}
        </div>
    );
};

export default DigitInput;
