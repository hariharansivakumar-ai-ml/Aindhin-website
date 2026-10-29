import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';
import { 
    Laptop, Clock, Users, ShieldCheck, GraduationCap, 
    Briefcase, Sparkles, ArrowRight, ArrowDown, BookOpen, Lightbulb 
} from 'lucide-react';
import aboutHeroImg from '../assets/About1.webp';
import mobilePicImg from '../assets/mobile pic.webp';
import FAQSection from '../components/FAQSection';
import { useEffect } from 'react';

const beliefItems = [
    {
        icon: Laptop,
        title: "Practice beats theory.",
        desc: "You learn faster when you build something.",
        accent: "bg-blue-50 text-primary border-blue-100"
    },
    {
        icon: Clock,
        title: "Your time matters.",
        desc: "Lessons are short, clear and to the point.",
        accent: "bg-purple-50 text-purple-600 border-purple-100"
    },
    {
        icon: Users,
        title: "Everyone starts somewhere.",
        desc: "Beginners are welcome here.",
        accent: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
        icon: ShieldCheck,
        title: "Honest guidance.",
        desc: "If a course is not right for you, we will tell you.",
        accent: "bg-amber-50 text-amber-600 border-amber-100"
    }
];

const whoWeHelpItems = [
    {
        icon: GraduationCap,
        title: "Students who want to be job-ready.",
        desc: "Bridge the gap between textbook concepts and industry needs with hands-on projects you can show in interviews.",
        badge: "Students",
        gradient: "from-blue-500/10 to-indigo-500/5"
    },
    {
        icon: Briefcase,
        title: "Working professionals who want to grow or change fields.",
        desc: "Learn current technologies and tools on a self-paced schedule that fits around your job and personal commitments.",
        badge: "Professionals",
        gradient: "from-purple-500/10 to-pink-500/5"
    },
    {
        icon: Sparkles,
        title: "Anyone curious who wants to learn something new at their own pace.",
        desc: "Pick up new skills from scratch with beginner-friendly explanations, recorded lessons, and supportive guidance.",
        badge: "Lifelong Learners",
        gradient: "from-emerald-500/10 to-teal-500/5"
    }
];


