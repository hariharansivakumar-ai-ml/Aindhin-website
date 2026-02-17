import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, Compass, MessageSquare, TrendingUp } from 'lucide-react';
import './LeadershipCourses.css';

import StrategicImg from '../assets/strategic_leader.jpg';
import PeopleManagerImg from '../assets/people_manager.jpg';
import VisionaryImg from '../assets/visionary_leader.jpg';
import EffectiveCommImg from '../assets/effective_communicator.jpg';
import TeamBuilderImg from '../assets/team_builder.jpg';
import BusinessStratImg from '../assets/business_strategist.jpg';


const courses = [
    {
        category: 'core',
        title: 'The Strategic Decision-Maker',
        image: StrategicImg,
        skills: 'Decision frameworks, Risk thinking, Prioritisation, Stakeholder alignment',
        duration: 'All levels · 6 weeks',
        link: '/strategic-decision-maker/'
    },
    {
        category: 'core',
        title: 'The People Manager',
        image: PeopleManagerImg,
        skills: 'Coaching, Feedback, Performance management, Team culture',
        duration: 'Beginner · 8 weeks',
        link: '/the-people-manager/'
    },
    {
        category: 'core',
        title: 'The Visionary Leader',
        image: VisionaryImg,
        skills: 'Vision building, Influence, Change leadership, Long-term planning',
        duration: 'Intermediate · 8 weeks',
        link: '/the-visionary-leader/'
    },
    {
        category: 'skills',
        title: 'The Effective Communicator',
        image: EffectiveCommImg,
        skills: 'Executive communication, Clarity, Conflict handling, Presentations',
        duration: 'All levels · 6 weeks',
        link: '/the-effective-communicator/'
    },
    {
        category: 'skills',
        title: 'The Team Builder',
        image: TeamBuilderImg,
        skills: 'Hiring basics, Collaboration, Delegation, Team rituals',
        duration: 'Beginner · 6 weeks',
        link: '/the-team-builder/'
    },
    {
        category: 'executive',
        title: 'The Business Strategist',
        image: BusinessStratImg,
        skills: 'Market thinking, Strategy tools, Execution plans, Metrics',
        duration: 'Intermediate · 10 weeks',
        link: '/the-business-strategist/'
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

    const filteredCourses = activeTab === 'all'
        ? courses
        : courses.filter(course => course.category === activeTab);

    return (
        <section className="courses-tabs-section leadership-courses-section">
            <div className="courses-container">
                {/* Title */}
                <div className="courses-tabs-header">
                    <div>
                        <h2 className="courses-title">Explore Our Leadership Courses</h2>
                        <p className="courses-subtitle">Pick a category to see curated leadership programs.</p>
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
                            <span className="tab-icon flex items-center justify-center">{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Courses Grid */}
                <div className="courses-grid" id="leadership-courses-grid">
                    {filteredCourses.map((course, index) => (
                        <article key={index} className="course-card" data-category={course.category}>
                            <div className="course-card-image-wrap">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="course-card-image"
                                    loading="lazy"
                                />
                            </div>
                            <div className="course-card-body">
                                <h3 className="course-card-title">{course.title}</h3>

                                <div className="course-meta">
                                    <p className="course-skills">
                                        <strong>Skills you'll gain:</strong> {course.skills}
                                    </p>
                                    <div className="course-level-duration">{course.duration}</div>
                                </div>

                                <Link to={course.link} className="course-readmore-btn">Explore More</Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LeadershipCourses;
