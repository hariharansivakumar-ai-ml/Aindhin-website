import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';
import { Wallet, Smartphone, GraduationCap, Play, ArrowDown, BookOpen, Lightbulb, Star } from 'lucide-react';
import aboutHeroImg from '../assets/About1.png';
import whyChoose3Img from '../assets/why_choose_3.jpg';
import whyChoose2Img from '../assets/why_choose_2.jpg';
import whyChoose1Img from '../assets/why_choose_1.jpg';
import mobilePicImg from '../assets/mobile pic.png';

import { useEffect } from 'react';

const AboutUs = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Our Story & Mission | Aindhin: Empowering Learners Across India";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Discover how Aindhin is revolutionizing education in India. We bridge the gap between learning and careers with professional training and global opportunities.");
        }
    }, []);

    return (
        <div className="min-h-screen bg-white relative overflow-hidden flex flex-col">
            {/* Background Blobs (Hero) */}
            <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#FFF5F5] rounded-full blur-3xl opacity-60 z-0 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#F0F7FF] rounded-full blur-3xl opacity-60 z-0 pointer-events-none"></div>
            <div className="absolute top-[20%] right-[40%] w-[300px] h-[300px] bg-[#F5F3FF] rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>

            {/* 1. Hero Section: Learn and Live Better */}
            <section className="w-full px-6 lg:px-12 pt-16 pb-8 lg:pt-24 lg:pb-16 relative z-10">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Content */}
                    <div className="flex flex-col items-start gap-6 lg:gap-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary font-inter leading-tight">
                            Our Mission: Empowering India Through <span className="text-primary">Career-Focused Online Learning</span>
                        </h1>

                        <p className="text-gray-600 text-base lg:text-lg leading-relaxed font-inter max-w-lg">
                            Learn about Aindhin, an online learning platform in India offering career-focused courses, skill development programs, and industry-ready training.
                        </p>

                        <motion.div
                            variants={fadeIn("up", 0.6)}
                            initial="hidden"
                            animate="show"
                            className="relative z-20"
                        >
                            <Link
                                to="/contact-us"
                                className="inline-block bg-[#1A237E] hover:bg-primary text-white px-6 py-3 rounded-md font-medium text-base transition-colors shadow-lg"
                            >
                                Contact us
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Image */}
                    <motion.div
                        variants={fadeIn("left", 0.4)}
                        initial="hidden"
                        animate="show"
                        className="relative flex justify-center lg:justify-end"
                    >
                        <img
                            src={aboutHeroImg}
                            alt="Aindhin EdTech platform in India - Comprehensive digital learning illustration"
                            className="w-full max-w-[650px] object-contain drop-shadow-xl relative z-10"
                        />

                        {/* Decorative Floating Elements */}
                        {/* 1. Floating Book Icon */}
                        <motion.div
                            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 left-10 md:left-20 bg-white p-4 rounded-2xl shadow-lg border border-blue-50 z-20"
                        >
                            <BookOpen className="w-8 h-8 text-[#FF5252]" />
                        </motion.div>

                        {/* 2. Floating Idea Icon */}
                        <motion.div
                            animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-20 right-10 bg-white p-4 rounded-2xl shadow-lg border border-blue-50 z-20"
                        >
                            <Lightbulb className="w-8 h-8 text-[#FFC107]" />
                        </motion.div>



                        {/* 4. Background Decorative Circle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-blue-100 rounded-full z-0 opacity-50"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] border border-dashed border-blue-100/60 rounded-full z-0 opacity-50"></div>
                    </motion.div>
                </div>
            </section>

            {/* 2. Core Commitments Section */}
            <section className="py-12 px-6 lg:px-12 bg-white relative z-10">
                <div className="max-w-[1400px] mx-auto flex flex-col items-start">

                    <motion.div
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="text-left mb-10 max-w-3xl"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary font-inter mb-6 leading-tight">
                            Aindhin EdTech Platform in India: Our Core Commitments
                        </h2>
                        <p className="text-gray-600 text-base lg:text-lg leading-relaxed font-inter">
                            As a leading Aindhin online education company, we prioritize quality and learner success over mass production.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
                    >
                        {/* Card 1: Unlimited Learning */}
                        <motion.div
                            variants={fadeIn("up", 0.2)}
                            whileHover={{ y: -10 }}
                            className="bg-white p-10 rounded-[30px] border border-gray-100 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.05)] flex flex-col items-start gap-6 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="w-20 h-20 bg-[#FF5252] rounded-2xl flex items-center justify-center shadow-lg shadow-red-200 mb-2">
                                <Wallet className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-secondary font-inter">Aindhin Skill Development Platform</h3>
                            <p className="text-gray-500 leading-relaxed font-inter text-[15px]">
                                Provides unlimited, cost-effective access to world-class learning and advanced IT solutions for everyone.
                            </p>
                        </motion.div>

                        {/* Card 2: Real World Validation */}
                        <motion.div
                            variants={fadeIn("up", 0.4)}
                            whileHover={{ y: -10 }}
                            className="bg-white p-10 rounded-[30px] border border-gray-100 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.05)] flex flex-col items-start gap-6 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="w-20 h-20 bg-[#448AFF] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 mb-2">
                                <Smartphone className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-secondary font-inter">Real World Validation</h3>
                            <p className="text-gray-500 leading-relaxed font-inter text-[15px]">
                                Structured pathways connect learning directly to real-world job opportunities and career advancement.
                            </p>
                        </motion.div>

                        {/* Card 3: Career Pathways */}
                        <motion.div
                            variants={fadeIn("up", 0.6)}
                            whileHover={{ y: -10 }}
                            className="bg-white p-10 rounded-[30px] border border-gray-100 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.05)] flex flex-col items-start gap-6 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="w-20 h-20 bg-[#00C853] rounded-2xl flex items-center justify-center shadow-lg shadow-green-200 mb-2">
                                <GraduationCap className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-secondary font-inter">Career Pathways</h3>
                            <p className="text-gray-500 leading-relaxed font-inter text-[15px]">
                                Our recognized programs link high quality education directly to industry validation and career progress.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 3. Learn. Grow. Innovate Section */}
            <section className="w-full bg-white py-12 px-6 lg:px-12 relative z-10 border-t border-gray-100/50">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Image Collage */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[400px] lg:h-[480px] w-full max-w-[500px] mx-auto lg:mx-0"
                    >
                        {/* Main Image (Group) */}
                        <div className="absolute top-0 left-0 w-[85%] h-[85%] rounded-[30px] overflow-hidden z-10">
                            <img
                                src={whyChoose3Img}
                                alt="Aindhin online education company fosters collaborative group study"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Secondary Image (Individual/Work) */}
                        <div className="absolute bottom-0 right-0 w-[55%] h-[45%] rounded-[20px] overflow-hidden border-[6px] border-white shadow-xl z-20">
                            <img
                                src={whyChoose2Img}
                                alt="Career-focused learning platform India training session for students"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/40 active:scale-95 transition-colors"
                                >
                                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                                </motion.div>
                            </div>
                        </div>

                        {/* Decorative Dots */}
                        <div className="absolute bottom-4 left-8 grid grid-cols-4 gap-2 z-0">
                            {[...Array(16)].map((_, i) => (
                                <div key={i} className="w-2 h-2 bg-gray-200 rounded-full"></div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-6"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary font-inter uppercase leading-tight">
                            Aindhin: Your Partner for Professional Growth & Career Success in India
                        </h2>

                        <p className="text-gray-600 text-base lg:text-lg leading-relaxed font-inter">
                            Aindhin is a global platform built to empower learners, job seekers, and businesses. We provide unlimited access to world-class education, connect users to real industry opportunities, and support enterprises with advanced IT solutions. Whether you're upgrading skills, building your career, or growing your organization, Aindhin helps you unlock your potential and thrive in a rapidly evolving world.
                        </p>

                        {/* Stats Row */}
                        <div className="flex flex-wrap gap-8 lg:gap-12 mt-8 justify-center lg:justify-start">
                            <div className="flex flex-col gap-1 relative pl-2">
                                <span className="absolute top-1 left-[-10px] w-3 h-3 rounded-full bg-[#1A1A1A]"></span>
                                <div className="flex items-center gap-1">
                                    <span className="text-4xl font-bold text-secondary font-inter">10</span>
                                    <span className="text-3xl font-bold text-[#FF5252]">+</span>
                                </div>
                                <span className="text-gray-500 font-medium font-inter">Courses</span>
                            </div>

                            <div className="flex flex-col gap-1 relative pl-2">
                                <span className="absolute top-1 left-[-10px] w-3 h-3 rounded-full bg-[#1A1A1A]"></span>
                                <div className="flex items-center gap-1">
                                    <span className="text-4xl font-bold text-secondary font-inter">2 k</span>
                                    <span className="text-3xl font-bold text-[#448AFF]">+</span>
                                </div>
                                <span className="text-gray-500 font-medium font-inter">Students Trained</span>
                            </div>

                            <div className="flex flex-col gap-1 relative pl-2">
                                <span className="absolute top-1 left-[-10px] w-3 h-3 rounded-full bg-[#1A1A1A]"></span>
                                <div className="flex items-center gap-1">
                                    <span className="text-4xl font-bold text-secondary font-inter">100</span>
                                    <span className="text-3xl font-bold text-[#00C853]">+</span>
                                </div>
                                <span className="text-gray-500 font-medium font-inter">Team Members</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 4. Why Choose Us Section */}
            <section className="py-12 px-6 lg:px-12 bg-[#F8FAFC]/30 relative z-10 border-t border-gray-100/50">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-start gap-6"
                    >
                        <span className="text-primary font-semibold text-lg tracking-wide uppercase font-inter">
                            Why Choose Us
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary font-inter leading-tight">
                            AI-Powered Online Learning Platform India
                        </h2>
                        <p className="text-gray-600 text-base lg:text-lg leading-relaxed font-inter max-w-xl">
                            At Aindhin, we are committed to transforming the way people learn, build careers, and innovate. Our platform connects world-class education with real-world opportunities...
                        </p>

                        {/* Graduation Item */}
                        <div className="flex items-start gap-6 mt-6 group">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center p-3 border border-gray-50 group-hover:scale-105 transition-transform">
                                <GraduationCap className="w-10 h-10 text-primary" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-2xl font-bold text-secondary font-inter">96% Completion Rate</h4>
                                <p className="text-gray-500 leading-relaxed font-inter text-base max-w-sm">
                                    Engaging content and flexible learning paths keep learners motivated and successful.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Big Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="rounded-[40px] overflow-hidden shadow-2xl relative"
                    >
                        <img
                            src={whyChoose1Img}
                            alt="Aindhin skill development platform - empowering learners to succeed"
                            className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto min-h-[400px]"
                        />
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#6366F1]/10 rounded-bl-full z-0"></div>
                    </motion.div>
                </div>
            </section>

            {/* 5. Download App Section - Refined and Added to About Us */}
            <section className="py-12 px-6 lg:px-12 bg-white border-t border-gray-100/50 flex justify-center relative overflow-hidden">
                <div className="max-w-[1000px] w-full bg-gradient-to-br from-[#002FA7] via-[#0051D4] to-[#4FA1FF] rounded-[40px] px-6 py-10 md:px-12 md:py-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">

                    {/* Content */}
                    <motion.div
                        variants={fadeIn("right", 0.2)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="flex flex-col items-start text-white max-w-xl z-20 space-y-6"
                    >
                        <span className="text-white/80 font-outfit text-lg font-medium tracking-wide uppercase">Mobile App</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter leading-tight">
                            Learn Anywhere with the Aindhin Mobile App
                        </h2>
                        <p className="text-white/90 text-base lg:text-lg leading-relaxed font-inter max-w-lg">
                            Aindhin is an edutech platform that makes learning simple, interactive, and accessible from anywhere. Explore lessons, quizzes, and progress tracking right from your phone.
                            <br /><br />
                            Stay ahead in your studies and keep learning on the go with the Aindhin mobile app.
                        </p>

                        <button
                            onClick={() => navigate('/download-app')}
                            className="hidden lg:flex items-center gap-2 bg-primary hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl font-bold font-outfit transition-all shadow-xl text-lg mt-4 group"
                        >
                            Download App
                            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        </button>
                    </motion.div>

                    {/* Image */}
                    <div className="relative z-20 w-full lg:w-[45%] flex justify-center lg:justify-end">
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-full max-w-[380px]"
                        >
                            <img
                                src={mobilePicImg}
                                alt="AI-powered online learning platform India accessible on mobile devices"
                                className="w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                            />
                        </motion.div>
                    </div>

                    {/* Mobile Button (Visible only on mobile) */}
                    <div className="w-full flex justify-center lg:hidden relative z-20">
                        <button
                            onClick={() => navigate('/download-app')}
                            className="flex items-center gap-2 bg-primary hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl font-bold font-outfit transition-all shadow-xl text-lg group"
                        >
                            Download App
                            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        </button>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-white/10 rounded-full blur-[80px]"></div>
                    <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px]"></div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
