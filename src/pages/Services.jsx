import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, float } from '../utils/motion';
import { BookOpen, GraduationCap, Briefcase, Users } from 'lucide-react';
import aboutImg from '../assets/about_img.webp';
import servicesHeroImg from '../assets/Gemini_Generated_Image_2ly66v2ly66v2ly6.webp';
import collegePartnershipImg from '../assets/steptodown.com436606 (1).webp';

import { useEffect } from 'react';

const Services = () => {
    useEffect(() => {
        document.title = "Professional Training & Certification | Online Skill Development in India";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Aindhin is an online learning platform in India offering skill-based and career-oriented courses.");
        }
    }, []);

    return (
        <div className="min-h-screen bg-white relative overflow-hidden flex flex-col pt-8 lg:pt-0">
            {/* Background Blobs (Optional/Subtle) */}
            <motion.div
                animate={float(10, 40)}
                className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#F5F3FF] rounded-full blur-3xl opacity-60 z-0 pointer-events-none"
            ></motion.div>

            {/* Hero Section */}
            <section className="w-full relative z-10 overflow-hidden bg-white">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-4 lg:gap-0">

                    {/* Left Content */}
                    <div className="flex flex-col items-start gap-4 lg:gap-2 px-6 lg:pl-12 pt-8 pb-0 lg:py-12 z-20">
                        <motion.h1
                            variants={fadeIn("down", 0.2)}
                            initial="hidden"
                            animate="show"
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary font-inter uppercase leading-tight"
                        >
                            Future-Proof Your Career: <br className="hidden lg:block" /> Online Skill Development
                        </motion.h1>

                        <motion.p
                            variants={fadeIn("right", 0.4)}
                            initial="hidden"
                            animate="show"
                            className="text-gray-600 text-base lg:text-lg leading-relaxed font-inter max-w-3xl"
                        >
                            Aindhin offers <span className="font-bold text-gray-900">online skill development courses in India</span> with career-focused training, certification programs, and industry-ready learning for students.
                        </motion.p>
                    </div>

                    {/* Right Illustration */}
                    <div className="relative w-full h-full min-h-[300px] lg:min-h-[600px] flex items-center justify-center mt-10 md:mt-12 lg:mt-0">

                        {/* Main Image */}
                        <motion.div
                            variants={fadeIn("left", 0.4)}
                            initial="hidden"
                            animate="show"
                            className="relative z-10 w-full max-w-[500px] lg:max-w-[600px] lg:mr-[-50px]"
                        >
                            <div className="relative">
                                <img
                                    src={servicesHeroImg}
                                    alt="Career-focused online courses in India – Leading online career development courses India for professionals"
                                    className="w-full h-auto object-contain relative z-10 scale-125 translate-x-12"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How Aindhin Works Section */}
            <section className="w-full px-6 lg:px-12 pt-4 pb-12 lg:pt-8 lg:pb-16 bg-[#F8FAFC]">
                <div className="max-w-[1200px] mx-auto">
                    {/* Section Header */}
                    <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
                        <motion.h2
                            variants={fadeIn("up", 0.2)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary font-inter mb-6 leading-tight"
                        >
                            Professional Skill Training Programs in India
                        </motion.h2>

                        {/* Decorative Line (Matches screenshot's accent) */}
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 60 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-1.5 bg-gradient-to-r from-[#9333EA] to-[#E11D48] rounded-full mb-8"
                        ></motion.div>

                        <motion.p
                            variants={fadeIn("up", 0.3)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="text-gray-600 text-base lg:text-lg leading-relaxed font-inter max-w-2xl"
                        >
                            Select Your Learning Path: Aindhin Provides Four Specialized Course Categories
                        </motion.p>
                    </div>

                    {/* Service Cards Grid */}
                    <motion.div
                        variants={staggerContainer(0.2, 0.1)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
                    >
                        {/* Card 1: Certification Courses */}
                        <ServiceCard
                            icon={<BookOpen className="w-10 h-10 text-white" />}
                            title="INDUSTRY-READY CERTIFICATION COURSES IN INDIA"
                            description="Certifications are offered either directly by Aindhin or through industry-leading companies such as AWS, Google, Microsoft, and more. These programs include short-term skill-building courses, career-focused certificates, and practical hands-on learning, delivered through a flexible blend of self-paced modules and live classes."
                            delay={0.1}
                        />

                        {/* Card 2: University Degree Courses */}
                        <ServiceCard
                            icon={<GraduationCap className="w-10 h-10 text-white" />}
                            title="UNIVERSITY DEGREE COURSES"
                            description="Learners can study with top Indian and international universities through our academic partnerships, gaining access to a wide range of high-quality programs. These offerings include Bachelors, Masters, PG Diplomas, and global online degree pathways designed to support diverse educational and career goals."
                            delay={0.2}
                        />

                        {/* Card 3: Corporate Courses */}
                        <ServiceCard
                            icon={<Briefcase className="w-10 h-10 text-white" />}
                            title="CORPORATE COURSES"
                            description="Aindhin’s corporate courses help organizations upskill employees with practical, industry-relevant skills. Delivered through online modules and live sessions, these programs enhance performance and provide professional certifications."
                            delay={0.3}
                        />

                        {/* Card 4: Leadership Courses */}
                        <ServiceCard
                            icon={<Users className="w-10 h-10 text-white" />}
                            title="LEADERSHIP COURSES"
                            description="Leadership courses are designed to develop managerial and strategic skills. Through workshops, live sessions, and mentorship, learners gain the knowledge and confidence to lead teams effectively and drive business impact."
                            delay={0.4}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Why Colleges Partner Section */}
            <section className="w-full px-6 lg:px-12 py-12 lg:py-16 bg-white">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-start gap-6"
                    >
                        <div className="flex items-center gap-4">
                            <span className="h-px w-10 bg-primary"></span>
                            <span className="text-secondary font-inter font-medium tracking-wider uppercase text-sm">
                                Learn and Live
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-secondary leading-tight">
                            Why Colleges and <br /> Universities Partner <br /> with Aindhin?
                        </h2>

                        <div className="text-text text-base lg:text-lg leading-relaxed font-inter w-full lg:max-w-lg space-y-2">
                            {[
                                "Industry-aligned curriculum, job-ready skills,",
                                "flexible online learning, global certifications,",
                                "seamless integration, lifelong career support,",
                                "and affordable licensing."
                            ].map((text, i) => (
                                <motion.p
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                                >
                                    {text}
                                </motion.p>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        whileHover={{ scale: 1.02, rotate: 1 }}
                        className="relative flex justify-center lg:justify-end cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-[#9333EA]/10 rounded-3xl -rotate-3 transition-transform group-hover:rotate-2"></div>
                        <img
                            src={collegePartnershipImg}
                            alt="Professional skill training programs in India – Industry-ready certification courses for colleges"
                            className="relative z-10 w-full max-w-[550px] object-contain drop-shadow-2xl rounded-2xl"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Partnership Models Section */}
            <section className="w-full py-12 lg:py-16 bg-white overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left Column: Visuals */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="hidden lg:flex items-end justify-center h-[400px] relative bg-blue-50 rounded-[30px] overflow-hidden"
                        >
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1A237E]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#9333EA]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

                            {/* Bars Illustration */}
                            <div className="flex items-end gap-3 sm:gap-4 mb-20 relative z-10">
                                <motion.div initial={{ height: 0 }} whileInView={{ height: 120 }} transition={{ duration: 1 }} className="w-8 sm:w-10 bg-[#E11D48]/20 rounded-t-lg"></motion.div>
                                <motion.div initial={{ height: 0 }} whileInView={{ height: 180 }} transition={{ duration: 1, delay: 0.1 }} className="w-8 sm:w-10 bg-[#E11D48]/40 rounded-t-lg"></motion.div>
                                <motion.div initial={{ height: 0 }} whileInView={{ height: 150 }} transition={{ duration: 1, delay: 0.2 }} className="w-8 sm:w-10 bg-[#E11D48]/30 rounded-t-lg"></motion.div>
                                <motion.div initial={{ height: 0 }} whileInView={{ height: 240 }} transition={{ duration: 1, delay: 0.3 }} className="w-8 sm:w-10 bg-[#E11D48]/60 rounded-t-lg"></motion.div>
                                <motion.div initial={{ height: 0 }} whileInView={{ height: 200 }} transition={{ duration: 1, delay: 0.4 }} className="w-8 sm:w-10 bg-[#E11D48]/50 rounded-t-lg"></motion.div>
                            </div>
                        </motion.div>

                        {/* Right Column: Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col gap-6"
                        >
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary font-inter uppercase leading-tight">
                                Advanced Online <br /> Skill Training Programs <br /> in India
                            </h1>
                            <p className="text-gray-600 text-base lg:text-lg leading-relaxed font-inter max-w-3xl">
                                Aindhin provides professional online training programs in India designed to help students and professionals excel in their careers with job-ready expertise.
                            </p>
                        </motion.div>

                    </div>
                </div>
            </section>
        </div>
    );
};

// Helper Component for Service Cards
const ServiceCard = ({ icon, title, description, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all flex flex-col items-center text-center group max-w-[550px] mx-auto w-full"
        >
            <div className="w-16 h-16 bg-[#9333EA] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="scale-75 origin-center">{icon}</div>
            </div>
            <h3 className="text-lg lg:text-xl font-bold text-[#1A1A1A] font-inter mb-4 tracking-tight">
                {title}
            </h3>
            <p className="text-gray-600 text-sm lg:text-[15px] leading-[1.6] font-inter">
                {description}
            </p>
        </motion.div>
    );
};

export default Services;
