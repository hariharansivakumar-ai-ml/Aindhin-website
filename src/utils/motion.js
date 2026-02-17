
// Basic Fade Up Animation
export const fadeIn = (direction = "up", delay = 0) => {
    return {
        hidden: {
            y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
            x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
            opacity: 0,
        },
        show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                duration: 1.25,
                delay: delay,
                ease: [0.25, 0.25, 0.25, 0.75],
            },
        },
    };
};

// Stagger Container for children
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => {
    return {
        hidden: {},
        show: {
            transition: {
                staggerChildren: staggerChildren,
                delayChildren: delayChildren,
            },
        },
    };
};

// Zoom In Animation
export const zoomIn = (delay = 0, duration = 0.75) => {
    return {
        hidden: {
            scale: 0.8,
            opacity: 0,
        },
        show: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "tween",
                delay: delay,
                duration: duration,
                ease: "easeOut",
            },
        },
    };
};

// Hover Effect
export const hoverScale = {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300 }
};

// Text Variant (Letter by letter or word by word if needed, but simple block reveal is usually better for headings)
export const textVariant = (delay = 0) => {
    return {
        hidden: {
            y: 50,
            opacity: 0,
        },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                duration: 1.25,
                delay: delay,
            },
        },
    };
};
