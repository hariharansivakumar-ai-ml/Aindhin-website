import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, Compass, MessageSquare, TrendingUp } from 'lucide-react';
import './LeadershipCourses.css';

import StrategicImg from '../assets/strategic_leader.webp';
import PeopleManagerImg from '../assets/people_manager.webp';
import VisionaryImg from '../assets/visionary_leader.webp';
import EffectiveCommImg from '../assets/effective_communicator.webp';
import TeamBuilderImg from '../assets/team_builder.webp';


const courses = [
    {
        category: 'core',
        title: 'The Strategic Decision-Maker',
        image: StrategicImg,
        skills: 'Decision frameworks, Risk thinking, Prioritisation, Stakeholder alignment',
        duration: 'All levels · 6 weeks',
        link: '/strategic-decision-maker'
    },
    {
        category: 'core',
        title: 'The People Manager',
        image: PeopleManagerImg,
        skills: 'Coaching, Feedback, Performance management, Team culture',
        duration: 'Beginner · 8 weeks',
        link: '/the-people-manager'
    },
    {
        category: 'core',
        title: 'The Visionary Leader',
        image: VisionaryImg,
        skills: 'Vision building, Influence, Change leadership, Long-term planning',
        duration: 'Intermediate · 8 weeks',
        link: '/the-visionary-leader'
    },
    {
        category: 'skills',
        title: 'The Effective Communicator',
        image: EffectiveCommImg,
        skills: 'Executive communication, Clarity, Conflict handling, Presentations',
        duration: 'All levels · 6 weeks',
        link: '/the-effective-communicator'
    },
    {
        category: 'skills',
        title: 'The Team Builder',
        image: TeamBuilderImg,
        skills: 'Hiring basics, Collaboration, Delegation, Team rituals',
        duration: 'Beginner · 6 weeks',
        link: '/the-team-builder'
    },

];

const tabs = [
    { id: 'all', label: 'All Categories', icon: <LayoutGrid size={18} /> },
    { id: 'core', label: 'Core Leadership Courses', icon: <Compass size={18} /> },
    { id: 'skills', label: 'Leadership & Management Skills', icon: <MessageSquare size={18} /> },
    { id: 'executive', label: 'Business & Executive Leadership', icon: <TrendingUp size={18} /> }
];

const LeadershipCourses = () => {
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        document.title = "Executive Leadership & Management Courses | Aindhin Professional";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Aindhin is an online learning platform in India offering skill-based and career-oriented courses.");
        }
    }, []);

    const filteredCourses = activeTab === 'all'
        ? courses
        : courses.filter(course => course.category === activeTab);

    return (
        <section className="w-full bg-[#f8faff] pt-12 pb-20 px-4 font-inter relative min-h-screen">
            <div className="max-w-[1200px] mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl lg:text-4xl font-bold text-secondary mb-3">Become a Visionary Leader: High-Impact Management Courses</h1>
                    <p className="text-gray-500 text-lg">Pick a category to see curated leadership programs.</p>
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
                    {filteredCourses.map((course, index) => (
                        <article key={index} className="bg-white rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                            <div className="relative w-full aspect-[16/7] overflow-hidden">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            <div className="p-5 flex flex-col items-start flex-1">
                                <h3 className="text-base font-bold text-secondary mb-2 leading-tight">
                                    {course.title}
                                </h3>

                                <div className="space-y-2.5 mb-4 flex-1">
                                    <p className="text-[13px] text-gray-500 leading-relaxed">
                                        <strong className="text-secondary font-bold">Skills you'll gain:</strong> {course.skills}
                                    </p>

                                    <div className="text-[13px] font-bold text-primary bg-blue-50 px-4 py-1.5 rounded-full inline-block">
                                        {course.duration}
                                    </div>
                                </div>

                                <Link
                                    to={course.link}
                                    className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold no-underline transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200"
                                >
                                    Explore More
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LeadershipCourses;
