import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, User } from 'lucide-react';
import { fadeIn, staggerContainer } from '../utils/motion';

const testimonials = [
    {
        text: "Aindhin's training really helped me strengthen my technical skills and put them to use right away at work. The hands-on activities and real-world examples made the learning process simple, practical, and truly effective.",
        author: "Rajesh Kumar",
        role: "Software Engineer, chennai",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        rating: 5
    },
    {
        text: "Our team gained a lot from Aindhin's corporate training. The content was closely aligned with industry needs, and the dashboards made it easy to monitor employee progress and performance.",
        author: "Priya",
        role: "HR Manager, Erode",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        rating: 5
    },
    {
        text: "The career-focused courses gave me clear direction and boosted my confidence during placement preparation. The mentors were incredibly supportive and always there to guide us whenever we needed help.",
        author: "Ananya",
        role: "MBA Student, Coimbatore",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        rating: 5
    },
    {
        text: "The practical approach to learning at Aindhin is unmatched. I was able to apply what I learned immediately in my projects. The support system is fantastic.",
        author: "Vikram Singh",
        role: "Frontend Developer, Bangalore",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        rating: 5
    },
    {
        text: "Aindhin's platform is user-friendly and the course content is up-to-date with the latest industry trends. Highly recommended for anyone looking to upskill.",
        author: "Sneha Reddy",
        role: "Data Analyst, Hyderabad",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        rating: 5
    },
    {
        text: "I loved the flexibility of the courses. managing my studies along with my job was a breeze thanks to Aindhin. The certification is recognized and valuable.",
        author: "Rahul Verma",
        role: "Student, Delhi",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        rating: 5
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const carouselRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Update items per page on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setItemsPerPage(3);
            } else if (window.innerWidth >= 768) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(1);
            }
        };

        handleResize(); // Initial call
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-swipe logic
    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const maxIndex = testimonials.length - itemsPerPage;
                return prevIndex >= maxIndex ? 0 : prevIndex + 1;
            });
        }, 3000); // 3 seconds delay

        return () => clearInterval(interval);
    }, [itemsPerPage, isHovered]);

    const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

    // Calculate translation percentage
    // 1 item: 100% width. Move 100% per index.
    // 2 items: 50% width. Move 50% per index.
    // 3 items: 33.33% width. Move 33.33% per index.
    // However, we have gap-8 (2rem).  
    // Using a simpler approach: Translate X by -(currentIndex * (100 / itemsPerPage))%
    // And ensure the container width is handled correctly by CSS.

    return (
        <section className="py-6 px-4 md:px-8 bg-white relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto flex flex-col items-center gap-16 relative z-10">
                <div className="flex flex-col items-center text-center gap-2">
                    <h2 className="text-5xl lg:text-6xl font-bold text-primary font-inter mb-2">Testimonial</h2>
                    <p className="text-gray-500 font-medium tracking-wide">What Our Students Say!!!</p>
                </div>

                {/* Carousel Area */}
                <div
                    className="w-full overflow-hidden pt-12 pb-4"
                    ref={carouselRef}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <motion.div
                        className="flex"
                        animate={{ x: `-${currentIndex * (100 / itemsPerPage)}%` }}
                        transition={{ spring: { stiffness: 300, damping: 30 }, duration: 0.8 }}
                    >
                        {testimonials.map((t, idx) => (
                            <motion.div
                                key={idx}
                                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-3 box-border"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="bg-white p-8 rounded-[20px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col items-center text-center relative h-full group hover:-translate-y-2 transition-transform duration-300">
                                    {/* Professional Quote Icon - Top Right */}
                                    <div className="absolute top-6 right-6">
                                        <div className="w-12 h-12 bg-blue-50/80 rounded-full flex items-center justify-center">
                                            <Quote className="w-5 h-5 text-primary fill-current opacity-70" />
                                        </div>
                                    </div>

                                    {/* Professional Icon Placeholder */}
                                    <div className="w-24 h-24 rounded-full flex items-center justify-center border-4 border-white shadow-lg mb-4 -mt-20 bg-blue-50 z-10">
                                        <User className="w-12 h-12 text-primary opacity-80" />
                                    </div>

                                    <h3 className="text-xl font-bold text-secondary font-inter mt-2">{t.author}</h3>
                                    <span className="text-sm text-gray-500 mb-4 font-inter">{t.role}</span>

                                    {/* Stars */}
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`}
                                            />
                                        ))}
                                    </div>

                                    <p className="text-gray-600 leading-relaxed text-[15px] font-inter">
                                        {t.text}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-3 mt-2">
                    {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-primary w-8' : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
