import { useState, useEffect } from 'react';
import { LayoutGrid, Brain, Users, TrendingUp, Rocket } from 'lucide-react';
import './CorporateCourses.css';
import { useLocation, Link } from 'react-router-dom';

// Import images
import DataAnalyticsImg from '../assets/data_analytics.jpg';
import CloudComputingImg from '../assets/cloud_computing.jpg';
import CybersecurityImg from '../assets/cybersecurity.jpg';
import AiMlImg from '../assets/ai_ml.jpg';
import FullStackImg from '../assets/full_stack.jpg';
import AutomationImg from '../assets/automation.jpg';
import PeopleManagerImg from '../assets/people_manager_corp.jpg';
import StrategicDecisionImg from '../assets/strategic_decision_corp.jpg';
import PerformanceDriverImg from '../assets/performance_driver.jpg';
import ProjectControllerImg from '../assets/project_controller.jpg';
import BusinessAnalystImg from '../assets/business_analyst.jpg';
import OperationsOptimizerImg from '../assets/operations_optimizer.jpg';
import AiBusinessImg from '../assets/ai_business.jpg';
import DesignThinkingImg from '../assets/design_thinking.jpg';
import InnovationStrategyImg from '../assets/innovation_strategy.jpg';
import DigitalTransformationImg from '../assets/digital_transformation.jpg';
import FutureSkillsImg from '../assets/future_skills.jpg';

const courses = [
    // TECH
    {
        category: 'tech',
        title: 'Data Analytics',
        img: DataAnalyticsImg,
        skills: 'Analytics, Dashboards, Insights.',
        desc: 'Build data‑driven decision‑making with hands‑on analytics.',
        type: 'Corporate Training · Hands-on',
        rating: 4.8,
        link: '/data-analytics'
    },
    {
        category: 'tech',
        title: 'Cloud Computing',
        img: CloudComputingImg,
        skills: 'AWS/Azure Basics, Scalability.',
        desc: 'Design, deploy and manage scalable cloud solutions securely.',
        type: 'Corporate Training · Cloud Ops',
        rating: 4.7,
        link: '/cloud-computing'
    },
    {
        category: 'tech',
        title: 'Cybersecurity',
        img: CybersecurityImg,
        skills: 'Threats, Controls, Governance.',
        desc: 'Protect your organisation with practical training on incident response.',
        type: 'Corporate Training · Security',
        rating: 4.9,
        link: '/cyber-security'
    },
    {
        category: 'tech',
        title: 'AI & Machine Learning',
        img: AiMlImg,
        skills: 'Prediction, Automation, Models.',
        desc: 'Introduce teams to practical AI & ML use cases in workflows.',
        type: 'Corporate Training · Future Tech',
        rating: 4.8,
        link: '/ai-machine-learning-from-basics-to-industry-applications'
    },
    {
        category: 'tech',
        title: 'Full Stack Development',
        img: FullStackImg,
        skills: 'Frontend, Backend, Deployment.',
        desc: 'Upskill developers on modern practices for enterprise apps.',
        type: 'Corporate Training · Development',
        rating: 4.7,
        link: '/full-stack-development'
    },
    {
        category: 'tech',
        title: 'Automation & Tools',
        img: AutomationImg,
        skills: 'No-code, Scripts, Efficiency.',
        desc: 'Train teams to automate workflows using AI‑assisted tools.',
        type: 'Corporate Training · Productivity',
        rating: 4.6,
        link: '/automation-and-productivity-tools'
    },

    // LEADERSHIP
    {
        category: 'leadership',
        title: 'The People Manager',
        img: PeopleManagerImg,
        skills: 'Coaching, Feedback, Trust.',
        desc: 'Equip managers to handle difficult conversations effectively.',
        type: 'Leadership · Management Track',
        rating: 4.8,
        link: '/the-people-manager'
    },
    {
        category: 'leadership',
        title: 'Strategic Decision‑Maker',
        img: StrategicDecisionImg,
        skills: 'Strategy, Risk, Data.',
        desc: 'Train leaders to analyse risk and make data‑backed decisions.',
        type: 'Leadership · Executive Track',
        rating: 4.7,
        link: '/strategic-decision-maker'
    },

    // BUSINESS
    {
        category: 'business',
        title: 'The Operations Optimizer',
        img: OperationsOptimizerImg,
        skills: 'Lean, Process, Efficiency.',
        desc: 'Improve efficiency with process optimisation and continuous improvement.',
        type: 'Business · Operations',
        rating: 4.6,
        link: '/the-operations-optimizer'
    },

    // INNOVATION & AI
    {
        category: 'innovation',
        title: 'AI for Business',
        img: AiBusinessImg,
        skills: 'Opportunities, Piloting, Cases.',
        desc: 'Help leaders scope pilots and build AI‑ready business cases.',
        type: 'Innovation · Transformation',
        rating: 4.8,
        link: '/ai-for-business'
    },
    {
        category: 'innovation',
        title: 'Design Thinking',
        img: DesignThinkingImg,
        skills: 'User‑centricity, Prototyping.',
        desc: 'Solve problems creatively with discovery, prototyping and testing.',
        type: 'Innovation · Creative Solving',
        rating: 4.7,
        link: '/design-thinking'
    },
    {
        category: 'innovation',
        title: 'Innovation Strategy',
        img: InnovationStrategyImg,
        skills: 'Pipelines, Governance.',
        desc: 'Build structured innovation pipelines aligned to business outcomes.',
        type: 'Innovation · Strategy',
        rating: 4.6,
        link: '/innovation-strategy'
    },
    {
        category: 'innovation',
        title: 'Digital Transformation',
        img: DigitalTransformationImg,
        skills: 'Roadmaps, Adoption, Change.',
        desc: 'Guide leaders through roadmap creation and tech adoption at scale.',
        type: 'Innovation · Change Mgmt',
        rating: 4.7,
        link: '/digital-transformation'
    },
    {
        category: 'innovation',
        title: 'Future Skills',
        img: FutureSkillsImg,
        skills: 'Emerging Roles, Automation.',
        desc: 'Prepare your workforce for automation trends and future capabilities.',
        type: 'Innovation · Future of Work',
        rating: 4.8,
        link: '/future-skills-and-automation'
    }
];

