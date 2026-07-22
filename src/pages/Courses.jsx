import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Brain, BarChart2, Megaphone, Monitor, Gamepad2, Cloud } from 'lucide-react';
import FAQSection from '../components/FAQSection';
import { apiGetAssignedCourses } from '../utils/apiClient';
import EnquiryModal from '../components/EnquiryModal';

import aiMlBasicsImg from '../assets/aiml.webp';
import comingSoonImg from '../assets/coming_soon.webp';
import dataAnalystImg from '../assets/data_analyst.webp';
import tableauImg from '../assets/tableau.webp';
import powerBiImg from '../assets/power_bi.webp';
import sqlImg from '../assets/sql.webp';
import digitalMarketingImg from '../assets/digital_marketing_hero.webp';
import cybersecurityImg from '../assets/cybersecurity.webp';
import abacusImg from '../assets/abacus_course.webp';
const staticRoutes = [
    "/ai-machine-learning-from-basics-to-industry-applications",
    "/data-analytics",
    "/digital-marketing-from-basics-to-growth-campaigns",
    "/cyber-security",
    "/abacus-mental-math-masterclass",
    "/tableau-data-visualization-business-intelligence",
    "/sql-foundations-of-data-querying-databases",
    "/power-bi-data-visualization-business-intelligence",
    "/digital-marketing-strategy-ads-analytics",
    "/python-certification",
    "/java-certification",
    "/b-a-economics-with-data-analytics",
    "/b-sc-computer-science-with-ai-data-science",
    "/bba-bachelor-of-business-administration",
    "/b-com-computer-applications",
    "/cloud-computing",
    "/ai-and-machine-learning",
    "/automation-and-productivity-tools",
    "/full-stack-development",
    "/digital-transformation",
    "/ai-for-business",
    "/future-skills-and-automation",
    "/innovation-strategy",
    "/the-people-manager",
    "/strategic-decision-maker",
    "/the-team-builder",
    "/the-visionary-leader",
    "/financially-savvy-leader",
    "/the-effective-communicator",
    "/the-operations-optimizer",
    "/design-thinking"
];



const mapCategory = (cat) => {
    if (!cat) return 'all';
    const normalized = cat.toLowerCase();
    if (normalized.includes('digital marketing') || normalized.includes('marketing')) return 'marketing';
    if (normalized.includes('data analytics') || normalized.includes('analytics') || normalized.includes('ai') || normalized.includes('machine learning')) return 'ai';
    if (normalized.includes('kid') || normalized.includes('math') || normalized.includes('abacus')) return 'kids';
    if (normalized.includes('cyber') || normalized.includes('security')) return 'security';
    if (normalized.includes('cloud')) return 'cloud';
    return 'all';
};

const getLocalLink = (title) => {
    const titleLower = (title || '').toLowerCase();
    if (titleLower.includes('aws cloud') || titleLower.includes('cloud computing')) {
        return '/cloud-computing';
    } else if (titleLower.includes('cyber security') || titleLower.includes('cybersecurity')) {
        return '/cyber-security';
    } else if (titleLower.includes('data analytics') || titleLower.includes('data analyst')) {
        return '/data-analytics';
    } else if (titleLower.includes('digital marketing')) {
        return '/digital-marketing-from-basics-to-growth-campaigns';
    } else if (titleLower.includes('kid') || titleLower.includes('abacus')) {
        return '/abacus-mental-math-masterclass';
    }
    return '#';
};

const checkIfCourseCompleted = (c) => {
    if (c.is_ended) return true;
    if (c.course_start_date) {
        const startTime = c.start_time || "00:00:00";
        const courseDateTime = new Date(`${c.course_start_date}T${startTime}`);
        if (!isNaN(courseDateTime.getTime())) {
            return new Date() > courseDateTime;
        }
    }
    return false;
};

const formatCourseDate = (dateStr) => {
    if (!dateStr) return '';
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    } catch (e) {
        return dateStr;
    }
};