const AboutUs = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "About Aindhin | Online Learning Built for Real Careers";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Meet the team behind Aindhin and see why we teach practical, project-based courses for students and working professionals.");
        }
    }, []);

    return (
        <div className="min-h-screen bg-white relative overflow-hidden flex flex-col">
            {/* Background Blobs */}
            <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#FFF5F5] rounded-full blur-3xl opacity-60 z-0 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#F0F7FF] rounded-full blur-3xl opacity-60 z-0 pointer-events-none"></div>

            {/* 1. Hero Section */}
            <section className="w-full px-6 lg:px-12 pt-16 pb-12 lg:pt-20 lg:pb-16 relative z-10">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    
                    {/* Left Content */}
                    <div className="flex flex-col items-start gap-6">
                        <span className="font-inter text-primary font-bold text-xs md:text-sm tracking-widest uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
                            ABOUT AINDHIN
                        </span>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary font-inter leading-tight">
                            We help you learn skills you can actually use.
                        </h1>

                        <p className="text-gray-600 text-base lg:text-lg leading-relaxed font-inter max-w-xl">
                            Aindhin is an online learning platform for people who want to build a career, switch careers, or simply get better at what they do. Every course is built around practice, so you spend less time watching and more time doing.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Link
                                to="/our-courses"
                                className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-white font-bold font-inter text-base rounded-xl shadow-lg hover:bg-[#5236FF] transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                Explore Courses
                            </Link>
                            <Link
                                to="/contact-us"
                                className="inline-flex items-center justify-center px-7 py-3.5 bg-white border-2 border-primary text-primary hover:bg-blue-50 font-bold font-inter text-base rounded-xl shadow-sm transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    {/* Right Hero Image */}
                    <motion.div
                        variants={fadeIn("left", 0.3)}
                        initial="hidden"
                        animate="show"
                        className="relative flex justify-center lg:justify-end"
                    >
                        <img
                            src={aboutHeroImg}
                            alt="Aindhin online learning platform - practical skill development"
                            className="w-full max-w-[580px] object-contain drop-shadow-xl relative z-10"
                        />

                        {/* Floating Badges */}
                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-6 left-6 md:left-12 bg-white/95 backdrop-blur-sm p-3.5 rounded-2xl shadow-lg border border-blue-50 z-20 flex items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#FF5252]">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-inter">Hands-On</p>
                                <p className="text-sm font-bold text-secondary font-inter">Real Projects</p>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-10 right-6 bg-white/95 backdrop-blur-sm p-3.5 rounded-2xl shadow-lg border border-blue-50 z-20 flex items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#FFC107]">
                                <Lightbulb className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-inter">Verified</p>
                                <p className="text-sm font-bold text-secondary font-inter">Certificates</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 2. Our Story & What We Do Section */}
            <section className="py-14 px-6 lg:px-12 bg-slate-50/60 border-y border-gray-100 relative z-10">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    
                    {/* Our Story */}
                    <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm space-y-5">
                        <span className="font-inter text-primary font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                            OUR STORY
                        </span>
                        <h2 className="font-poppins text-2xl md:text-3xl lg:text-4xl font-bold text-secondary leading-tight">
                            Why We Started <span className="text-primary">Aindhin</span>
                        </h2>
                        <p className="text-gray-600 text-base leading-relaxed font-inter">
                            We started Aindhin because we noticed a common problem: students and professionals were spending hundreds of hours watching theory-heavy lectures without actually learning how to build anything on their own.
                        </p>
                        <p className="text-gray-600 text-base leading-relaxed font-inter">
                            We decided to fix that by creating courses where practice comes first, guided by educators who do this work every day. Today, we're dedicated to helping you gain practical skills and portfolio-ready work that you can confidently bring to any job.
                        </p>
                    </div>

                    {/* What We Do */}
                    <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm space-y-5">
                        <span className="font-inter text-emerald-600 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
                            WHAT WE DO
                        </span>
                        <h2 className="font-poppins text-2xl md:text-3xl lg:text-4xl font-bold text-secondary leading-tight">
                            Practical, Project-Based <span className="text-primary">Online Courses</span>
                        </h2>
                        <p className="text-gray-600 text-base leading-relaxed font-inter">
                            We offer online courses in AI, data, digital marketing, web development, cyber security, cloud and leadership. Each course has recorded lessons from working educators, hands-on projects, and a certificate when you finish.
                        </p>
                        
                        <div className="pt-2 flex flex-wrap gap-2">
                            {[
                                { name: "AI & Machine Learning", path: "/ai-and-machine-learning" },
                                { name: "Data Analytics", path: "/data-analytics" },
                                { name: "Digital Marketing", path: "/digital-marketing-from-basics-to-growth-campaigns" },
                                { name: "Full Stack Development", path: "/full-stack-development" },
                                { name: "Cyber Security", path: "/cyber-security" },
                                { name: "Cloud Computing", path: "/cloud-computing" },
                                { name: "Leadership", path: "/leadership-courses" },
                            ].map((topic, i) => (
                                <Link
                                    key={i}
                                    to={topic.path}
                                    className="text-xs font-semibold font-inter bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-primary px-3 py-1.5 rounded-lg border border-slate-200/60 transition-colors"
                                >
                                    {topic.name} →
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. What We Believe Section */}
            <section className="py-16 px-6 lg:px-12 bg-white relative z-10">
                <div className="max-w-[1400px] mx-auto space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <span className="font-inter text-primary font-bold text-xs uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
                            OUR VALUES
                        </span>
                        <h2 className="font-poppins text-2xl md:text-3xl lg:text-4xl font-bold text-secondary leading-tight">
                            What We <span className="text-primary">Believe</span>
                        </h2>
                        <p className="text-gray-600 text-base font-inter">
                            The core principles that guide how we build every lesson and support every learner.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {beliefItems.map((item, idx) => {
                            const IconComp = item.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    variants={fadeIn("up", 0.1 * (idx + 1))}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
                                >
                                    <div className="space-y-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.accent}`}>
                                            <IconComp className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-secondary font-inter">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed font-inter">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4. Who We Help Section */}
            <section className="py-16 px-6 lg:px-12 bg-[#F8FAFC]/50 border-t border-gray-100 relative z-10">
                <div className="max-w-[1400px] mx-auto space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <span className="font-inter text-primary font-bold text-xs uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
                            FOR EVERY LEARNER
                        </span>
                        <h2 className="font-poppins text-2xl md:text-3xl lg:text-4xl font-bold text-secondary leading-tight">
                            Who We <span className="text-primary">Help</span>
                        </h2>
                        <p className="text-gray-600 text-base font-inter">
                            Whether you are starting from zero or accelerating an established career.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {whoWeHelpItems.map((item, idx) => {
                            const IconComp = item.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    variants={fadeIn("up", 0.15 * (idx + 1))}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
                                >
                                    <div className="space-y-4">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center">
                                            <IconComp className="w-6 h-6" />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-primary font-inter block">
                                            {item.badge}
                                        </span>
                                        <h3 className="text-xl font-bold text-secondary font-inter leading-snug">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed font-inter">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 6. Closing Line + Button Section */}
            <section className="py-12 px-6 lg:px-12 bg-white flex justify-center">
                <div className="max-w-[1000px] w-full bg-gradient-to-br from-blue-50 via-indigo-50/40 to-purple-50/30 rounded-[32px] p-8 md:p-12 border border-blue-100/80 shadow-md text-center space-y-6">
                    <span className="text-4xl inline-block">👋</span>
                    <h2 className="font-poppins text-2xl md:text-3xl lg:text-4xl font-bold text-secondary leading-tight">
                        Want to know more? <span className="text-primary">We'd love to hear from you.</span>
                    </h2>
                    <p className="font-inter text-gray-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                        Whether you have questions about course details, career paths, or which program fits your goals, our team is happy to help.
                    </p>
                    <div className="pt-2">
                        <Link
                            to="/contact-us"
                            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold font-inter text-base md:text-lg rounded-xl shadow-lg hover:bg-[#5236FF] transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* 7. FAQs */}
            <FAQSection
                faqs={[
                    {
                        question: "What is the mission of Aindhin?",
                        answer: "Our mission is to help people learn skills they can actually use in real jobs, focusing on practice, hands-on building, and recognized certificates."
                    },
                    {
                        question: "How does Aindhin ensure the quality of its courses?",
                        answer: "Lessons are designed and recorded by working educators with industry experience, ensuring you learn modern workflows rather than outdated theory."
                    },
                    {
                        question: "Are the courses suitable for complete beginners?",
                        answer: "Yes. Our courses start with foundational principles and progressively build up to hands-on projects, making them accessible to beginners and career-switchers."
                    },
                    {
                        question: "How do I get in touch with the Aindhin team?",
                        answer: "You can reach us through our Contact Us page, email, or WhatsApp. We are here to answer questions and help you pick the right course without any pressure."
                    }
                ]}
            />

            {/* 8. Download App Section */}
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
                        <h2 className="font-poppins text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                            <span className="text-white">Learn Anywhere with the </span><span className="text-blue-200">Mobile App</span>
                        </h2>
                        <p className="text-white/90 text-base lg:text-lg leading-relaxed font-inter max-w-lg">
                            Access lessons, quizzes, and track your learning progress on the go with the Aindhin mobile app.
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
                                alt="Aindhin online learning platform accessible on mobile devices"
                                className="w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                            />
                        </motion.div>
                    </div>

                    {/* Mobile Button */}
                    <div className="w-full flex justify-center lg:hidden relative z-20">
                        <button
                            onClick={() => navigate('/download-app')}
                            className="flex items-center gap-2 bg-primary hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-xl font-bold font-outfit transition-all shadow-xl text-lg group"
                        >
                            Download App
                            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;

