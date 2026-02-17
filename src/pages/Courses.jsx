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
    const initialTab = searchParams.get('tab') || 'all';
    const [activeTab, setActiveTab] = useState(initialTab);

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
        <section className="w-full bg-[#f3f7ff] py-16 px-4 font-inter relative min-h-screen">
            <div className="max-w-[1200px] mx-auto">

                {/* Header */}
                <div className="flex flex-wrap items-end justify-between gap-5 mb-7">
                    <div>
                        <h2 className="text-[28px] font-bold text-[#0f172a] mb-1.5 leading-tight">Explore Our Top Courses</h2>
                        <p className="text-[#6b7280] text-sm m-0">Pick a category to see curated programs.</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-nowrap items-center gap-2.5 p-2.5 mt-2.5 bg-white rounded-full shadow-[0_16px_40px_rgba(15,23,42,0.1)] w-full max-w-fit mx-auto overflow-x-auto mb-7 scrollbar-hide">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                border-none rounded-full px-[22px] py-[10px] inline-flex items-center gap-2 
                                text-sm font-semibold cursor-pointer whitespace-nowrap transition-all duration-200 ease-out
                                ${activeTab === tab.id
                                    ? 'bg-[#0066ff] text-white shadow-[0_12px_28px_rgba(37,99,235,0.55)] transform translate-y-[-1px]'
                                    : 'bg-transparent text-[#1d4ed8] hover:bg-[#eff6ff] hover:translate-y-[-1px]'
                                }
                            `}
                        >
                            <span className="flex items-center">{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px] mt-7">
                    <AnimatePresence mode="popLayout">
                        {filteredCourses.map(course => (
                            <motion.article
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                key={course.id}
                                className="bg-white rounded-[22px] overflow-hidden shadow-[0_12px_30px_rgba(15,23,42,0.12)] flex flex-col border border-[rgba(226,232,240,0.8)] hover:translate-y-[-4px] hover:shadow-[0_20px_48px_rgba(15,23,42,0.18)] hover:border-[rgba(129,140,248,0.65)] transition-all duration-200 ease-out group"
                            >
                                <div className="relative w-full aspect-video bg-black overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover block"
                                    />
                                </div>

                                <div className="p-[16px_18px_18px] flex flex-col items-start flex-1">
                                    <h3 className="text-base font-bold text-[#0f172a] mb-2.5 leading-snug">
                                        {course.title}
                                    </h3>

                                    {!course.comingSoon ? (
                                        <>
                                            <div className="text-[13px] text-[#6b7280] mb-2.5 w-full">
                                                <p className="mb-1.5"><strong className="text-[#0f172a]">Skills you'll gain:</strong> {course.skills}</p>
                                                <div className="text-xs text-[#6b7280] mb-1">{course.students} students enrolled</div>
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <span className="text-[#2563eb] text-sm">★</span>
                                                    <span className="font-semibold text-[#0f172a]">{course.rating}</span>
                                                    <span className="text-xs">({course.reviews} reviews)</span>
                                                </div>
                                                <div className="text-xs">{course.level} · {course.duration}</div>
                                            </div>

                                            <a
                                                href={course.link}
                                                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#0066ff] text-white text-[13px] font-semibold no-underline border-none cursor-pointer shadow-[0_8px_18px_rgba(37,99,235,0.4)] mt-auto transition-all duration-200 hover:bg-[#004fd1] hover:shadow-[0_12px_26px_rgba(37,99,235,0.6)] hover:translate-y-[-1px]"
                                            >
                                                Explore More
                                            </a>
                                        </>
                                    ) : (
                                        <div className="flex-1"></div>
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
