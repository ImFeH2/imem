import React from 'react';
import {ArrowRight, Check, X} from 'lucide-react';

const EnhancedNumberComparison = ({userInput, correctNumber, currentLength}) => {
    const userDigits = userInput.split('');
    const correctDigits = correctNumber.split('');

    return (
        <div className="flex flex-col items-center space-y-6 max-w-md w-full mx-auto p-4">
            {/* Overall Result Display */}
            <div className={`
        w-full rounded-lg p-4 
        ${userInput === correctNumber
                ? 'bg-green-100 dark:bg-green-900/20 border-2 border-green-500'
                : 'bg-red-100 dark:bg-red-900/20 border-2 border-red-500'}
      `}>
                <div className="flex items-center justify-center gap-3">
                    {userInput === correctNumber ? (
                        <>
                            <Check className="w-6 h-6 text-green-500"/>
                            <span className="text-xl font-bold text-green-600 dark:text-green-400">
                Perfect!
              </span>
                        </>
                    ) : (
                        <>
                            <X className="w-6 h-6 text-red-500"/>
                            <span className="text-xl font-bold text-red-600 dark:text-red-400">
                Keep Going
              </span>
                        </>
                    )}
                </div>
            </div>

            {/* Detailed Comparison Display */}
            <div className="w-full space-y-4">
                {/* User Input */}
                <div className="flex items-center justify-center gap-4">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20 text-right">
            Your Answer
          </span>
                    <div className="flex gap-2">
                        {userDigits.map((digit, index) => (
                            <div
                                key={`user-${index}`}
                                className={`
                  w-12 h-14 
                  flex items-center justify-center
                  rounded-lg text-xl font-bold
                  transform transition-all duration-300
                  ${digit === correctDigits[index]
                                    ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                                    : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                                }
                `}
                                style={{
                                    animationDelay: `${index * 100}ms`
                                }}
                            >
                                {digit}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Arrow Indicator */}
                <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-600 animate-bounce"/>
                </div>

                {/* Correct Answer */}
                <div className="flex items-center justify-center gap-4">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20 text-right">
            Correct Answer
          </span>
                    <div className="flex gap-2">
                        {correctDigits.map((digit, index) => (
                            <div
                                key={`correct-${index}`}
                                className={`
                  w-12 h-14
                  flex items-center justify-center
                  rounded-lg text-xl font-bold
                  bg-blue-100 dark:bg-blue-900/20
                  text-blue-600 dark:text-blue-400
                  transform transition-all duration-300
                `}
                                style={{
                                    animationDelay: `${(index + userDigits.length) * 100}ms`
                                }}
                            >
                                {digit}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Accuracy Statistics */}
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Accuracy
          </span>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-32 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500 dark:bg-blue-400 transition-all duration-500"
                                style={{
                                    width: `${(correctDigits.filter((d, i) => d === userDigits[i]).length / correctDigits.length) * 100}%`
                                }}
                            />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {Math.round((correctDigits.filter((d, i) => d === userDigits[i]).length / correctDigits.length) * 100)}%
            </span>
                    </div>
                </div>
            </div>

            {/* Detailed Hint Messages */}
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
                {userInput === correctNumber ? (
                    <span className="flex items-center gap-2 justify-center">
            <Check className="w-4 h-4 text-green-500"/>
            Excellent! You've mastered this difficulty level
          </span>
                ) : (
                    <span className="flex items-center gap-2 justify-center">
            <ArrowRight className="w-4 h-4 text-blue-500"/>
            Remember the correct sequence and keep improving your memory
          </span>
                )}
            </div>

            <div className="text-lg flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400">Current Difficulty:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                    {currentLength}
                </span>
            </div>
        </div>
    );
};

export default EnhancedNumberComparison;
