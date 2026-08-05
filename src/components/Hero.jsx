import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Phone } from 'lucide-react';
import { USER_APP_URL } from '../utils/apiClient';
import heroStudentImg from '../assets/hero_student.webp';

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-white pt-16 pb-4 lg:pt-16 lg:pb-6 px-6 lg:px-12">
            {/* Background Shape/Blob */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl opacity-60 z-0 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-50/30 rounded-full blur-3xl opacity-60 z-0 pointer-events-none"></div>

            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-6 items-start text-left"
                >
                    <span className="text-primary font-bold text-lg font-inter tracking-wide uppercase bg-blue-50 px-4 py-2 rounded-full">
                        Learn and Live
                    </span>

                    <h1 className="text-4xl lg:text-[56px] font-bold text-secondary leading-[1.2] font-inter">
                        <span className="text-primary block mb-2 lg:whitespace-nowrap">Online Learning</span>
                        Platform in India – <span className="text-primary">Aindhin</span>
                    </h1>

                    <p className="text-lg lg:text-[20px] text-gray-600 leading-[1.7] font-inter max-w-xl">
                        We bridge the gap between academic education and industry requirements by providing elite, career-focused certification courses designed to guarantee your professional success.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-6">
                        <Link
                            to="/our-courses"
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-secondary text-white font-bold rounded-full shadow-[0_10px_30px_rgba(25,53,45,0.2)] hover:shadow-[0_20px_40px_rgba(25,53,45,0.3)] hover:-translate-y-1 transition-all duration-300 font-inter text-sm"
                        >
                            Our Courses
                        </Link>
                        <a
                            href={`${USER_APP_URL}/signin`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-bold rounded-full shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300 font-inter text-sm animate-color-blink"
                        >
                            Enroll Now <ArrowUpRight className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Trust Signals Underneath CTAs */}
                    <div className="flex flex-wrap items-center gap-4 lg:gap-8 mt-6">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🏆</span>
                            <span className="text-sm font-semibold text-gray-700 font-inter">Industry<br />Certifications</span>
                        </div>
                        <div className="w-px h-8 bg-gray-200"></div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🤝</span>
                            <span className="text-sm font-semibold text-gray-700 font-inter">Top Partner<br />Institutions</span>
                        </div>
                        <div className="w-px h-8 bg-gray-200"></div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">⭐</span>
                            <span className="text-sm font-semibold text-gray-700 font-inter">100+ Glowing<br />Testimonials</span>
                        </div>
                    </div>
                </motion.div>

                {/* Hero Image Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="relative flex justify-center lg:justify-end"
                >
                    <div className="relative w-full max-w-[600px]">
                        {/* Decorative Background for Image */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-pink-50 rounded-[3rem] rotate-3 scale-95 z-0 transform"></div>

                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.5 }}
                            className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-[4px] border-white cursor-pointer"
                        >
                            <img
                                src={heroStudentImg}
                                alt="Online learning platform in india - Aindhin Student"
                                className="w-full h-auto object-cover"
                            />
                        </motion.div>

                        {/* Floating Cards */}
                        {/* 5k+ Enrolled Students */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="absolute top-[-5%] left-[0%] lg:top-[10%] lg:left-[-12%] z-20 min-w-[200px]"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="bg-white/90 backdrop-blur-md p-2 lg:p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col gap-1.5 lg:gap-3 border border-white/50"
                            >
                                <div className="flex items-center gap-2 lg:gap-3">
                                    <span className="text-primary font-bold text-lg lg:text-2xl font-inter">5k+</span>
                                    <span className="text-[10px] lg:text-sm font-semibold text-gray-700 font-inter leading-tight whitespace-nowrap">Enrolled Students</span>
                                </div>
                                <div className="flex -space-x-1.5 lg:-space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <img
                                            key={i}
                                            src={`https://i.pravatar.cc/100?u=${i + 10}`}
                                            className="w-6 h-6 lg:w-9 lg:h-9 rounded-full border-2 border-white object-cover shadow-sm bg-gray-200"
                                            alt={`Enrolled Student ${i}`}
                                        />
                                    ))}
                                    <div className="w-6 h-6 lg:w-9 lg:h-9 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] lg:text-xs font-bold text-gray-500 shadow-sm">+</div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* 20% OFF */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="hidden md:flex absolute bottom-[8%] left-[-4%] lg:left-[-10%] z-20"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center gap-3 border border-white/50 pr-6"
                            >
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                                    <span className="text-xl">⏲</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-gray-900 uppercase font-inter">20% OFF</span>
                                    <span className="text-[11px] text-gray-500 font-semibold font-inter">For All Courses</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Online Supports */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                            className="absolute right-[-2%] lg:right-[-8%] top-[70%] lg:top-[55%] z-20"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="bg-white/90 backdrop-blur-md p-3 lg:p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center gap-3 lg:gap-4 border border-white/50"
                            >
                                <div className="w-10 h-10 lg:w-14 lg:h-14 bg-blue-50 rounded-full flex items-center justify-center text-primary">
                                    <Phone className="w-5 h-5 lg:w-7 lg:h-7 fill-current" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs lg:text-sm font-semibold text-gray-500 font-inter">Online Supports</span>
                                    <span className="text-sm lg:text-lg font-bold text-secondary font-inter tracking-tight">+91 8807100669</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