const CorporateCourses = () => {
    const [activeTab, setActiveTab] = useState('all');
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        if (tab) {
            setActiveTab(tab);
        }
    }, [location]);

    const filteredCourses = activeTab === 'all'
        ? courses
        : courses.filter(course => course.category === activeTab);

    return (
        <section id="corporate-courses" className="courses-tabs-section corporate-courses-wrapper">
            <div className="courses-container">

                <div className="courses-tabs-header">
                    <div>
                        <h2 className="courses-title">Explore Our Corporate Courses</h2>
                        <p className="courses-subtitle">
                            Choose a capability area to view specialised corporate learning programs.
                        </p>
                    </div>
                </div>

                {/* TABS */}
                <div className="courses-tabs-wrapper">
                    <button
                        className={`course-tab ${activeTab === 'all' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('all')}
                    >
                        <span className="tab-icon"><LayoutGrid size={18} /></span>
                        <span>All Categories</span>
                    </button>

                    <button
                        className={`course-tab ${activeTab === 'tech' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('tech')}
                    >
                        <span className="tab-icon"><Brain size={18} /></span>
                        <span>Tech Skills</span>
                    </button>

                    <button
                        className={`course-tab ${activeTab === 'leadership' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('leadership')}
                    >
                        <span className="tab-icon"><Users size={18} /></span>
                        <span>Leadership</span>
                    </button>

                    <button
                        className={`course-tab ${activeTab === 'business' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('business')}
                    >
                        <span className="tab-icon"><TrendingUp size={18} /></span>
                        <span>Business Skills</span>
                    </button>

                    <button
                        className={`course-tab ${activeTab === 'innovation' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('innovation')}
                    >
                        <span className="tab-icon"><Rocket size={18} /></span>
                        <span>Innovation &amp; AI</span>
                    </button>
                </div>

                {/* GRID */}
                <div className="courses-grid" id="corporate-grid">
                    {filteredCourses.map((course, index) => (
                        <article key={index} className="course-card">
                            <div className="course-card-image-wrap">
                                <img
                                    src={course.img}
                                    alt={course.title}
                                    className="course-card-image"
                                />
                            </div>
                            <div className="course-card-body">
                                <h3 className="course-card-title">{course.title}</h3>
                                <div className="course-meta">
                                    <p className="course-skills">
                                        <strong>Focus:</strong> {course.skills}
                                        <br />{course.desc}
                                    </p>
                                    <div className="course-students">{course.type}</div>
                                    <div className="course-rating-row">
                                        <span className="star-icon">★</span>
                                        <span className="course-rating-score">{course.rating}</span>
                                        <span className="course-rating-count">Learner Feedback</span>
                                    </div>
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

export default CorporateCourses;
