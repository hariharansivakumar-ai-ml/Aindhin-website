import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu, X, LayoutGrid, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import CourseTicker from './CourseTicker';

import { USER_APP_URL, apiGetPublicCategories } from '../utils/apiClient';

import logo from '../assets/logo_aindhin.webp';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Header = () => {
    const navigate = useNavigate();
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);

    const [isScrolled, setIsScrolled] = useState(false);
    const [dynamicCategories, setDynamicCategories] = useState(() => {
        try {
            const cached = localStorage.getItem('aindhin_categories_cache');
            return cached ? JSON.parse(cached) : [];
        } catch (e) {
            return [];
        }
    });
    const [remainingSubmenuCount, setRemainingSubmenuCount] = useState(0);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await apiGetPublicCategories();
                if (Array.isArray(data) && data.length > 0) {
                    setDynamicCategories(data);
                    try {
                        localStorage.setItem('aindhin_categories_cache', JSON.stringify(data));
                    } catch (e) {}
                }
            } catch (err) {
                console.error("Failed to fetch public categories in Header:", err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsCategoryOpen(false);
            }
        };

        if (isCategoryOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCategoryOpen]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 20;
            setIsScrolled(prev => {
                if (prev !== scrolled) {
                    return scrolled;
                }
                return prev;
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getCategoryMeta = (name) => {
        const n = (name || '').toLowerCase();
        if (n.includes('ai') || n.includes('machine learning')) return { icon: '🤖', sub: 'Neural networks, chatbots, automation' };
        if (n.includes('software') || n.includes('dev') || n.includes('web')) return { icon: '💻', sub: 'Web, mobile, and backend engineering' };
        if (n.includes('data') || n.includes('analytic')) return { icon: '📊', sub: 'Data, dashboards, business insights' };
        if (n.includes('marketing')) return { icon: '📣', sub: 'SEO, social media, paid campaigns' };
        if (n.includes('cyber') || n.includes('security')) return { icon: '🛡️', sub: 'Network security, ethical hacking, defense' };
        if (n.includes('cloud') || n.includes('aws')) return { icon: '☁️', sub: 'AWS, Azure, cloud deployment & DevOps' };
        if (n.includes('kid') || n.includes('math') || n.includes('abacus')) return { icon: '🎮', sub: 'Interactive math, coding & foundation for kids' };
        return { icon: '📚', sub: 'Professional certification and career upskilling' };
    };

    const certSubmenu = dynamicCategories.length > 0
        ? dynamicCategories.map(c => {
            const meta = getCategoryMeta(c.name);
            return {
                icon: meta.icon,
                title: c.name,
                sub: meta.sub,
                path: `/our-courses/?tab=${encodeURIComponent(c.name.trim().toLowerCase())}`
            };
        })
        : [
            { icon: '📚', title: 'All Courses', sub: 'Explore our complete curriculum', path: '/our-courses' }
        ];

    const categories = [
        {
            id: 'cert',
            icon: '📚',
            title: 'Certification Courses',
            sub: 'AI, Software, Data, Marketing',
            submenu: certSubmenu
        },
        { icon: '🧩', title: 'Module Courses', sub: 'Short term focused modules', path: '/module-courses' },
        { icon: '🎓', title: 'University Courses', sub: 'UG & PG programs, degrees', path: '/university-courses' },
        { icon: '🏢', title: 'Corporate Courses', sub: 'Team training, L&D, corporate upskilling', path: '/corporate-courses' },
        { icon: '🧭', title: 'Leadership Courses', sub: 'Leadership, management, communication', path: '/leadership-courses' },
    ];

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 w-full z-[9999] transition-all duration-300 bg-white shadow-sm flex flex-col"
        )}>
            <div className={cn(
                "max-w-[1400px] mx-auto w-full flex items-center justify-between",
                isScrolled ? "py-2" : "py-3 px-6 lg:px-12"
            )}>
                {/* Left Section: Logo & Category */}
                <div className="flex items-center gap-12">
                    <Link to="/">
                        <img src={logo} alt="Aindhin Logo" className="w-[100px] h-auto object-contain" />
                    </Link>

                    {/* Category Dropdown */}
                    <div className="relative hidden lg:block" ref={dropdownRef}>
                        <button
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            className={cn(
                                "flex items-center gap-3 px-6 py-2.5 rounded-full border border-gray-100 transition-all duration-200 text-sm font-semibold",
                                isCategoryOpen ? "bg-primary text-white border-primary shadow-xl" : "bg-white text-secondary hover:bg-gray-50 hover:shadow-md"
                            )}
                        >
                            <div className={cn(
                                "flex items-center justify-center rounded-full p-1",
                                isCategoryOpen ? "bg-white/20" : "bg-blue-50/50"
                            )}>
                                <LayoutGrid className={cn(
                                    "w-3.5 h-3.5",
                                    isCategoryOpen ? "text-white" : "text-primary"
                                )} />
                            </div>
                            <span>Explore Course Categories</span>
                            <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200 ml-1", isCategoryOpen && "rotate-180")} />
                        </button>

                        {isCategoryOpen && (
                            <div className="absolute top-[120%] left-0 w-[280px] bg-white rounded-2xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2">
                                {categories.map((cat, idx) => (
                                    <div 
                                        key={idx} 
                                        className="group relative"
                                        onMouseEnter={(e) => {
                                            if (cat.submenu && cat.submenu.length > 5) {
                                                const container = e.currentTarget;
                                                setTimeout(() => {
                                                    const scrollBox = container.querySelector('.submenu-scroll-box');
                                                    if (scrollBox && scrollBox.scrollHeight > scrollBox.clientHeight) {
                                                        const { scrollTop, scrollHeight, clientHeight } = scrollBox;
                                                        const scrollBottom = scrollHeight - scrollTop - clientHeight;
                                                        const itemHeight = scrollHeight / cat.submenu.length;
                                                        setRemainingSubmenuCount(Math.max(1, Math.round(scrollBottom / itemHeight)));
                                                    } else {
                                                        setRemainingSubmenuCount(Math.max(1, cat.submenu.length - 5));
                                                    }
                                                }, 30);
                                            }
                                        }}
                                    >
                                        <Link
                                            to={cat.path || '#'}
                                            onClick={() => {
                                                if (cat.path) setIsCategoryOpen(false);
                                            }}
                                            className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-blue-50 transition-all duration-200 group/item"
                                        >
                                            <div className="w-7.5 h-7.5 rounded-full bg-blue-50 flex items-center justify-center text-base">{cat.icon}</div>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-sm font-semibold text-secondary">{cat.title}</span>
                                                <span className="text-xs text-text">{cat.sub}</span>
                                            </div>
                                            {cat.submenu && <ChevronRight className="ml-auto w-3 h-3 text-gray-400" />}
                                        </Link>

                                        {cat.submenu && (
                                            <div className="absolute left-[100%] top-0 mt-[-10px] ml-2 w-[300px] bg-white rounded-2xl shadow-2xl p-1.5 hidden group-hover:block border border-gray-100 z-[60] before:absolute before:-left-4 before:top-0 before:h-full before:w-4 before:content-['']">
                                                <div 
                                                    onScroll={(e) => {
                                                        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
                                                        const scrollBottom = scrollHeight - scrollTop - clientHeight;
                                                        if (scrollBottom < 15) {
                                                            setRemainingSubmenuCount(0);
                                                        } else {
                                                            const itemHeight = scrollHeight / cat.submenu.length;
                                                            setRemainingSubmenuCount(Math.max(1, Math.round(scrollBottom / itemHeight)));
                                                        }
                                                    }}
                                                    className="submenu-scroll-box max-h-[360px] overflow-y-auto overscroll-contain pr-1 space-y-1 scrollbar-thin pb-4"
                                                >
                                                    {cat.submenu.map((sub, sIdx) => (
                                                        <Link
                                                            key={sIdx}
                                                            to={sub.path}
                                                            onClick={() => setIsCategoryOpen(false)}
                                                            className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-cyan-50 transition-all duration-200"
                                                        >
                                                            <div className="w-7.5 h-7.5 rounded-full bg-cyan-50 flex items-center justify-center text-base shrink-0">{sub.icon}</div>
                                                            <div className="flex flex-col gap-0.5 min-w-0">
                                                                <span className="text-sm font-semibold text-secondary truncate">{sub.title}</span>
                                                                <span className="text-xs text-text line-clamp-2">{sub.sub}</span>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                                {cat.submenu.length > 5 && remainingSubmenuCount > 0 && (
                                                    <div className="absolute bottom-1.5 left-1.5 right-1.5 py-2 px-3 bg-gradient-to-t from-white via-white/95 to-white/60 flex items-center justify-center gap-1.5 text-[13px] font-bold text-primary pointer-events-none rounded-b-xl border-t border-blue-50 shadow-[0_-4px_12px_rgba(255,255,255,0.9)] animate-pulse transition-all duration-200">
                                                        <span>Scroll for more (+{remainingSubmenuCount} {remainingSubmenuCount === 1 ? 'topic' : 'topics'})</span>
                                                        <ChevronDown className="w-4 h-4 animate-bounce shrink-0 text-primary" />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Center Section: Navigation */}
                <nav className="hidden lg:flex items-center gap-8">
                    <Link to="/" className="text-sm font-medium text-secondary hover:text-primary transition-colors">Home</Link>
                    <Link to="/about-us" className="text-sm font-medium text-secondary hover:text-primary transition-colors">About us</Link>
                    <Link to="/service" className="text-sm font-medium text-secondary hover:text-primary transition-colors">Services</Link>

                    <div className="relative group">
                        <button className="flex items-center gap-1 text-sm font-medium text-secondary group-hover:text-primary transition-colors">
                            Courses <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
                        </button>
                        <div className="absolute top-full left-0 pt-4 hidden group-hover:block z-50">
                            <div className="w-[220px] bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                                <Link to="/our-courses" className="block px-4 py-2 text-sm font-medium text-secondary hover:bg-blue-50 hover:text-primary">Certification Courses</Link>
                                <Link to="/module-courses" className="block px-4 py-2 text-sm font-medium text-secondary hover:bg-blue-50 hover:text-primary">Module Courses</Link>
                                <Link to="/university-courses" className="block px-4 py-2 text-sm font-medium text-secondary hover:bg-blue-50 hover:text-primary">University Courses</Link>
                                <Link to="/corporate-courses" className="block px-4 py-2 text-sm font-medium text-secondary hover:bg-blue-50 hover:text-primary">Corporate Courses</Link>
                                <Link to="/leadership-courses" className="block px-4 py-2 text-sm font-medium text-secondary hover:bg-blue-50 hover:text-primary">Leadership Courses</Link>
                            </div>
                        </div>
                    </div>

                    <Link
                        to="/blog"
                        className="text-sm font-medium text-secondary hover:text-primary transition-colors"
                    >
                        Blog
                    </Link>
                    <Link to="/contact-us" className="text-sm font-medium text-secondary hover:text-primary transition-colors">Contact Us</Link>
                </nav>

                {/* Right Section: Login & Mobile Toggle */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <Link
                        to="/course-registration"
                        className="hidden md:inline-flex items-center justify-center px-4.5 sm:px-5 py-2.5 rounded-full bg-blue-50/90 hover:bg-blue-100 text-blue-700 font-extrabold text-[14px] border border-blue-200 shadow-sm hover:shadow transition-all duration-200 gap-2"
                    >
                        <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                        Register Courses
                    </Link>

                    <a
                        href={`${USER_APP_URL}/signin`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white font-bold text-[15px] shadow-[0_8px_20px_rgba(37,99,235,0.45)] hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                        Login / Sign Up
                    </a>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-secondary hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                "fixed inset-0 bg-white z-[9998] lg:hidden transition-all duration-300",
                isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            )}>
                {/* Close Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute top-6 right-6 p-2 bg-gray-50 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors z-50"
                >
                    <X className="w-8 h-8" />
                </button>

                <div className="flex flex-col gap-6 p-8 pt-24 h-full overflow-y-auto">
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-secondary">Home</Link>
                    <Link to="/about-us" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-secondary">About Us</Link>
                    <Link to="/service" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-secondary">Services</Link>

                    <div className="flex flex-col gap-1">
                        <button
                            onClick={() => setIsMobileCoursesOpen(!isMobileCoursesOpen)}
                            className="text-lg font-semibold text-secondary flex justify-between items-center w-full py-2"
                        >
                            <span>Courses</span>
                            <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", isMobileCoursesOpen && "rotate-180")} />
                        </button>
                        {isMobileCoursesOpen && (
                            <div className="flex flex-col gap-2 pl-4 py-2 bg-gray-50 rounded-2xl animate-in fade-in slide-in-from-top-1">
                                <Link to="/our-courses" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-text py-1">Certification Courses</Link>
                                <Link to="/module-courses" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-text py-1">Module Courses</Link>
                                <Link to="/university-courses" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-text py-1">University Courses</Link>
                                <Link to="/corporate-courses" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-text py-1">Corporate Courses</Link>
                                <Link to="/leadership-courses" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-text py-1">Leadership Courses</Link>
                            </div>
                        )}
                    </div>

                    <Link
                        to="/blog"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lg font-semibold text-secondary"
                    >
                        Blog
                    </Link>
                    <Link to="/contact-us" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-secondary">Contact Us</Link>

                    <Link
                        to="/course-registration"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="mt-4 w-full py-3.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full font-extrabold text-base shadow-sm border border-blue-200 transition-colors flex items-center justify-center gap-2"
                    >
                        <Sparkles className="w-5 h-5 text-blue-600" /> Register Courses
                    </Link>
                    <a href={`${USER_APP_URL}/signin`} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="mt-2 text-center py-4 bg-primary text-white rounded-full font-bold shadow-lg">Login / Sign Up</a>
                </div>
            </div>

            {/* Course Ticker rendered exactly below the header navigation */}
            <CourseTicker />


        </header>
    );
};

export default Header;
