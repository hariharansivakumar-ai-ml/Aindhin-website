import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Brain, BarChart2, Megaphone, Monitor } from 'lucide-react';
import FAQSection from '../components/FAQSection';

import aiMlBasicsImg from '../assets/courses/ai-ml-basics.webp';
import comingSoonImg from '../assets/courses/coming-soon.webp';
import dataAnalystImg from '../assets/courses/data-analyst.webp';
import tableauImg from '../assets/courses/tableau.webp';
import powerBiImg from '../assets/courses/power-bi.webp';
import sqlImg from '../assets/courses/sql.webp';

import digitalMarketingImg from '../assets/courses/digital-marketing-hero.webp';
import cybersecurityImg from '../assets/cybersecurity.webp';
import abacusImg from '../assets/abacus_course.webp';
import { Gamepad2 } from 'lucide-react';


const Courses = () => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        document.title = "Explore Job-Ready Online Certification Courses in India | Aindhin";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Aindhin is an online learning platform in India offering skill-based and career-oriented courses.");
        }
    }, []);
    const initialTab = searchParams.get('tab') || 'all';
    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        document.title = "Aindhin | Online Certification Courses in India";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Aindhin is an online learning platform in India offering skill-based and career-oriented courses.");
        }
    }, []);

    const tabs = [
        { id: 'all', label: 'All Categories', icon: <LayoutGrid size={18} /> },
        { id: 'ai', label: 'AI and Machine Learning', icon: <Brain size={18} /> },
        { id: 'marketing', label: 'Digital Marketing', icon: <Megaphone size={18} /> },
        { id: 'security', label: 'Cybersecurity', icon: <Monitor size={18} /> },
        { id: 'kids', label: 'Kids Programs', icon: <Gamepad2 size={18} /> }
    ];

    const courses = [
        {
            id: 1,
            category: 'ai',
            title: "AI & Machine Learning – From Basics to Industry Applications",
            image: aiMlBasicsImg,
            skills: "Machine Learning, Deep Learning, Python, Model Deployment, MLOps",
            students: 320,
            rating: 4.8,
            reviews: 180,
            level: "Beginner",
            duration: "12 weeks",
            link: "/ai-machine-learning-from-basics-to-industry-applications",
            externalLink: "https://user.aindhin.com/course/AD-944b67c3bbf11c65037beb11b0c1ada8"
        },
        {
            id: 8,
            category: 'marketing',
            title: "Digital Marketing – From Basics to Growth Campaigns",
            image: digitalMarketingImg,
            skills: "SEO, SEM, Social Media, Email Marketing, Analytics, Growth Strategies",
            students: 180,
            rating: 4.6,
            reviews: 95,
            level: "Beginner",
            duration: "10 weeks",
            link: "/digital-marketing-from-basics-to-growth-campaigns",
            externalLink: "https://user.aindhin.com/course/AD-944b67c3bbf11c6b037beb11b0c1ada8"
        },
        {
            id: 15,
            category: 'security',
            title: "Cybersecurity – Protecting the Digital Frontier",
            image: cybersecurityImg,
            skills: "Network Security, Ethical Hacking, Threat Intelligence, Cryptography, Security Auditing",
            students: 280,
            rating: 4.9,
            reviews: 140,
            level: "Beginner",
            duration: "14 weeks",
            link: "/cyber-security",
            externalLink: "https://user.aindhin.com/course/AD-944b67c3bbf11c6a037beb11b0c1ada8"
        },
        {
            id: 20,
            category: 'kids',
            title: "Abacus & Mental Math Masterclass",
            image: abacusImg,
            skills: "Mental calculation, Concentration, Memory enhancement, Speed math",
            students: 150,
            rating: 4.9,
            reviews: 110,
            level: "Beginner",
            duration: "12 weeks",
            link: "/abacus-mental-math-masterclass",
            externalLink: "https://user.aindhin.com/course/AD-abacus-mental-math"
        }
    ];

    const filteredCourses = activeTab === 'all'
        ? courses.filter(c => !c.comingSoon)
        : courses.filter(c => c.category === activeTab);

    return (
        <section className="w-full bg-[#f8faff] pt-12 pb-20 px-6 lg:px-12 font-inter relative min-h-screen">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl lg:text-4xl font-bold text-secondary mb-3">Explore Our Top Courses</h1>
                    <p className="text-gray-500 text-lg">Pick a category to see curated programs.</p>
                </div>

                {/* ── MOBILE: vertical card list ─────────────────────────────── */}
                <div className="md:hidden max-w-[450px] mx-auto mb-10">
                    <div className="bg-white p-3 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] flex flex-col gap-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full border-none rounded-2xl px-6 py-3.5 flex items-center gap-4 text-[15px] font-bold cursor-pointer transition-all duration-300 ${activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'bg-white text-primary hover:bg-blue-50'
                                    }`}
                            >
                                <span className={`flex-shrink-0 p-1.5 rounded-lg ${activeTab === tab.id ? 'bg-white/20' : 'bg-blue-50'}`}>
                                    {tab.icon}
                                </span>
                                <span className="text-left leading-tight">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── TABLET + DESKTOP: horizontal pill tab-bar ─────────────── */}
                <div className="hidden md:flex items-center gap-2 mb-10 overflow-x-auto pb-1 scrollbar-none flex-wrap">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap border transition-all duration-200 ${activeTab === tab.id
                                ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-primary/40 hover:text-primary hover:bg-blue-50'
                                }`}
                        >
                            <span className={`shrink-0 ${activeTab === tab.id ? 'text-white' : 'text-primary'}`}>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredCourses.map(course => (
                            <motion.article
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                key={course.id}
                                className="bg-white rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
                            >
                                <div className="relative w-full aspect-[16/7] overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>

                                <div className="p-5 flex flex-col items-start flex-1">
                                    <h3 className="text-base font-bold text-secondary mb-2 leading-tight">
                                        <a 
                                            href={course.externalLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="hover:text-primary transition-colors"
                                        >
                                            {course.title}
                                        </a>
                                    </h3>

                                    {!course.comingSoon ? (
                                        <>
                                            <div className="space-y-2.5 mb-4 flex-1">
                                                <p className="text-[13px] text-gray-500 leading-relaxed">
                                                    <strong className="text-secondary font-bold">Skills you'll gain:</strong> {course.skills}
                                                </p>

                                                <div className="flex items-center gap-4 text-sm font-medium text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <span className="text-yellow-400 text-lg">★</span>
                                                        <span className="text-secondary font-bold">{course.rating}</span>
                                                        <span>({course.reviews})</span>
                                                    </span>
                                                    <span>•</span>
                                                    <span>{course.duration}</span>
                                                </div>

                                                <div className="text-[13px] font-bold text-primary bg-blue-50 px-4 py-1.5 rounded-full inline-block">
                                                    {course.students} students enrolled
                                                </div>
                                            </div>
                                            <Link
                                                to={course.link}
                                                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold no-underline transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200"
                                            >
                                                Explore Course
                                            </Link>
                                        </>
                                    ) : (
                                        <div className="mt-4 px-6 py-3 bg-gray-50 rounded-2xl text-gray-400 font-bold text-sm">
                                            Stay Tuned
                                        </div>
                                    )}
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>

            </div>

            {/* General FAQs */}
            <FAQSection
                faqs={[
                    {
                        question: "Which certification courses are currently trending at Aindhin?",
                        answer: "Our AI & Machine Learning, Data Analytics, and Digital Marketing certifications are highly popular due to the increasing demand for these skills in the global job market."
                    },
                    {
                        question: "Are there any prerequisites for enrolling in advanced courses like AI/ML?",
                        answer: "While some courses are beginner-friendly, others may benefit from a basic understanding of mathematics or programming. Detailed prerequisites are listed on each course page."
                    },
                    {
                        question: "How does the hands-on project component work?",
                        answer: "Every course includes real-world projects where you apply what you've learned to actual industry datasets, ensuring you build a portfolio that showcases your practical expertise."
                    },
                    {
                        question: "Can I switch between courses if my interests change?",
                        answer: "Yes, we offer flexibility to our learners. If you feel another course better aligns with your career goals, our academic advisors can help you transition smoothly."
                    }
                ]}
            />
        </section>
    );
};

export default Courses;
