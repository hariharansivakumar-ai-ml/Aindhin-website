import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { USER_APP_URL } from '../utils/apiClient';
import homeHeroBg from '../assets/Home hero.png';

const Hero = () => {
    return (
        <section
            className="relative overflow-hidden bg-cover bg-no-repeat bg-[position:75%_center] md:bg-[position:80%_center] lg:bg-center px-6 lg:px-12 py-10 lg:py-16 min-h-[calc(100vh-72px)] flex items-center"
            style={{ backgroundImage: `url("${homeHeroBg}")` }}
        >
            {/* Subtle mobile overlay for enhanced text readability across smaller screens */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40 md:from-white/70 md:via-white/30 md:to-transparent lg:opacity-0 pointer-events-none z-0"></div>

            <div className="max-w-[1400px] mx-auto w-full relative z-10 py-3">
                <div className="max-w-xl lg:max-w-2xl xl:max-w-[680px]">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-3.5 sm:gap-4 lg:gap-4 xl:gap-5 items-start text-left"
                    >
                        <span className="text-primary font-bold text-xs sm:text-sm font-poppins tracking-wider uppercase bg-blue-50/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-blue-100 shadow-xs">
                            Learn and Live
                        </span>

                        <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[50px] font-bold text-secondary leading-snug md:leading-[1.28] lg:leading-[1.32] font-poppins">
                            <span className="text-primary block mb-2 sm:mb-2.5 lg:whitespace-nowrap">Online Learning</span>
                            Platform in India with <span className="text-primary">Aindhin</span>
                        </h1>

                        <p className="text-sm sm:text-base lg:text-[16px] xl:text-[17px] text-gray-700 leading-relaxed font-poppins max-w-lg">
                            We bridge the gap between academic education and industry requirements by providing elite, career-focused certification courses designed to guarantee your professional success.
                        </p>

                        <div className="flex flex-wrap gap-3 mt-1.5 sm:mt-2.5">
                            <Link
                                to="/our-courses"
                                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-secondary text-white font-bold rounded-full shadow-[0_10px_30px_rgba(25,53,45,0.2)] hover:shadow-[0_20px_40px_rgba(25,53,45,0.3)] hover:-translate-y-0.5 transition-all duration-300 font-poppins text-sm"
                            >
                                Our Courses
                            </Link>
                            <a
                                href={`${USER_APP_URL}/signin`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-primary text-white font-bold rounded-full shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 transition-all duration-300 font-poppins text-sm animate-color-blink"
                            >
                                Enroll Now <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Trust Signals Underneath CTAs */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-1.5 sm:mt-2.5 pt-3 border-t border-gray-200/80 w-full max-w-lg">
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
                </div>
            </div>
        </section>
    );
};
export default Hero;
