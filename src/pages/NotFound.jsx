import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl opacity-60 z-0 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-50/40 rounded-full blur-3xl opacity-60 z-0 pointer-events-none"></div>

            <div className="max-w-2xl w-full text-center relative z-10 flex flex-col items-center gap-8">
                {/* 404 Text Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <h1 className="text-[120px] md:text-[180px] font-black text-primary/10 leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.h2
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-3xl md:text-5xl font-bold text-secondary font-inter"
                        >
                            Oops! Page Not Found
                        </motion.h2>
                    </div>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-lg text-gray-500 font-inter max-w-md leading-relaxed"
                >
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </motion.p>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-wrap gap-4 justify-center"
                >
                    <Link
                        to="/"
                        id="back-to-home-btn"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300 font-inter"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        id="go-back-btn"
                        className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary font-bold rounded-full hover:bg-blue-50 transition-all duration-300 font-inter"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>
                </motion.div>

                {/* Animated Graphic/Element */}
                <motion.div
                    animate={{
                        rotate: [0, 5, -5, 0],
                        y: [0, -10, 0]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="mt-12 opacity-20"
                >
                    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" />
                        <path d="M60 100C60 77.9086 77.9086 60 100 60C122.091 60 140 77.9086 140 100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="80" cy="90" r="5" fill="currentColor" />
                        <circle cx="120" cy="90" r="5" fill="currentColor" />
                    </svg>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
