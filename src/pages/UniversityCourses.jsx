import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, Monitor, TrendingUp, Briefcase, GraduationCap, BookOpen, Users, Clock, Star, Quote, Phone } from 'lucide-react';
import './UniversityCourses.css';
import BscImg from '../assets/B_sc_scaled.webp';
import BBAImg from '../assets/BBA_scaled.webp';
import BComImg from '../assets/B_com_scaled.webp';
import BAImg from '../assets/B_A_scaled.webp';

const courses = [
    {
        category: 'cs-it',
        title: 'B.Sc. Computer Science with AI & Data Science',
        image: BscImg,
        highlights: 'Python, Data Structures, Machine Learning, Data Analytics, Cloud Basics, Capstone Projects',
        students: 'Undergraduate · NAAC‑accredited Indian University',
        rating: '4.8',
        ratingText: 'Student Satisfaction Score',
        duration: 'UG Degree · 3 Years · Full‑time (as per Indian university norms)',
        link: '/b-sc-computer-science-with-ai-data-science/'
    },
    {
        category: 'management',
        title: 'BBA – Bachelor of Business Administration',
        image: BBAImg,
        highlights: 'Marketing, Finance, HR, Business Analytics, Entrepreneurship Projects',
        students: 'Undergraduate · Ideal foundation for MBA & corporate roles',
        rating: '4.6',
        ratingText: 'Alumni Feedback',
        duration: 'UG Degree · 3 Years · Full‑time',
        link: '/bba-bachelor-of-business-administration/'
    },
    {
        category: 'commerce',
        title: 'B.Com (Computer Applications)',
        image: BComImg,
        highlights: 'Financial Accounting, Taxation, Tally, Business Law, Computer Applications',
        students: 'Undergraduate · Commerce + Technology‑focused curriculum',
        rating: '4.5',
        ratingText: 'Student Reviews',
        duration: 'UG Degree · 3 Years · Full‑time',
        link: '/b-com-computer-applications/'
    },
    {
        category: 'arts',
        title: 'B.A. Economics with Data Analytics',
        image: BAImg,
        highlights: 'Micro & Macro Economics, Statistics, Data Analysis, Indian Economy, Policy Studies',
        students: 'Undergraduate · Ideal for policy, research & analytics careers',
        rating: '4.7',
        ratingText: 'Student Reviews',
        duration: 'UG Degree · 3 Years · Full‑time',
        link: '/b-a-economics-with-data-analytics/'
    }
];

const tabs = [
    { id: 'all', label: 'All Programs', icon: <LayoutGrid size={18} /> },
    { id: 'cs-it', label: 'Computer Science & IT', icon: <Monitor size={18} /> },
    { id: 'management', label: 'Management & Business', icon: <TrendingUp size={18} /> },
    { id: 'commerce', label: 'Commerce & Accounting', icon: <Briefcase size={18} /> },
    { id: 'arts', label: 'Arts & Humanities', icon: <GraduationCap size={18} /> }
];

const UniversityCourses = () => {
    useEffect(() => {
        document.title = "Top UGC-Approved Online Degree Programs | Aindhin University Partner";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Aindhin is an online learning platform in India offering skill-based and career-oriented courses.");
        }
    }, []);
    const [activeTab, setActiveTab] = useState('all');

    const filteredCourses = activeTab === 'all'
        ? courses
        : courses.filter(course => course.category === activeTab);

    return (
        <section className="w-full bg-[#f8faff] pt-12 pb-20 px-4 font-inter relative min-h-screen">
            <div className="max-w-[1200px] mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl lg:text-4xl font-bold text-secondary mb-3">Earn Your Degree: Accredited Online University Programs</h1>
                    <p className="text-gray-500 text-lg">Choose a stream to view curated UGC‑approved degree programs.</p>
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

                {/* Quote Card */}
                <div className="max-w-3xl mx-auto bg-white rounded-[32px] p-10 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col items-center text-center mt-4">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
                        <Quote size={32} className="text-primary" fill="currentColor" />
                    </div>
                    
                    <h2 className="text-2xl md:text-[26px] font-bold text-slate-800 italic mb-6 leading-relaxed">
                        "The roots of education are bitter, but the fruit is sweet. – Aristotle"
                    </h2>
                    
                    <p className="text-gray-500 text-[15px] md:text-base leading-relaxed mb-10 max-w-2xl">
                        We are currently bringing you an updated set of industry-leading programs. Please get in touch with our admissions team for immediate details, upcoming schedules, and curriculum brochures.
                    </p>
                    
                    <Link
                        to="/contact-us"
                        className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#1d5ed8] text-white text-[15px] font-bold rounded-xl hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all duration-300"
                    >
                        <Phone size={18} />
                        Get in Touch for Details
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default UniversityCourses;
