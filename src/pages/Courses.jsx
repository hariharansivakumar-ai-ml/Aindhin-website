import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Brain, BarChart2, Megaphone, Monitor } from 'lucide-react';

import aiMlBasicsImg from '../assets/courses/ai-ml-basics.jpg';
import comingSoonImg from '../assets/courses/coming-soon.jpg';
import dataAnalystImg from '../assets/courses/data-analyst.jpg';
import tableauImg from '../assets/courses/tableau.jpg';
import powerBiImg from '../assets/courses/power-bi.jpg';
import sqlImg from '../assets/courses/sql.jpg';

import fullStackImg from '../assets/courses/full-stack.jpg';
import javaImg from '../assets/courses/java-certification-hero.jpg';
import pythonImg from '../assets/courses/python-certification-hero.jpg';
import digitalMarketingImg from '../assets/courses/digital-marketing-hero.jpg';


const Courses = () => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        document.title = "Explore Job-Ready Online Certification Courses in India | Aindhin";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Browse our curated selection of online certification courses. Master AI, Data Science, Marketing, and more with practical, industry-aligned programs.");
        }
    }, []);
    const initialTab = searchParams.get('tab') || 'all';
    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        document.title = "Aindhin | Online Certification Courses in India";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Aindhin provides high-quality online certification courses in India, offering career-focused training, skill development, and industry-ready learning for students and professionals.");
        }
    }, []);

    // Categories
    const tabs = [
        { id: 'all', label: 'All Categories', icon: <LayoutGrid size={18} /> },
        { id: 'ai', label: 'AI and Machine Learning', icon: <Brain size={18} /> },
        { id: 'data', label: 'Data Science and Business Analytics', icon: <BarChart2 size={18} /> },
        { id: 'marketing', label: 'Digital Marketing', icon: <Megaphone size={18} /> },
        { id: 'software', label: 'Software Development', icon: <Monitor size={18} /> }
    ];

    // Course Data based on user provided HTML
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
            link: "/ai-machine-learning-from-basics-to-industry-applications/"
        },
        {
            id: 2,
            category: 'ai',
            title: "More AI Courses – Coming Soon",
            image: comingSoonImg,
            comingSoon: true
        },
        {
            id: 3,
            category: 'data',
            title: "Data Analyst – From Fundamentals to Job‑Ready Skills",
            image: dataAnalystImg,
            skills: "Excel, SQL, Power BI/Tableau, Dashboards, Business Reporting",
            students: 410,
            rating: 4.7,
            reviews: 260,
            level: "Beginner",
            duration: "16 weeks",
            link: "/data-analyst-from-fundamentals-to-job‑ready-skills/"
        },
        {
            id: 4,
            category: 'data',
            title: "Tableau – Data Visualization & Business Intelligence",
            image: tableauImg,
            description: "Master the art of storytelling with data. Create interactive dashboards, connect to various data sources, and share actionable insights that drive business decisions using Tableau's powerful visualization tools.",
            duration: "8 Weeks",
            level: "Beginner to Intermediate",
            link: "/tableau-data-visualization-business-intelligence"
        },
        {
            id: 5,
            category: 'data',
            title: "Power BI – Data Visualization & Business Intelligence",
            image: powerBiImg,
            skills: "Power BI, DAX, Data Modeling, Interactive Reports, BI Automation",
            students: 305,
            rating: 4.7,
            reviews: 190,
            level: "Beginner",
            duration: "10 weeks",
            link: "/power-bi-data-visualization-business-intelligence"
        },
        {
            id: 6,
            category: 'data',
            title: "SQL – Foundations of Data Querying & Databases",
            image: sqlImg,
            skills: "SQL Queries, Joins, Aggregations, Data Modeling, Database Design",
            students: 260,
            rating: 4.8,
            reviews: 150,
            level: "Beginner",
            duration: "6 weeks",
            link: "/sql-foundations-of-data-querying-databases/"
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
            link: "/digital-marketing-from-basics-to-growth-campaigns"
        },

        {
            id: 10,
            category: 'marketing',
            title: "More Digital Marketing Courses – Coming Soon",
            image: comingSoonImg,
            comingSoon: true
        },
        {
            id: 11,
            category: 'software',
            title: "Full‑Stack Web Development – From Frontend to Deployment",
            image: fullStackImg,
            skills: "HTML, CSS, JavaScript, Backend APIs, Databases, Deployment",
            students: 350,
            rating: 4.7,
            reviews: 210,
            level: "Beginner",
            duration: "16 weeks",
            link: "/full-stack-development"
        },
        {
            id: 12,
            category: 'software',
            title: "Java Certification",
            image: javaImg,
            skills: "Core Java, OOP, Collections, JDBC, Spring Basics",
            students: 210,
            rating: 4.6,
            reviews: 95,
            level: "Beginner",
            duration: "14 weeks",
            link: "/java-certification"
        },
        {
            id: 13,
            category: 'software',
            title: "Python Certification",
            image: pythonImg,
            skills: "Python Programming, Data Structures, APIs, Automation, Basics of Data Science",
            students: 390,
            rating: 4.8,
            reviews: 230,
            level: "Beginner",
            duration: "12 weeks",
            link: "/python-certification"
        },
        {
            id: 14,
            category: 'software',
            title: "More Software Development Courses – Coming Soon",
            image: comingSoonImg,
            comingSoon: true
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
                                className={`w-full border-none rounded-2xl px-6 py-3.5 flex items-center gap-4 text-[15px] font-bold cursor-pointer transition-all duration-300 whitespace-nowrap ${activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'bg-white text-primary hover:bg-blue-50'
                                    }`}
                            >
                                <span className={`flex-shrink-0 p-1.5 rounded-lg ${activeTab === tab.id ? 'bg-white/20' : 'bg-blue-50'}`}>
                                    {tab.icon}
                                </span>
                                <span className="text-left">{tab.label}</span>
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
                                        {course.title}
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

                                            <a
                                                href={course.link}
                                                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold no-underline transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200"
                                            >
                                                Explore Course
                                            </a>
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
        </section>
    );
};

export default Courses;
