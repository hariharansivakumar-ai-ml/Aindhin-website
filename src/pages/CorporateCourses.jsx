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
import AiBusinessImg from '../assets/ai_business.webp';
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

    useEffect(() => {
        document.title = "Enterprise Training & Workforce Upskilling Solutions | Aindhin Corporate";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Empower your team with Aindhin's corporate training programs. Custom industry-relevant courses and professional certifications to drive organizational growth.");
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
                    <h1 className="text-3xl lg:text-4xl font-bold text-secondary mb-3">Transform Your Team: Scalable Corporate Training Solutions</h1>
                    <p className="text-gray-500 text-lg">Choose a capability area to view specialised corporate learning programs.</p>
                </div>

                {/* ── MOBILE: vertical card list ─────────────────────────────── */}
                <div className="md:hidden max-w-[450px] mx-auto mb-10">
                    <div className="bg-white p-3 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] flex flex-col gap-2">
                        {[{ id: 'all', label: 'All Categories', icon: <LayoutGrid size={18} /> }, { id: 'tech', label: 'Tech Skills', icon: <Brain size={18} /> }, { id: 'leadership', label: 'Leadership', icon: <Users size={18} /> }, { id: 'business', label: 'Business Skills', icon: <TrendingUp size={18} /> }, { id: 'innovation', label: 'Innovation & AI', icon: <Rocket size={18} /> }].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full border-none rounded-2xl px-6 py-3.5 flex items-center gap-4 text-[15px] font-bold cursor-pointer transition-all duration-300 whitespace-nowrap ${activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'bg-white text-primary hover:bg-blue-50'
                                    }`}
                            >
                                <span className={`flex-shrink-0 p-1.5 rounded-lg ${activeTab === tab.id ? 'bg-white/20' : 'bg-blue-50'}`}>{tab.icon}</span>
                                <span className="text-left">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── TABLET + DESKTOP: horizontal pill tab-bar ─────────────── */}
                <div className="hidden md:flex items-center gap-2 mb-10 overflow-x-auto pb-1 scrollbar-none flex-wrap">
                    {[{ id: 'all', label: 'All Categories', icon: <LayoutGrid size={18} /> }, { id: 'tech', label: 'Tech Skills', icon: <Brain size={18} /> }, { id: 'leadership', label: 'Leadership', icon: <Users size={18} /> }, { id: 'business', label: 'Business Skills', icon: <TrendingUp size={18} /> }, { id: 'innovation', label: 'Innovation & AI', icon: <Rocket size={18} /> }].map(tab => (
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
                                    src={course.img}
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            <div className="p-5 flex flex-col items-start flex-1">
                                <h3 className="text-base font-bold text-secondary mb-2 leading-tight">
                                    {course.title}
                                </h3>

                                <div className="space-y-2.5 mb-4 flex-1">
                                    <p className="text-[13px] text-gray-500 leading-relaxed">
                                        <strong className="text-secondary font-bold">Focus:</strong> {course.skills}
                                        <br />
                                        <span className="text-sm mt-1 block">{course.desc}</span>
                                    </p>

                                    <div className="flex items-center gap-4 text-sm font-medium text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <span className="text-yellow-400 text-lg">★</span>
                                            <span className="text-secondary font-bold">{course.rating}</span>
                                        </span>
                                    </div>

                                    <div className="text-[13px] font-bold text-primary bg-blue-50 px-4 py-1.5 rounded-full inline-block">
                                        {course.type}
                                    </div>
                                </div>

                                <Link
                                    to={course.link}
                                    className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold no-underline transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200"
                                >
                                    Explore Training
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CorporateCourses;
