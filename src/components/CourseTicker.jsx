import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { apiGetAssignedCourses } from '../utils/apiClient';

const checkIfCourseCompleted = (c) => {
    if (c.is_ended) return true;
    if (c.course_start_date) {
        const startTime = c.start_time || "00:00:00";
        const courseDateTime = new Date(`${c.course_start_date}T${startTime}`);
        if (!isNaN(courseDateTime.getTime())) {
            return new Date() > courseDateTime;
        }
    }
    return false;
};

const formatCourseDateAndTime = (dateStr, timeStr) => {
    if (!dateStr || dateStr.toLowerCase() === 'flexible') return 'Upcoming';
    try {
        const dateObj = new Date(dateStr);
        if (isNaN(dateObj.getTime())) return dateStr.toLowerCase() === 'flexible' ? 'Upcoming' : `Starts: ${dateStr}`;
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        let formattedTime = '';
        if (timeStr) {
            const parts = timeStr.split(':');
            if (parts.length >= 2) {
                const hours = parseInt(parts[0], 10);
                const minutes = parts[1];
                const ampm = hours >= 12 ? 'PM' : 'AM';
                const formattedHours = hours % 12 || 12;
                formattedTime = ` at ${formattedHours}:${minutes} ${ampm}`;
            }
        }
        return `Starts: ${formattedDate}${formattedTime}`;
    } catch (e) {
        return dateStr.toLowerCase() === 'flexible' ? 'Upcoming' : `Starts: ${dateStr}`;
    }
};

const CourseTicker = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [tickerCourses, setTickerCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await apiGetAssignedCourses();
                if (data && data.length > 0) {
                    const activeCourses = data.filter(c => c.is_active && !c.is_deleted);
                    // Filter & Sort: Only keep upcoming/non-completed courses ordered by soonest start date
                    const upcomingCourses = activeCourses
                        .filter(c => !checkIfCourseCompleted(c))
                        .sort((a, b) => {
                            const dateA = a.course_start_date ? new Date(a.course_start_date).getTime() : 0;
                            const dateB = b.course_start_date ? new Date(b.course_start_date).getTime() : 0;
                            if (dateA && dateB) return dateA - dateB;
                            if (dateA && !dateB) return -1;
                            if (!dateA && dateB) return 1;
                            return (a.id || 0) - (b.id || 0);
                        });
                    
                    const mapped = upcomingCourses.map(c => ({
                        title: c.title,
                        date: formatCourseDateAndTime(c.course_start_date, c.start_time)
                    }));
                    setTickerCourses(mapped);
                }
            } catch (err) {
                console.error("Failed to load courses for ticker from API:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    if (loading || tickerCourses.length === 0) {
        return null; // Do not show the top scroll bar if there are no new/upcoming courses
    }

    // Ensure we have enough items for continuous infinite scrolling
    let tickerItems = [];
    const repeatCount = Math.ceil(15 / tickerCourses.length);
    for (let i = 0; i < repeatCount; i++) {
        tickerItems = [...tickerItems, ...tickerCourses];
    }

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
                            duration: 35, // Speed of the ticker
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
