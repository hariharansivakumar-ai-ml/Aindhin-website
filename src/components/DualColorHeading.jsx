import React from 'react';

/**
 * Standardized Section H2 Title across all pages
 * - Uniform typography: Poppins, bold, text-2xl md:text-3xl lg:text-4xl, leading-tight
 * - Dual color: text-secondary (#19352D) base + text-primary (#155BAC) highlight
 */
export const DualColorHeading = ({ 
    children, 
    highlight, 
    className = "",
    size = "text-2xl md:text-3xl lg:text-4xl",
    ...props 
}) => {
    // If explicit highlight prop is provided, split around it
    if (highlight && typeof children === 'string') {
        const parts = children.split(highlight);
        return (
            <h2 className={`font-poppins ${size} font-bold text-secondary leading-tight ${className}`} {...props}>
                {parts[0]}
                <span className="text-primary">{highlight}</span>
                {parts.slice(1).join(highlight)}
            </h2>
        );
    }

    // If children is already JSX (e.g. contains <span>, etc.), render inside standard h2
    if (typeof children !== 'string') {
        return (
            <h2 className={`font-poppins ${size} font-bold text-secondary leading-tight ${className}`} {...props}>
                {children}
            </h2>
        );
    }

    // Automatically split string into dual color (last 1-2 words highlighted in primary)
    const words = children.trim().split(/\s+/);
    if (words.length <= 1) {
        return (
            <h2 className={`font-poppins ${size} font-bold text-secondary leading-tight ${className}`} {...props}>
                {children}
            </h2>
        );
    }

    const highlightCount = words.length >= 4 ? 2 : 1;
    const baseText = words.slice(0, -highlightCount).join(' ');
    const highlightText = words.slice(-highlightCount).join(' ');

    return (
        <h2 className={`font-poppins ${size} font-bold text-secondary leading-tight ${className}`} {...props}>
            <span>{baseText} </span>
            <span className="text-primary">{highlightText}</span>
        </h2>
    );
};

export default DualColorHeading;
