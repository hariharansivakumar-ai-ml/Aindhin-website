import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, Monitor, TrendingUp, Briefcase, GraduationCap, BookOpen, Users, Clock, Star } from 'lucide-react';
import './UniversityCourses.css';
import BscImg from '../assets/B_sc_scaled.jpg';
import BBAImg from '../assets/BBA_scaled.jpg';
import BComImg from '../assets/B_com_scaled.jpg';
import BAImg from '../assets/B_A_scaled.jpg';

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
            metaDescription.setAttribute("content", "Advance your education with UGC-approved online degree programs from leading universities. Explore Bachelors, Masters, and PG Diplomas designed for flexible learning.");
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

                {/* Mobile Centric Category Layout */}
                <div className="max-w-[450px] mx-auto mb-12">
                    <div className="bg-white p-3 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] flex flex-col gap-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    w-full border-none rounded-2xl px-6 py-3.5 flex items-center gap-4 
                                    text-[15px] font-bold cursor-pointer transition-all duration-300 whitespace-nowrap
                                    ${activeTab === tab.id
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-white text-primary hover:bg-blue-50'
                                    }
                                `}
                            >
                                <span className={`flex-shrink-0 p-1.5 rounded-lg ${activeTab === tab.id ? 'bg-white/20' : 'bg-blue-50'}`}>
                                    {tab.icon}
                                </span>
                                <span className="text-left">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map((course, index) => (
                        <article key={index} className="bg-white rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                            <div className="relative w-full aspect-[16/10] overflow-hidden">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            <div className="p-8 flex flex-col items-start flex-1">
                                <h3 className="text-xl font-bold text-secondary mb-4 leading-tight">
                                    {course.title}
                                </h3>

                                <div className="space-y-4 mb-8 flex-1">
                                    <p className="text-[15px] text-gray-500 leading-relaxed">
                                        <strong className="text-secondary font-bold">Highlights:</strong> {course.highlights}
                                    </p>

                                    <div className="flex items-center gap-4 text-sm font-medium text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <span className="text-yellow-400 text-lg">★</span>
                                            <span className="text-secondary font-bold">{course.rating}</span>
                                            <span className="text-[10px]">({course.ratingText})</span>
                                        </span>
                                        <span>•</span>
                                        <span>{course.duration.split('·')[1]}</span>
                                    </div>

                                    <div className="text-[13px] font-bold text-primary bg-blue-50 px-4 py-1.5 rounded-full inline-block">
                                        {course.students.split('·')[1]}
                                    </div>
                                </div>

                                <Link
                                    to={course.link}
                                    className="w-full inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-primary text-white font-bold no-underline transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200"
                                >
                                    View Program
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UniversityCourses;
