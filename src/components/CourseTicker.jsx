import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CourseTicker = () => {
    const [isHovered, setIsHovered] = useState(false);

    const courses = [
        { title: "Digital Marketing", date: "Starts: 06.06.2026" },
        { title: "Artificial Intelligence", date: "Batch Completed - Next Batch Coming Soon" },
        { title: "Cyber Security", date: "Batch Completed - Next Batch Coming Soon" },
        { title: "Online Classes for KID'S", date: "Batch Completed - Next Batch Coming Soon" }
    ];

    // Duplicate courses to create seamless infinite scroll
    const tickerItems = [...courses, ...courses, ...courses, ...courses];

    return (
        <div 
            className="w-full bg-[#0f172a] text-white py-2.5 overflow-hidden border-b border-white/10 relative z-40 shadow-md"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex items-center gap-12"
                    animate={{
                        x: [0, -1000] // Adjust this value based on actual content width
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30, // Speed of the ticker
                            ease: "linear",
                        },
                    }}
                    style={{
                        animationPlayState: isHovered ? 'paused' : 'running'
                    }}
                >
                    {tickerItems.map((course, index) => (
                        <div key={index} className="flex items-center gap-3 group cursor-pointer">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-blue-400 transition-colors shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                            <span className="font-semibold text-sm tracking-wide text-gray-100 group-hover:text-white transition-colors">{course.title}</span>
                            <span className="text-xs text-gray-400 bg-white/10 px-2 py-0.5 rounded-full border border-white/5">{course.date}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default CourseTicker;
