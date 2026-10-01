import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Brain, BarChart2, Megaphone, Monitor, Gamepad2, Cloud, Search, ChevronDown, Check, X } from 'lucide-react';
import FAQSection from '../components/FAQSection';
import { apiGetAssignedCourses, apiGetPublicCategories, USER_APP_URL, USER_API_URL } from '../utils/apiClient';
import EnquiryModal from '../components/EnquiryModal';
import { encodeCourseId } from '../utils/idObfuscator';

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

// Module courses do not have deadlines or start/end times

const ModuleCourses = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [coursesList, setCoursesList] = useState([]);
    const [categoriesList, setCategoriesList] = useState(() => {
        try {
            const cached = localStorage.getItem('aindhin_categories_cache');
            return cached ? JSON.parse(cached) : [];
        } catch (e) {
            return [];
        }
    });
    const [selectedCourseTitle, setSelectedCourseTitle] = useState('');
    const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);
    const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleExploreCourse = async (courseId) => {
        try {
            const encodedId = await encodeCourseId(courseId);
            window.open(`${USER_APP_URL}/course/${encodedId}`, '_blank', 'noopener,noreferrer');
        } catch (error) {
            console.error('Failed to encode course id', error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        document.title = "Explore Job-Ready Online Module Courses in India | Aindhin";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Aindhin is an online learning platform in India offering skill-based and career-oriented courses.");
        }
    }, []);

    const initialTab = searchParams.get('tab') || 'all';
    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        const tabFromUrl = searchParams.get('tab') || 'all';
        setActiveTab(tabFromUrl);
    }, [searchParams]);

    useEffect(() => {
        const fetchCoursesAndCategories = async () => {
            try {
                const cats = await apiGetPublicCategories().catch(() => []);
                if (Array.isArray(cats)) {
                    setCategoriesList(cats);
                    try {
                        localStorage.setItem('aindhin_categories_cache', JSON.stringify(cats));
                    } catch (e) {}
                }
                const data = await apiGetAssignedCourses();
                if (data && data.length > 0) {
                    const activeCourses = data
                        .filter(c => c.is_active && !c.is_deleted && c.class_mode === 'Module Class')
                        .sort((a, b) => (b.id || 0) - (a.id || 0));
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
                                : `${USER_API_URL}${c.image_url}`;
                        }

                        return {
                            id: c.id,
                            category: (c.category || '').trim(),
                            title: c.title,
                            image: imageUrl,
                            skills: c.description || c.about_course || "Skills not specified",
                            students: c.total_enrolled || 120,
                            rating: parseFloat(c.rating) || 5.0,
                            reviews: reviewsCount,
                            level: c.skill_level || "Beginner",
                            duration: c.course_duration || "1 Hours",
                            aboutCourse: c.about_course || c.description || "No description available",
                            includes: c.includes || "Certificate of completion",
                            price: c.price || "0.00",
                            certificateDetails: c.certificate_details || "Yes",
                            courseType: c.course_type || "",
                            link: `/course/module/${c.id}`,
                            externalLink: `${USER_APP_URL}/signin`,
                            classMode: c.class_mode || "Module Class"
                        };
                    });
                    setCoursesList(mapped);
                }
            } catch (err) {
                console.error("Failed to load courses from API:", err);
            }
        };
        fetchCoursesAndCategories();
    }, []);

    const getTabIcon = (catName) => {
        if (!catName || catName === 'all') return <LayoutGrid size={18} />;
        const n = catName.toLowerCase();
        if (n.includes('ai') || n.includes('machine learning') || n.includes('data') || n.includes('analytics')) return <Brain size={18} />;
        if (n.includes('marketing') || n.includes('seo') || n.includes('campaign')) return <Megaphone size={18} />;
        if (n.includes('cyber') || n.includes('security') || n.includes('software') || n.includes('dev') || n.includes('code')) return <Monitor size={18} />;
        if (n.includes('cloud') || n.includes('aws') || n.includes('azure')) return <Cloud size={18} />;
        if (n.includes('kid') || n.includes('math') || n.includes('abacus')) return <Gamepad2 size={18} />;
        return <LayoutGrid size={18} />;
    };

    const allTabNames = new Set();
    categoriesList.forEach(c => { if (c.name && c.name.trim()) allTabNames.add(c.name.trim()); });
    coursesList.forEach(c => { if (c.category && c.category !== 'all') allTabNames.add(c.category); });

    const tabs = [
        { id: 'all', label: 'All Categories', icon: <LayoutGrid size={18} /> },
        ...Array.from(allTabNames).map(name => ({
            id: name.toLowerCase(),
            label: name,
            icon: getTabIcon(name)
        }))
    ];

    const isTabActive = (tabId, active) => {
        if (tabId === 'all' && (!active || active === 'all')) return true;
        if (tabId === 'all') return false;
        if (!active || active === 'all') return false;
        const idLower = tabId.toLowerCase().trim();
        const activeLower = active.toLowerCase().trim();
        if (idLower === activeLower) return true;
        if (activeLower === 'ai' && (idLower.includes('ai') || idLower.includes('machine learning') || idLower.includes('data') || idLower.includes('analytics'))) return true;
        if (activeLower === 'software' && (idLower.includes('software') || idLower.includes('dev') || idLower.includes('web') || idLower.includes('mobile'))) return true;
        if (activeLower === 'data' && (idLower.includes('data') || idLower.includes('analytic') || idLower.includes('tableau') || idLower.includes('sql') || idLower.includes('power bi'))) return true;
        if (activeLower === 'marketing' && (idLower.includes('marketing') || idLower.includes('seo'))) return true;
        if (activeLower === 'security' && (idLower.includes('cyber') || idLower.includes('security'))) return true;
        if (activeLower === 'cloud' && (idLower.includes('cloud') || idLower.includes('aws') || idLower.includes('azure'))) return true;
        if (activeLower === 'kids' && (idLower.includes('kid') || idLower.includes('math') || idLower.includes('abacus'))) return true;
        return idLower.includes(activeLower) || activeLower.includes(idLower);
    };

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        const newParams = new URLSearchParams(searchParams);
        if (tabId === 'all') {
            newParams.delete('tab');
        } else {
            newParams.set('tab', tabId);
        }
        setSearchParams(newParams, { replace: true });
    };

    const matchesTab = (courseCat, tabId) => {
        if (!tabId || tabId === 'all') return true;
        if (!courseCat) return false;
        const catLower = courseCat.toLowerCase().trim();
        const tabLower = tabId.toLowerCase().trim();
        if (catLower === tabLower) return true;

        if (tabLower === 'ai' && (catLower.includes('ai') || catLower.includes('machine learning') || catLower.includes('data') || catLower.includes('analytics'))) return true;
        if (tabLower === 'software' && (catLower.includes('software') || catLower.includes('dev') || catLower.includes('web') || catLower.includes('mobile') || catLower.includes('engineer'))) return true;
        if (tabLower === 'data' && (catLower.includes('data') || catLower.includes('analytic') || catLower.includes('tableau') || catLower.includes('sql') || catLower.includes('power bi'))) return true;
        if (tabLower === 'marketing' && (catLower.includes('marketing') || catLower.includes('seo') || catLower.includes('growth') || catLower.includes('campaign'))) return true;
        if (tabLower === 'security' && (catLower.includes('cyber') || catLower.includes('security') || catLower.includes('hack') || catLower.includes('network'))) return true;
        if (tabLower === 'cloud' && (catLower.includes('cloud') || catLower.includes('aws') || catLower.includes('azure') || catLower.includes('devops'))) return true;
        if (tabLower === 'kids' && (catLower.includes('kid') || catLower.includes('math') || catLower.includes('abacus'))) return true;

        return catLower.includes(tabLower) || tabLower.includes(catLower);
    };

    const selectedTabObj = tabs.find(t => isTabActive(t.id, activeTab)) || tabs[0] || { label: 'All Categories', icon: <LayoutGrid size={18} /> };

    const filteredCourses = coursesList.filter(c => {
        if (c.comingSoon && activeTab === 'all' && !searchQuery.trim()) return false;
        if (c.comingSoon) return false;

        const matchesCategory = activeTab === 'all' || matchesTab(c.category, activeTab);

        if (!searchQuery.trim()) return matchesCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery = 
            (c.title || '').toLowerCase().includes(q) ||
            (c.skills || '').toLowerCase().includes(q) ||
            (c.category || '').toLowerCase().includes(q) ||
            (c.level || '').toLowerCase().includes(q);

        return matchesCategory && matchesQuery;
    });

    return (
        <section className="w-full bg-[#f8faff] pt-12 pb-20 px-6 lg:px-12 font-inter relative min-h-screen">
            <div className="max-w-[1400px] mx-auto">

                <div className="text-center mb-10">
                    <h1 className="text-3xl lg:text-4xl font-bold text-secondary mb-3">Explore Our Module Courses</h1>
                    <p className="text-gray-500 text-lg">Search by skills or filter by category to find your perfect module program.</p>
                </div>

                <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 mb-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-4">
                    
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search courses by keyword, skills, or technology..."
                            className="w-full pl-12 pr-10 py-3.5 bg-gray-50/80 hover:bg-gray-50 focus:bg-white text-secondary placeholder-gray-400 text-[15px] rounded-2xl border border-transparent focus:border-primary/30 focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 font-medium"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200/60 transition-colors cursor-pointer"
                                title="Clear search"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <div className="relative w-full md:w-auto min-w-[280px]" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={`w-full flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl border transition-all duration-200 font-semibold text-[15px] cursor-pointer ${
                                isDropdownOpen || activeTab !== 'all'
                                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25'
                                    : 'bg-gray-50/80 hover:bg-gray-100 text-secondary border-transparent hover:border-gray-200'
                            }`}
                        >
                            <div className="flex items-center gap-2.5 min-w-0">
                                <span className={`p-1.5 rounded-lg shrink-0 ${isDropdownOpen || activeTab !== 'all' ? 'bg-white/20 text-white' : 'bg-blue-100 text-primary'}`}>
                                    {selectedTabObj ? selectedTabObj.icon : <LayoutGrid size={18} />}
                                </span>
                                <span className="truncate">{selectedTabObj ? selectedTabObj.label : 'All Categories'}</span>
                            </div>
                            <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 top-full mt-2 w-full md:w-[320px] bg-white rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.14)] border border-gray-100 p-2 z-50 max-h-[380px] overflow-y-auto overscroll-contain scrollbar-thin space-y-1"
                                >
                                    <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 mb-1 flex items-center justify-between">
                                        <span>Filter by Category</span>
                                        <span>({tabs.length})</span>
                                    </div>
                                    {tabs.map((tab) => {
                                        const active = isTabActive(tab.id, activeTab);
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => {
                                                    handleTabClick(tab.id);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between gap-3 p-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                                                    active
                                                        ? 'bg-blue-50/90 text-primary font-bold shadow-sm'
                                                        : 'hover:bg-gray-50 text-secondary font-medium'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    <span className={`p-1.5 rounded-lg shrink-0 ${active ? 'bg-primary text-white shadow-sm' : 'bg-gray-100 text-gray-600'}`}>
                                                        {tab.icon}
                                                    </span>
                                                    <span className="text-[14px] truncate">{tab.label}</span>
                                                </div>
                                                {active && <Check className="w-4 h-4 text-primary shrink-0 ml-2" />}
                                            </button>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>

                {filteredCourses.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-16 px-6 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto my-6"
                    >
                        <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                            <Search className="w-8 h-8 opacity-75" />
                        </div>
                        <h3 className="text-xl font-bold text-secondary mb-2">No courses found</h3>
                        <p className="text-gray-500 max-w-md mx-auto text-[15px] mb-6 leading-relaxed">
                            We couldn&apos;t find any programs matching your filters or keyword &quot;<span className="font-semibold text-secondary">{searchQuery}</span>&quot;. Try adjusting your keywords or category selection.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                handleTabClick('all');
                            }}
                            className="px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
                        >
                            Reset All Filters
                        </button>
                    </motion.div>
                )}

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
                                    <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap z-10">
                                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full text-white border uppercase tracking-wide shadow-sm backdrop-blur-sm ${course.classMode === 'Module Class' ? 'bg-purple-600/80 border-purple-400/30' : 'bg-blue-600/80 border-blue-400/30'}`}>
                                            {course.classMode}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>

                                <div className="p-5 flex flex-col items-start flex-1">
                                    <h3 className="text-base font-bold text-secondary mb-2 leading-tight">
                                        <a 
                                            href={`${USER_APP_URL}/signin`} 
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
                                                </div>

                                            </div>

                                            <button
                                                onClick={() => handleExploreCourse(course.id)}
                                                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold no-underline transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 cursor-pointer border-none"
                                            >
                                                Explore Course
                                            </button>
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

            <FAQSection
                faqs={[
                    {
                        question: "Which module courses are currently trending at Aindhin?",
                        answer: "Our AI & Machine Learning, Data Analytics, and Digital Marketing modules are highly popular due to the increasing demand for these skills in the global job market."
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

export default ModuleCourses;
