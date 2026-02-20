
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

// Text Variant
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

// Slide In Animation
export const slideIn = (direction, type, delay, duration) => {
    return {
        hidden: {
            x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
            y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
        },
        show: {
            x: 0,
            y: 0,
            transition: {
                type: type,
                delay: delay,
                duration: duration,
                ease: "easeOut",
            },
        },
    };
};

// Floating Animation (Continuous)
export const float = (duration = 3, y = 15) => ({
    y: [0, -y, 0],
    transition: {
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut"
    }
});

// Text Reveal Wrapper
export const textRevealContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

export const textRevealItem = {
    hidden: { y: "100%", opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};
