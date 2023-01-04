import React from 'react';

const ActionBtn = ({ disabled, className, type, func, label }) => (
    <div>
        {type === 'success' && (
            <button
                onClick={func}
                disabled={!!disabled}
                className={`px-4 py-1 mx-3 font-bold bg-green-500 text-white Lucida rounded-sm ${className}`}
            >
                {label}
            </button>
        )}
        {type === 'error' && (
            <button
                onClick={func}
                disabled={!!disabled}
                className={`px-4 py-1 mx-3 font-bold bg-red-500 text-white Lucida rounded-sm ${className}`}
            >
                {label}
            </button>
        )}
        {!type && (
            <button
                onClick={func}
                disabled={!!disabled}
                className={`px-2 mx-1 text-slate-700 Lucida rounded-sm ${className}`}
            >
                {label}
            </button>
        )}
    </div>
);

export default ActionBtn;
