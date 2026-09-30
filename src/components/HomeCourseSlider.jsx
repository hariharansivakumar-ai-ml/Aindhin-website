import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Play, BookOpen, Clock, Users, Calendar } from 'lucide-react';
import { apiGetAssignedCourses, USER_APP_URL, USER_API_URL } from '../utils/apiClient';
import { encodeCourseId } from '../utils/idObfuscator';
import SignInModal from './SignInModal';

import aiMlBasicsImg from '../assets/aiml.webp';
import digitalMarketingImg from '../assets/digital_marketing_hero.webp';
import cybersecurityImg from '../assets/cybersecurity.webp';
import fullStackImg from '../assets/full_stack.webp';
import dataAnalyticsImg from '../assets/data_analytics.webp';
import cloudComputingImg from '../assets/cloud_computing.webp';

/* ─────────────────────────────────────────────────────────────────────────────
   ExpandedCard
   Rendered via portal at the EXACT position of the hovered card.
   The image section is the same size as the original card so it looks
   like the card itself is growing downward with extra details.
───────────────────────────────────────────────────────────────────────────── */
const ExpandedCard = ({ course, anchorRect, onMouseEnter, onMouseMove, onMouseLeave, onEnrollClick }) => {
    if (!course || !anchorRect) return null;

    const left   = anchorRect.left + window.scrollX;
    const top    = anchorRect.top + window.scrollY;
    const width  = anchorRect.width;
    const IMG_H  = anchorRect.height;
    const INFO_H = 175;

    return createPortal(
        <>
            <style>{`
                @keyframes cardZoomIn {
                    from {
                        transform: scale(1);
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    }
                    to {
                        transform: scale(1.15);
                        box-shadow: 0 24px 64px rgba(0,0,0,0.4);
                    }
                }
                .expanded-card-container {
                    animation: cardZoomIn 0.22s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                    transform-origin: center center;
                }
                @keyframes cardExpand {
                    from { clip-path: inset(0 0 100% 0); opacity: 0.6; }
                    to   { clip-path: inset(0 0 0% 0);   opacity: 1; }
                }
                .expanded-info {
                    animation: cardExpand 0.25s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
            `}</style>

            <div
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                style={{
                    position: 'absolute',
                    top,
                    left,
                    width,
                    zIndex: 9990,
                    pointerEvents: 'auto',
                }}
                className="expanded-card-container rounded-2xl overflow-hidden"
            >
                {/* Image — identical size to original card */}
                <div className="relative w-full" style={{ height: IMG_H }}>
                    <img
                        src={course.image}
                        alt={course.title}
                        onError={(e) => { e.target.src = aiMlBasicsImg; }}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-black/10 to-transparent" />

                    {/* Tag chips */}
                    <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                        {course.tags && course.tags.map((tag, i) => (
                            <span
                                key={i}
                                className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white border border-white/20"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title at bottom */}
                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-5">
                        <h3 className="text-white font-bold text-[14px] md:text-[16px] font-inter leading-tight line-clamp-2">
                            {course.title}
                        </h3>
                    </div>
                </div>

                {/* Details panel — slides in below the image */}
                <div
                    className="expanded-info bg-[#0f172a] px-4 pt-3 pb-4"
                    style={{ height: INFO_H }}
                >
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2 flex-wrap">
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-blue-400" />{course.duration}
                        </span>
                        <span className="text-gray-600">&#183;</span>
                        <span className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-emerald-400" />{course.students}+ enrolled
                        </span>
                        <span className="text-gray-600">&#183;</span>
                        <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-amber-400" />{course.level}
                        </span>
                    </div>

                    <p className="text-gray-400 text-[12px] leading-relaxed mb-3 line-clamp-2">
                        {course.description}
                    </p>

                    <button
                        onClick={() => onEnrollClick && onEnrollClick(course)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-blue-700 text-white text-[13px] font-bold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 border-none cursor-pointer"
                    >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        Enroll Now
                    </button>
                </div>
            </div>
        </>,
        document.body
    );
};

/* ─────────────────────────────────────────────────────────────────────────────
   CourseCard — turns invisible when hovered so the portal card takes its place
───────────────────────────────────────────────────────────────────────────── */
const CourseCard = ({ course, rowId, instanceId, onHover, onLeave, isActive, onEnroll }) => {
    const cardRef = useRef(null);
    const navigate = useNavigate();

    const handleMouseEnter = () => {
        if (cardRef.current) onHover(course, cardRef.current.getBoundingClientRect(), rowId, instanceId);
    };

    const handleClick = () => {
        if (course.link && course.link !== '#' && !course.link.startsWith('/register')) {
            navigate(course.link);
        } else if (onEnroll) {
            onEnroll(course);
        } else {
            navigate(`/register?course_id=${course.id}&course=${encodeURIComponent(course.title)}`);
        }
    };

    return (
        <div
            ref={cardRef}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={onLeave}
            className="w-[260px] md:w-[320px] aspect-[16/9] shrink-0 relative rounded-2xl overflow-hidden shadow-sm cursor-pointer select-none transition-transform hover:scale-[1.01]"
            style={{ opacity: isActive ? 0 : 1, transition: 'opacity 0.12s' }}
        >
            <img 
                src={course.image} 
                alt={course.title} 
                onError={(e) => { e.target.src = aiMlBasicsImg; }}
                className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Tag chip at top */}
            {course.dateBadge && (
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white border border-white/20 flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5 text-amber-400" />
                        {course.dateBadge}
                    </span>
                </div>
            )}

            <div className="absolute bottom-0 left-0 w-full p-4 md:p-5">
                <h3 className="text-white font-bold text-[14px] md:text-[16px] font-inter leading-tight line-clamp-2">
                    {course.title}
                </h3>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────────────────────
   MarqueeRow — Smooth, Seamless Infinite Slideshow
   Uses duplicated halves with translate3d(-50%) for 100% glitch-free loop
───────────────────────────────────────────────────────────────────────────── */
const MarqueeRow = ({ title, courses, seeMoreLink, rowId, onCardHover, onCardLeave, isPaused, activeInstanceId, onEnroll }) => {
    // Generate enough items to cover any screen width, then duplicate for seamless -50% loop
    const marqueeItems = useMemo(() => {
        if (!courses || courses.length === 0) return [];
        let base = [...courses];
        while (base.length < 8) {
            base = [...base, ...courses];
        }
        return [...base, ...base];
    }, [courses]);

    if (!courses || courses.length === 0) return null;

    return (
        <div className="mb-10 last:mb-0">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h2 className="text-[20px] md:text-[22px] font-bold text-[#1e293b] font-inter">{title}</h2>
                    <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        Upcoming Cohorts
                    </span>
                </div>
                <Link
                    to={seeMoreLink || '/our-courses'}
                    className="flex items-center text-[14px] font-semibold text-primary hover:underline transition-all font-inter"
                >
                    See more <ChevronRight className="w-4 h-4 ml-0.5" />
                </Link>
            </div>

            <div className="w-full overflow-hidden">
                <div
                    className="flex gap-4 px-6 lg:px-12"
                    style={{
                        width: 'max-content',
                        animation: 'smoothInfiniteMarquee 45s linear infinite',
                        animationPlayState: isPaused ? 'paused' : 'running',
                        willChange: 'transform',
                    }}
                >
                    {marqueeItems.map((course, idx) => {
                        const instanceId = `${rowId}-${course.id}-${idx}`;
                        return (
                            <CourseCard
                                key={instanceId}
                                instanceId={instanceId}
                                course={course}
                                rowId={rowId}
                                onHover={onCardHover}
                                onLeave={onCardLeave}
                                isActive={activeInstanceId === instanceId}
                                onEnroll={onEnroll}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────────────────────
   HomeCourseSlider
───────────────────────────────────────────────────────────────────────────── */
const HomeCourseSlider = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [hoveredCourse, setHoveredCourse] = useState(null);
    const [anchorRect,    setAnchorRect]    = useState(null);
    const [pausedRowId,   setPausedRowId]   = useState(null);
    const [activeInstanceId, setActiveInstanceId] = useState(null);
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const [signInRedirectUrl, setSignInRedirectUrl] = useState(`${USER_APP_URL}/signin`);
    const leaveTimer = useRef(null);
    const isOverCard = useRef(false);

    // Fallback image map based on keywords
    const getFallbackImage = (title) => {
        const t = (title || '').toLowerCase();
        if (t.includes('ai') || t.includes('machine learning')) return aiMlBasicsImg;
        if (t.includes('marketing') || t.includes('seo')) return digitalMarketingImg;
        if (t.includes('cyber') || t.includes('security')) return cybersecurityImg;
        if (t.includes('data') || t.includes('analytics')) return dataAnalyticsImg;
        if (t.includes('cloud') || t.includes('aws')) return cloudComputingImg;
        return fullStackImg;
    };

    const resolveCourseImage = (c) => {
        const raw = c.banner_image_url || c.image_url || c.image;
        if (raw) {
            if (raw.startsWith('http')) return raw;
            return `${USER_API_URL}${raw.startsWith('/') ? '' : '/'}${raw}`;
        }
        return getFallbackImage(c.title);
    };

    const formatStartDate = (dateStr) => {
        if (!dateStr || ['flexible', 'coming soon', 'coming_soon', 'null'].includes(String(dateStr).toLowerCase()) || String(dateStr).trim() === '') return 'Coming Soon';
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return 'Coming Soon';
            return `Starts: ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
        } catch (_) {
            return 'Coming Soon';
        }
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await apiGetAssignedCourses();
                if (Array.isArray(data) && data.length > 0) {
                    const activeCourses = data.filter(c => c.is_active !== false && !c.is_deleted);

                    // Filter for upcoming courses (not marked ended or completed)
                    const upcomingOnly = activeCourses
                        .filter(c => !c.is_ended && !c.is_completed)
                        .sort((a, b) => {
                            const dateA = a.course_start_date ? new Date(a.course_start_date).getTime() : 0;
                            const dateB = b.course_start_date ? new Date(b.course_start_date).getTime() : 0;
                            if (dateA && dateB) return dateA - dateB;
                            if (dateA && !dateB) return -1;
                            if (!dateA && dateB) return 1;
                            return (a.id || 0) - (b.id || 0);
                        });

                    // If upcoming courses exist, show ONLY upcoming; otherwise fallback to active courses
                    const targetList = upcomingOnly.length > 0 ? upcomingOnly : activeCourses;

                    const mapped = await Promise.all(targetList.map(async (c) => {
                        let encodedId = c.id;
                        try {
                            encodedId = await encodeCourseId(c.id);
                        } catch (_) {}

                        return {
                            id: c.id,
                            encodedId,
                            title: c.title,
                            image: resolveCourseImage(c),
                            userCourseUrl: `${USER_APP_URL}/course/${encodedId}`,
                            link: `/register?course_id=${c.id}&course=${encodeURIComponent(c.title)}`,
                            description: c.about_course || c.description || 'Master job-ready industry skills with hands-on live sessions and professional certification.',
                            duration: c.course_duration || 'Flexible',
                            students: c.total_enrolled || 120,
                            level: c.skill_level || 'Beginner',
                            category: (c.category || 'Certification').trim(),
                            dateBadge: formatStartDate(c.course_start_date),
                            tags: [
                                (c.category || 'Certification').trim(),
                                formatStartDate(c.course_start_date),
                                c.class_mode || 'Live Class'
                            ].filter(Boolean)
                        };
                    }));

                    setCourses(mapped);
                }
            } catch (err) {
                console.error("Failed to load upcoming courses for home slider:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const checkLeave = useCallback(() => {
        clearTimeout(leaveTimer.current);
        leaveTimer.current = setTimeout(() => {
            if (!isOverCard.current) {
                setHoveredCourse(null);
                setAnchorRect(null);
                setPausedRowId(null);
                setActiveInstanceId(null);
            }
        }, 150);
    }, []);

    const handleCardHover = useCallback((course, rect, rowId, instanceId) => {
        isOverCard.current = true;
        clearTimeout(leaveTimer.current);
        setHoveredCourse(course);
        setAnchorRect(rect);
        setPausedRowId(rowId);
        setActiveInstanceId(instanceId);
    }, []);

    const handleLeave = useCallback(() => {
        isOverCard.current = false;
        checkLeave();
    }, [checkLeave]);

    useEffect(() => () => clearTimeout(leaveTimer.current), []);

    // Split courses into rows if there are many (6+) to keep variety, or single clean row
    const rowData = useMemo(() => {
        if (courses.length === 0) return [];
        if (courses.length <= 5) {
            return [
                {
                    rowId: 'upcoming-main',
                    title: 'Upcoming Certification & Industry Courses',
                    courses: courses,
                    seeMoreLink: '/our-courses'
                }
            ];
        }
        // If 6 or more upcoming courses, split into two alternating smooth rows
        const mid = Math.ceil(courses.length / 2);
        return [
            {
                rowId: 'upcoming-top',
                title: 'Upcoming Certification & Tech Courses',
                courses: courses.slice(0, mid),
                seeMoreLink: '/our-courses'
            },
            {
                rowId: 'upcoming-bottom',
                title: 'Upcoming Industry & Professional Cohorts',
                courses: courses.slice(mid),
                seeMoreLink: '/corporate-courses'
            }
        ];
    }, [courses]);

    if (!loading && courses.length === 0) {
        return null; // Gracefully hide if no active courses exist
    }

    const checkIsLoggedIn = () => {
        try {
            const token = localStorage.getItem('aindhin_token') ||
                          localStorage.getItem('token') ||
                          localStorage.getItem('access_token') ||
                          localStorage.getItem('user_token') ||
                          localStorage.getItem('auth_token') ||
                          localStorage.getItem('user') ||
                          localStorage.getItem('aindhin_user') ||
                          sessionStorage.getItem('aindhin_token') ||
                          sessionStorage.getItem('token');
            if (token) return true;

            if (typeof document !== 'undefined' && document.cookie) {
                if (/sessionid=|token=|jwt=|auth=|aindhin_token=/i.test(document.cookie)) {
                    return true;
                }
            }
        } catch (_) {}
        return false;
    };

    const handleEnrollClick = async (courseToEnroll) => {
        const targetCourse = courseToEnroll || hoveredCourse;
        if (!targetCourse) return;

        let targetUrl = targetCourse.userCourseUrl;
        let encoded = targetCourse.encodedId;
        if (!targetUrl) {
            try {
                encoded = await encodeCourseId(targetCourse.id);
                targetUrl = `${USER_APP_URL}/course/${encoded}`;
            } catch (_) {
                targetUrl = `${USER_APP_URL}/course/${targetCourse.id}`;
            }
        }

        const isLogged = checkIsLoggedIn();
        if (isLogged) {
            window.open(targetUrl, '_blank', 'noopener,noreferrer');
        } else {
            const redirectParam = encodeURIComponent(`/course/${encoded || targetCourse.id}`);
            setSignInRedirectUrl(`${USER_APP_URL}/signin?redirect=${redirectParam}`);
            setIsSignInModalOpen(true);
        }
        handleLeave();
    };

    return (
        <section className="py-12 bg-white relative overflow-hidden select-none">
            <style>{`
                @keyframes smoothInfiniteMarquee {
                    0%   { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-50%, 0, 0); }
                }
                .expanded-card-container {
                    box-shadow: 0 24px 50px -10px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08);
                    animation: cardPopIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    transform-origin: center top;
                }
                @keyframes cardPopIn {
                    0% {
                        opacity: 0.85;
                        transform: scale(0.97) translateY(-3px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1.04) translateY(0);
                    }
                }
                .expanded-info {
                    animation: infoSlideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes infoSlideDown {
                    0% {
                        opacity: 0;
                        transform: translateY(-8px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

            {loading ? (
                /* Skeleton Loader while loading */
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-10">
                    <div className="h-7 w-64 bg-slate-100 rounded-lg animate-pulse mb-6" />
                    <div className="flex gap-4 overflow-hidden">
                        {[1, 2, 3, 4].map(n => (
                            <div key={n} className="w-[260px] md:w-[320px] aspect-[16/9] shrink-0 rounded-2xl bg-slate-100 animate-pulse" />
                        ))}
                    </div>
                </div>
            ) : (
                rowData.map(row => (
                    <MarqueeRow
                        key={row.rowId}
                        rowId={row.rowId}
                        title={row.title}
                        courses={row.courses}
                        seeMoreLink={row.seeMoreLink}
                        onCardHover={handleCardHover}
                        onCardLeave={handleLeave}
                        isPaused={pausedRowId === row.rowId}
                        activeInstanceId={activeInstanceId}
                        onEnroll={handleEnrollClick}
                    />
                ))
            )}

            {/* Portal card — sits at exact position of hovered card and extends downward */}
            <ExpandedCard
                course={hoveredCourse}
                anchorRect={anchorRect}
                onMouseEnter={() => {
                    isOverCard.current = true;
                    clearTimeout(leaveTimer.current);
                }}
                onMouseMove={() => {
                    isOverCard.current = true;
                    clearTimeout(leaveTimer.current);
                }}
                onMouseLeave={handleLeave}
                onEnrollClick={handleEnrollClick}
            />

            <SignInModal 
                isOpen={isSignInModalOpen} 
                onClose={() => setIsSignInModalOpen(false)} 
                redirectUrl={signInRedirectUrl}
            />
        </section>
    );
};

export default HomeCourseSlider;
