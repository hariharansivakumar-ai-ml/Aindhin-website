import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Preloader = () => {
    const [show, setShow] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // Show preloader on route change
        setShow(true);

        // Hide after delay
        const timer = setTimeout(() => {
            setShow(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [location.pathname]); // Trigger when path changes

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[10000] bg-white flex items-center justify-center transition-opacity duration-500">
            <img
                src="/src/assets/preloader.gif"
                alt="Loading..."
                className="w-40 h-auto object-contain"
            />
        </div>
    );
};

export default Preloader;
