import React from 'react';
import "../common/NavBar.css"

export const CustomButton = ({ children, variant = 'solid', onClick, ...props }) => {
    const buttonClass = variant === 'solid' ? 'bankify-btn-solid' : 'bankify-btn-outline';

    return (
        <button
            className={`bankify-btn ${buttonClass}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default CustomButton;