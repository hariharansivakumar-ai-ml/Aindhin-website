import { useState } from 'react';
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
    const [activeTab, setActiveTab] = useState('all');

    const filteredCourses = activeTab === 'all'
        ? courses
        : courses.filter(course => course.category === activeTab);

    return (
        <section className="courses-tabs-section university-courses-wrapper">
            <div className="courses-container">

                {/* Title */}
                <div className="courses-tabs-header">
                    <div>
                        <h2 className="courses-title">Explore Our University Programs</h2>
                        <p className="courses-subtitle">
                            Choose a stream to view curated UGC‑approved degree programs.
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="courses-tabs-wrapper">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`course-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                            data-category={tab.id}
                        >
                            <span className="tab-icon">{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Courses Grid */}
                <div className="courses-grid" id="courses-grid">
                    {filteredCourses.map((course, index) => (
                        <article key={index} className="course-card" data-category={course.category}>
                            <div className="course-card-image-wrap">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="course-card-image"
                                />
                            </div>
                            <div className="course-card-body">
                                <h3 className="course-card-title">
                                    {course.title}
                                </h3>

                                <div className="course-meta">
                                    <p className="course-skills flex items-start gap-2">
                                        <BookOpen size={16} className="mt-1 flex-shrink-0 text-blue-600" />
                                        <span><strong>Program Highlights:</strong> {course.highlights}</span>
                                    </p>
                                    <div className="course-students flex items-center gap-2">
                                        <Users size={16} className="text-blue-600" />
                                        <span>{course.students}</span>
                                    </div>
                                    <div className="course-rating-row">
                                        <span className="star-icon"><Star size={16} fill="currentColor" /></span>
                                        <span className="course-rating-score">{course.rating}</span>
                                        <span className="course-rating-count">{course.ratingText}</span>
                                    </div>
                                    <div className="course-level-duration flex items-center gap-2">
                                        <Clock size={16} className="text-blue-600" />
                                        <span>{course.duration}</span>
                                    </div>
                                </div>

                                <Link
                                    to={course.link}
                                    className="course-readmore-btn"
                                >
                                    View Program Details
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