const formatCourseTime = (timeStr) => {
    if (!timeStr) return '';
    try {
        const parts = timeStr.split(':');
        if (parts.length < 2) return timeStr;
        const hours = parseInt(parts[0], 10);
        const minutes = parts[1];
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes} ${ampm}`;
    } catch (e) {
        return timeStr;
    }
};

const Courses = () => {
    const [searchParams] = useSearchParams();
    const [coursesList, setCoursesList] = useState([]);
    const [selectedCourseTitle, setSelectedCourseTitle] = useState('');
    const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

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
        const fetchCourses = async () => {
            try {
                const data = await apiGetAssignedCourses();
                if (data && data.length > 0) {
                    const activeCourses = data
                        .filter(c => c.is_active && !c.is_deleted)
                        .sort((a, b) => {
                            const dateA = a.course_start_date ? new Date(a.course_start_date).getTime() : 0;
                            const dateB = b.course_start_date ? new Date(b.course_start_date).getTime() : 0;
                            return dateB - dateA; // descending: most recent date first
                        });
                    const mapped = activeCourses.map(c => {
                        let reviewsCount = 0;
                        if (typeof c.reviews_count === 'number') {
                            reviewsCount = c.reviews_count;
                        } else if (typeof c.reviews_count === 'string') {
                            reviewsCount = parseInt(c.reviews_count) || 0;
                        } else if (Array.isArray(c.reviews)) {
                            reviewsCount = c.reviews.length;
                        }

                        let imageUrl = comingSoonImg;
                        if (c.image_url) {
                            imageUrl = c.image_url.startsWith('http') 
                                ? c.image_url 
                                : `https://user.aindhin.com${c.image_url}`;
                        }

                        return {
                            id: c.id,
                            category: mapCategory(c.category),
                            title: c.title,
                            image: imageUrl,
                            skills: c.description || c.about_course || "Skills not specified",
                            students: c.total_enrolled || 120,
                            rating: parseFloat(c.rating) || 5.0,
                            reviews: reviewsCount,
                            level: c.skill_level || "Beginner",
                            duration: c.course_duration || "1 Hours",
                            link: getLocalLink(c.title),
                            externalLink: `https://user.aindhin.com/course/${c.id}`,
                            startDate: c.course_start_date,
                            startTime: c.start_time,
                            isCompleted: checkIfCourseCompleted(c)
                        };
                    });
                    setCoursesList(mapped);
                }
            } catch (err) {
                console.error("Failed to load courses from API:", err);
            }
        };
        fetchCourses();
    }, []);

    const tabs = [
        { id: 'all', label: 'All Categories', icon: <LayoutGrid size={18} /> },
        { id: 'ai', label: 'AI and Machine Learning', icon: <Brain size={18} /> },
        { id: 'marketing', label: 'Digital Marketing', icon: <Megaphone size={18} /> },
        { id: 'security', label: 'Cybersecurity', icon: <Monitor size={18} /> },
        { id: 'cloud', label: 'Cloud Computing', icon: <Cloud size={18} /> },
        { id: 'kids', label: 'Kids Programs', icon: <Gamepad2 size={18} /> }
    ];

    const filteredCourses = activeTab === 'all'
        ? coursesList.filter(c => !c.comingSoon)
        : coursesList.filter(c => c.category === activeTab);

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
                                <div className="relative w-full aspect-[16/9] overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = comingSoonImg;
                                        }}
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
                                                <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-3">
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

                                                {!course.isCompleted && course.startDate && (
                                                    <div className="text-[13px] font-semibold text-primary bg-blue-50 px-4 py-1.5 rounded-full inline-block">
                                                        Starts: {formatCourseDate(course.startDate)} {course.startTime && `at ${formatCourseTime(course.startTime)}`}
                                                    </div>
                                                )}
                                            </div>

                                            {!course.isCompleted ? (
                                                staticRoutes.includes(course.link) ? (
                                                    <Link
                                                        to={course.link}
                                                        className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold no-underline transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200"
                                                    >
                                                        Explore Course
                                                    </Link>
                                                ) : (
                                                    <a
                                                        href={course.externalLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold no-underline transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 font-inter"
                                                    >
                                                        Explore Course
                                                    </a>
                                                )
                                            ) : (
                                                <button 
                                                    onClick={() => {
                                                        setSelectedCourseTitle(course.title);
                                                        setIsEnquiryModalOpen(true);
                                                    }}
                                                    className="w-full text-center mt-4 px-6 py-3 bg-primary hover:bg-blue-700 text-white border-none rounded-xl font-bold text-sm cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-200"
                                                >
                                                    Registration Closed - Enquiry
                                                </button>
                                            )}
                                        </>
                                    ) : (
                                        <div className="w-full text-center mt-4 px-6 py-3 bg-gray-50 rounded-2xl text-gray-400 font-bold text-sm">
                                            Coming Soon
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

            <EnquiryModal 
                isOpen={isEnquiryModalOpen} 
                onClose={() => setIsEnquiryModalOpen(false)} 
                courseTitle={selectedCourseTitle} 
            />
        </section>
    );
};

export default Courses;
