import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowUpRight,
    GraduationCap,
    Users,
    LineChart,
    Award,
    Headphones,
    Phone,
} from 'lucide-react';
import { USER_APP_URL } from '../utils/apiClient';
import homeHeroBg from '../assets/Home hero.png';

const Hero = () => {
    return (
        <section
            className="relative overflow-hidden bg-cover bg-no-repeat bg-[position:75%_center] md:bg-[position:80%_center] lg:bg-center px-4 sm:px-6 lg:px-12 py-8 lg:py-12 min-h-[calc(100vh-72px)] flex items-center"
            style={{ backgroundImage: `url("${homeHeroBg}")` }}
        >
            {/* Subtle overlay on smaller screens for enhanced text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/30 md:from-white/75 md:via-white/35 md:to-transparent lg:opacity-0 pointer-events-none z-0"></div>

            <div className="max-w-[1440px] mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">
                {/* Left Column: Heading, Subtitle, CTAs, Trust Signals */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full lg:max-w-[530px] xl:max-w-[580px] flex flex-col gap-3.5 sm:gap-4 lg:gap-4 xl:gap-5 items-start text-left"
                >
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 text-primary text-xs font-bold uppercase tracking-wider font-poppins border border-blue-200/60 shadow-xs">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        LEARN AND LIVE
                    </span>

                    <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[50px] font-bold text-secondary leading-snug md:leading-[1.24] lg:leading-[1.26] font-poppins">
                        <span className="text-primary block mb-1 sm:mb-2">Online Learning</span>
                        Platform in India with <span className="text-primary">Aindhin</span>
                    </h1>

                    <p className="text-sm sm:text-base lg:text-[15px] xl:text-[16px] text-gray-700 leading-relaxed font-poppins max-w-lg">
                        We bridge the gap between academic education and industry requirements by providing elite, career-focused certification courses designed to guarantee your professional success.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-3.5 mt-1 sm:mt-2">
                        <Link
                            to="/our-courses"
                            className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 bg-secondary text-white font-semibold rounded-full shadow-[0_10px_25px_rgba(25,53,45,0.25)] hover:shadow-[0_15px_30px_rgba(25,53,45,0.35)] hover:-translate-y-0.5 transition-all duration-300 font-poppins text-sm"
                        >
                            Our Courses <ArrowUpRight className="w-4 h-4" />
                        </Link>
                        <a
                            href={`${USER_APP_URL}/signin`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 bg-white text-primary border-2 border-primary font-semibold rounded-full shadow-[0_4px_15px_rgba(13,110,253,0.12)] hover:bg-primary hover:text-white hover:-translate-y-0.5 transition-all duration-300 font-poppins text-sm"
                        >
                            Enroll Now <ArrowUpRight className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Trust Signals Underneath CTAs */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-2 pt-3.5 border-t border-gray-200/90 w-full max-w-lg">
                        <div className="flex items-center gap-2">
                            <span className="text-lg sm:text-xl">🏆</span>
                            <span className="text-xs font-semibold text-gray-700 font-poppins leading-tight">Industry<br />Certifications</span>
                        </div>
                        <div className="w-px h-6 bg-gray-300"></div>
                        <div className="flex items-center gap-2">
                            <span className="text-lg sm:text-xl">🤝</span>
                            <span className="text-xs font-semibold text-gray-700 font-poppins leading-tight">Top Partner<br />Institutions</span>
                        </div>
                        <div className="w-px h-6 bg-gray-300"></div>
                        <div className="flex items-center gap-2">
                            <span className="text-lg sm:text-xl">⭐</span>
                            <span className="text-xs font-semibold text-gray-700 font-poppins leading-tight">100+ Glowing<br />Testimonials</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Interactive Floating Cards Section */}
                <div className="relative w-full lg:w-auto flex-1 h-full min-h-[360px] lg:min-h-[480px] flex items-center justify-end pointer-events-none">
                    {/* Middle-Top: 5k+ Enrolled Students Card */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="absolute top-[2%] left-[4%] sm:left-[10%] lg:left-[4%] xl:left-[10%] z-20 pointer-events-auto"
                    >
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-white/80 flex flex-col gap-2 min-w-[170px]"
                        >
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-blue-50 text-primary flex items-center justify-center">
                                    <Users className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-primary font-bold text-base font-poppins leading-none">5k+</span>
                                    <span className="text-[11px] font-medium text-gray-600 font-poppins">Enrolled Students</span>
                                </div>
                            </div>
                            <div className="flex -space-x-2 pl-0.5">
                                {[11, 22, 33, 44].map((id) => (
                                    <img
                                        key={id}
                                        src={`https://i.pravatar.cc/100?img=${id}`}
                                        className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs bg-gray-100"
                                        alt="Student"
                                    />
                                ))}
                                <div className="w-7 h-7 rounded-full border-2 border-white bg-blue-50 text-primary flex items-center justify-center text-[10px] font-bold shadow-xs">
                                    +
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right-Side Stack of 4 Cards */}
                    <div className="flex flex-col gap-3.5 z-20 pointer-events-auto w-full sm:w-[250px] lg:w-[260px]">
                        {/* Card 1: Live Projects */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                                className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.08)] border border-white/80 flex items-center gap-3.5 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                                    <LineChart className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs sm:text-sm font-bold text-gray-900 font-poppins leading-tight">Live Projects</span>
                                    <span className="text-[10px] sm:text-[11px] text-gray-500 font-poppins mt-0.5">Get Hands-on Experience</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Card 2: Expert Mentors */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                                className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.08)] border border-white/80 flex items-center gap-3.5 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                                    <Award className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs sm:text-sm font-bold text-gray-900 font-poppins leading-tight">Expert Mentors</span>
                                    <span className="text-[10px] sm:text-[11px] text-gray-500 font-poppins mt-0.5">Learn from Industry Experts</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Card 3: 24/7 Support */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                                className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.08)] border border-white/80 flex items-center gap-3.5 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                                    <Headphones className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs sm:text-sm font-bold text-gray-900 font-poppins leading-tight">24/7 Support</span>
                                    <span className="text-[10px] sm:text-[11px] text-gray-500 font-poppins mt-0.5">We're Always Here</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Card 4: Online Supports / Phone */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                        >
                            <motion.div
                                animate={{ y: [0, -7, 0] }}
                                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                            >
                                <a
                                    href="tel:+918807100669"
                                    className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.08)] border border-white/80 flex items-center gap-3.5 hover:shadow-xl hover:border-primary/40 transition-all duration-300 cursor-pointer block"
                                >
                                    <div className="w-11 h-11 rounded-full bg-blue-50 text-primary flex items-center justify-center shrink-0 shadow-inner">
                                        <Phone className="w-5 h-5 fill-current" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-medium text-gray-500 font-poppins leading-tight">Online Supports</span>
                                        <span className="text-xs sm:text-sm font-bold text-secondary font-poppins mt-0.5 tracking-tight">+91 8807100669</span>
                                    </div>
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
